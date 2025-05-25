import { API_BASE_URL, fetcher } from "./index";

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface TokenDto {
  message: {token: string};
  token: string;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  roles: string[];
  name: string;
  city: string;
  phone: string;
  address: string;
}

export interface MessageDto {
  error: string;
  message: string;
}

export interface UpdateUserDto {
  username: string;
  email: string;
  name: string;
  city: string;
  phone: string;
  address: string;
}

// Login
export async function login(data: LoginUserDto): Promise<TokenDto> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 403) {
      // Usuario no activo
      throw new Error("Usuario no activo");
    }
    if (response.status === 404) {
      throw new Error("Usuario no encontrado");
    }
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al iniciar sesión");
    }
    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Registro
export async function register(data: CreateUserDto): Promise<MessageDto> {
  return fetcher(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Verificar código
export async function verify(data: Record<string, string>): Promise<MessageDto> {
  return fetcher(`${API_BASE_URL}/auth/${data.email}/validateUser?code=${data.code}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Enviar código de verificación (no de recuperación)
export async function sendVerificationCode(data: Record<string, string>): Promise<MessageDto> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-verification-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "No se pudo enviar el código de verificación");
    }
    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Enviar código de recuperación
export async function sendRecoveryCode(data: Record<string, string>): Promise<MessageDto> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-recovery-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "No se pudo enviar el código");
    }
    return response.json();
  } catch (error) {
    throw error instanceof Error ? error : new Error(String(error));
  }
}

// Resetear contraseña
export async function resetPassword(data: Record<string, string>): Promise<MessageDto> {
  return fetcher(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Actualizar usuario
export async function updateUser(data: { dto: UpdateUserDto; request: Record<string, string> }): Promise<MessageDto> {
  return fetcher(`${API_BASE_URL}/auth/update`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}


// Obtener ciudades
export async function getCities(): Promise<string[]> {
    return fetcher(`${API_BASE_URL}/auth/cities`);
}