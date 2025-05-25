import { API_BASE_URL, fetcher } from "./index";

export interface ReporteResponseDto {
    id: number;
    title: string;
    categories: { id?: string; name: string; description: string }[];
    description: string;
    location: string;
    images: string[];
    date: string;
    userId: number;
    status: "APPROVED" | "PENDING" | "REJECTED" | "RESOLVED";
    importanceCount: number;
}

export interface ReportDto {
    id?: number;
    title: string;
    categories: CategoryDto[];
    description: string;
    latitude?: number;
    longitude?: number;
    images: string[];
    userId: number;
    email: string;
    comments?: CommentDto[];
    createdByEmail?: string;
    location: string;
    importanceCount?: number;
    status?: "APPROVED" | "PENDING" | "REJECTED" | "RESOLVED";
    rejectionReason?: string;
    modificationDeadline?: string;
    verified?: boolean;
}

export interface CategoryDto {
    id?: string;
    name: string;
    description: string;
}

export interface CommentDto {
    content: string;
}

// Obtener todos los reportes con filtros opcionales
export async function getReportsByFilters(params?: {
    sector?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    page?: number;
    size?: number;
}): Promise<{
    content: ReporteResponseDto[];
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
}> {
    const queryParams: Record<string, string | undefined> = {};
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value)
            queryParams[key] = typeof value === 'number' ? value.toString() : value;
    });

    const query = queryParams
        ? '?' + new URLSearchParams(queryParams as Record<string, string>).toString()
        : '';
    return fetcher(`${API_BASE_URL}/reports/filter${query}`);
}

// Obtener reporte por ID
export async function getReportById(id: number): Promise<ReporteResponseDto> {
    return fetcher(`${API_BASE_URL}/reports/${id}`);
}

// Crear reporte (multipart/form-data)
export async function createReport(report: string, images: File[]): Promise<ReporteResponseDto> {
    const formData = new FormData();
    formData.append('report', report);
    images.forEach(img => formData.append('images', img));
    const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

// Actualizar reporte
export async function updateReport(id: number, data: ReportDto): Promise<ReporteResponseDto> {
    return fetcher(`${API_BASE_URL}/reports/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

// Eliminar reporte
export async function deleteReport(id: number): Promise<void> {
    return fetcher(`${API_BASE_URL}/reports/${id}`, {
        method: 'DELETE',
    });
}

// Cambiar estatus de reporte
export async function changeReportStatus(id: number, newStatus: ReporteResponseDto["status"]): Promise<ReporteResponseDto> {
    return fetcher(`${API_BASE_URL}/reports/${id}/status?newStatus=${newStatus}`, {
        method: 'PATCH',
    });
}

// Resolver reporte
export async function resolveReport(id: number): Promise<ReporteResponseDto> {
    return fetcher(`${API_BASE_URL}/reports/${id}/resolve`, {
        method: 'PATCH',
    });
}

// Rechazar reporte
export async function rejectReport(id: number, rejectionReason: string): Promise<ReporteResponseDto> {
    return fetcher(`${API_BASE_URL}/reports/${id}/reject?rejectionReason=${encodeURIComponent(rejectionReason)}`, {
        method: 'PATCH',
    });
}

// Aumentar importancia
export async function increaseImportance(id: number): Promise<boolean> {
    return fetcher(`${API_BASE_URL}/reports/${id}/importance`, {
        method: 'PATCH',
    });
}

// Obtener reportes por usuario
export async function getReportsByUserId(userId: number): Promise<ReporteResponseDto[]> {
    return fetcher(`${API_BASE_URL}/reports/user/${userId}`);
}

// Generar PDF de reportes
export async function generateReportsPdf(params: {
    sector?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    filePath: string;
}): Promise<string> {
    const query = '?' + new URLSearchParams(params as Record<string, string>).toString();
    return fetcher(`${API_BASE_URL}/reports/generate-pdf${query}`, {
        method: 'POST',
    });
}

// Obtener todos los reportes (paginados)
export async function getAllReports({ page = 0, size = 10 } = {}):Promise<ReporteResponseDto[]> {
  const res = await fetch(`/api/reports?page=${page}&size=${size}`);
  if (!res.ok) throw new Error('Error al cargar reportes');
  return res.json();
}
