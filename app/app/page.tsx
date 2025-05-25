'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ReportCard from '@/components/ReportCard';
import Link from 'next/link';
import { getReportsByFilters } from '@/components/services/reports';
import { Map } from '@/components/maps/Map';

interface Location {
    latitude: number;
    longitude: number;
}

interface Report {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    status: "APPROVED" | "PENDING" | "REJECTED" | "RESOLVED";
    user: {
        name: string;
        profileImage?: string;
    };
    images: string[];
    likes: number;
    comments: number;
    isVerified?: boolean;
    coordinates?: Location;
    distance?: number;
}

export default function Page() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        sector: '',
        category: '',
        startDate: '',
        endDate: '',
        latitude: undefined as number | undefined,
        longitude: undefined as number | undefined,
        radiusKm: 5
    });

    // Refs para mantener el valor más reciente en callbacks
    const pageRef = useRef(page);
    const filtersRef = useRef(filters);
    useEffect(() => { pageRef.current = page; }, [page]);
    useEffect(() => { filtersRef.current = filters; }, [filters]);

    // Obtener ubicación del usuario al cargar
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFilters(prev => ({
                        ...prev,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('No se pudo obtener tu ubicación. Por favor, selecciónala en el mapa.');
                }
            );
        }
    }, []);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Cargar la primera página cuando cambian los filtros
    useEffect(() => {
        let cancelled = false;
        async function fetchFirstPage() {
            setLoading(true);
            setError(null);
            setPage(0);
            setHasMore(true);
            try {
                const reportesData = await getReportsByFilters({
                    ...filters,
                    sector: filters.sector || undefined,
                    category: filters.category || undefined,
                    startDate: filters.startDate || undefined,
                    endDate: filters.endDate || undefined,
                    page: 0,
                    size: 10
                });
                if (!cancelled) {
                    setReports(reportesData.content?.map(report => ({
                        id: report.id,
                        title: report.title,
                        description: report.description,
                        category: report.categories?.[0]?.name || 'Sin categoría',
                        location: report.location,
                        status: report.status,
                        user: { name: 'Usuario', profileImage: undefined },
                        images: report.images,
                        likes: report.importanceCount,
                        comments: 0,
                        isVerified: report.status === 'APPROVED'
                    })) || []);
                    setHasMore(reportesData.hasNext);
                    setPage(1);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Error al cargar los reportes');
                    setReports([]);
                    setHasMore(false);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchFirstPage();
        return () => { cancelled = true; };
    }, [filters]);

    // Cargar más reportes (paginación)
    const loadMoreReports = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        try {
            const reportesData = await getReportsByFilters({
                ...filtersRef.current,
                sector: filtersRef.current.sector || undefined,
                category: filtersRef.current.category || undefined,
                startDate: filtersRef.current.startDate || undefined,
                endDate: filtersRef.current.endDate || undefined,
                page: pageRef.current,
                size: 10
            });
            setHasMore(reportesData.hasNext);
            setReports(prev => {
                const ids = new Set(prev.map(r => r.id));
                const nuevos = (reportesData.content || []).map(report => ({
                    id: report.id,
                    title: report.title,
                    description: report.description,
                    category: report.categories?.[0]?.name || 'Sin categoría',
                    location: report.location,
                    status: report.status,
                    user: { name: 'Usuario', profileImage: undefined },
                    images: report.images,
                    likes: report.importanceCount,
                    comments: 0,
                    isVerified: report.status === 'APPROVED'
                })).filter(r => !ids.has(r.id));
                return [...prev, ...nuevos];
            });
            setPage(p => p + 1);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar los reportes');
        } finally {
            setLoading(false);
        }
    }, [hasMore, loading]);

    // Observer para infinite scroll
    useEffect(() => {
        if (!hasMore || loading) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreReports();
                }
            },
            { threshold: 0.5 }
        );
        const ref = loadMoreRef.current;
        if (ref) observer.observe(ref);
        return () => { if (ref) observer.unobserve(ref); observer.disconnect(); };
    }, [hasMore, loading, loadMoreReports]);

    if (loading && reports.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Reportes Cercanos</h1>
                <Link
                    href="/app/report/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear Reporte
                </Link>
            </div>

            <div className="space-y-4">
                <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">

                    <Map
                        onSelect={({ latitude, longitude }: Location) =>
                            setFilters(f => ({ ...f, latitude, longitude }))
                        }
                        initialMarker={filters.latitude && filters.longitude ? {
                            latitude: filters.latitude,
                            longitude: filters.longitude
                        } : undefined}
                        showRadius={true}
                        radiusKm={filters.radiusKm}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="font-medium">
                        Radio de búsqueda: {filters.radiusKm} km
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={filters.radiusKm}
                        onChange={(e) => setFilters(f => ({ ...f, radiusKm: parseInt(e.target.value) }))}
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <select
                        value={filters.category}
                        onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
                        className="border rounded p-2"
                    >
                        <option value="">Todas las categorías</option>
                        <option value="seguridad">Seguridad</option>
                        <option value="infraestructura">Infraestructura</option>
                        <option value="servicios">Servicios</option>
                        <option value="otros">Otros</option>
                    </select>

                    <select
                        value={filters.sector}
                        onChange={(e) => setFilters(f => ({ ...f, sector: e.target.value }))}
                        className="border rounded p-2"
                    >
                        <option value="">Todos los sectores</option>
                        <option value="norte">Norte</option>
                        <option value="sur">Sur</option>
                        <option value="este">Este</option>
                        <option value="oeste">Oeste</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => setFilters(f => ({ ...f, startDate: e.target.value }))}
                        className="border rounded p-2"
                    />

                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => setFilters(f => ({ ...f, endDate: e.target.value }))}
                        className="border rounded p-2"
                    />
                </div>
            </div>

            {error && (
                <div className="text-red-500 p-4 text-center">
                    {error}
                    <button
                        onClick={() => {
                            setFilters({ ...filters }); // Fuerza recarga
                        }}
                        className="ml-4 text-blue-600 hover:underline"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            <div className="space-y-6">
                {reports.map(report => (
                    <ReportCard key={report.id} report={report} />
                ))}

                {reports.length === 0 && !loading && (
                    <div className="text-center text-gray-500 py-8">
                        {filters.latitude && filters.longitude
                            ? 'No hay reportes en esta área'
                            : 'Selecciona una ubicación en el mapa para ver reportes cercanos'}
                    </div>
                )}

                <div ref={loadMoreRef} className="flex justify-center py-4">
                    {loading && (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    )}
                </div>
            </div>
        </div>
    );
}
