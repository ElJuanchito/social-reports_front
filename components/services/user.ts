import { API_BASE_URL, fetcher } from "./index";

export interface MessageDto {
  status: string;
  message: string;
}

// Eliminar cuenta de usuario
export async function deleteAccount(data: Record<string, string>): Promise<MessageDto> {
  return fetcher(`${API_BASE_URL}/user/deleteAccount`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
