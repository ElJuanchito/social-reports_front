// URL base del backend
// Usa variable de entorno o valor por defecto
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.80.15:8080/api";

// Helper para peticiones fetch
export async function fetcher<T>(
  url: string,
  
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

// Exporta todo lo de los servicios
export * as auth from "./auth";
export * as reports from "./reports";
export * as categories from "./categories";
export * as comments from "./comments";
export * as user from "./user";