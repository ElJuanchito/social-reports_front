import { API_BASE_URL, fetcher } from "./index";

export interface CategoryDto {
  id?: string;
  name: string;
  description: string;
}

// Obtener todas las categorías
export async function getAllCategories(): Promise<CategoryDto[]> {
  return fetcher(`${API_BASE_URL}/categories`);
}

// Obtener categoría por ID
export async function getCategoryById(id: string): Promise<CategoryDto> {
  return fetcher(`${API_BASE_URL}/categories/${id}`);
}

// Crear categoría
export async function createCategory(data: CategoryDto): Promise<CategoryDto> {
  return fetcher(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Actualizar categoría
export async function updateCategory(id: string, data: CategoryDto): Promise<CategoryDto> {
  return fetcher(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Eliminar categoría
export async function deleteCategory(id: string): Promise<void> {
  return fetcher(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
}
