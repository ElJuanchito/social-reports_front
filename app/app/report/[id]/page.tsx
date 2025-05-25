import { API_BASE_URL } from '@/components/services/index';
import Image from 'next/image';

interface ReportDetailProps {
  params: { id: string };
}

async function getReport(id: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${API_BASE_URL}/reports/${id}`, {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('No se pudo obtener el reporte');
  return res.json();
}

async function getComments(id: string) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${API_BASE_URL}/reports/getAllComments/${id}`, {
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    cache: 'no-store',
  });
  if (!res.ok) return { message: [] };
  return res.json();
}

export default async function Page({ params }: ReportDetailProps) {
  const { id } = params;
  let report: {
    title: string;
    category?: { name: string };
    description: string;
    reportStatus: string;
    userId: string;
    imageUrl?: string[];
    location?: { latitude: number; longitude: number };
  } | null = null;
  let comments: { comment: string; userId: string }[] = [];
  try {
    const data = await getReport(id);
    report = data.message;
    const commentsData = await getComments(id);
    comments = Array.isArray(commentsData.message) ? commentsData.message : [];
  } catch (error) {
    const err = error as Error;
    return <div className="text-red-500">No se pudo cargar el reporte: {err.message}</div>;
  }

  if (!report) {
    return <div className="text-red-500">No se pudo cargar el reporte.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-2">{report.title}</h1>
      <div className="mb-2 text-gray-600">Categoría: {report.category?.name}</div>
      <div className="mb-2">{report.description}</div>
      <div className="mb-2 text-sm text-gray-500">Estado: {report.reportStatus}</div>
      <div className="mb-2 text-sm text-gray-500">Usuario: {report.userId}</div>
      {report.imageUrl && report.imageUrl.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {report.imageUrl.map((img: string, idx: number) => (
            <Image key={idx} src={img} alt="Imagen del reporte" width={128} height={128} className="w-32 h-32 object-cover rounded-lg" />
          ))}
        </div>
      )}
      {report.location && (
        <div className="mb-2 text-sm text-gray-500">
          Ubicación: lat {report.location.latitude}, lng {report.location.longitude}
        </div>
      )}
      <hr className="my-4" />
      <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
      {comments.length === 0 && <div className="text-gray-400">No hay comentarios.</div>}
      <ul className="space-y-2">
        {comments.map((c, idx) => (
          <li key={idx} className="bg-gray-100 rounded-lg p-2">
            <div className="text-sm text-gray-700">{c.comment}</div>
            <div className="text-xs text-gray-500">Usuario: {c.userId}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
