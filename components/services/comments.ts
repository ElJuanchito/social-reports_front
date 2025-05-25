import { API_BASE_URL, fetcher } from "./index";

export interface Comment {
  id: string;
  reportId: string;
  userId: number;
  content: string;
  createdAt: string;
}

// Obtener comentarios por ID de reporte
export async function getCommentsByReportId(reportId: string): Promise<Comment[]> {
  return fetcher(`${API_BASE_URL}/comments/report/${reportId}`);
}

// Agregar comentario
export async function addComment(data: Record<string, string>): Promise<Comment> {
  return fetcher(`${API_BASE_URL}/comments/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
