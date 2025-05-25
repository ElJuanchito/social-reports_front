"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/components/ModalContext";
import { motion, AnimatePresence } from "framer-motion";

const modes = [
  { texto: "INICIA SESIÓN", modo: "signin" },
  { texto: "CREAR CUENTA", modo: "signup" },
];

// Componente interno que usa searchParams
function InicioSesionContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') || 'signin';
  const initialEmail = searchParams.get('email') || '';
  const [mode, setMode] = useState(initialMode);

  return (
    <div className="bg-secondary w-full max-w-[32rem] rounded-3xl flex flex-col p-10 gap-4">
      <div className="flex justify-center">
        {modes.map((m) => (
          <button
            key={m.modo}
            className={`text-white font-bold text-lg relative px-2 bg-transparent border-none outline-none transition-all duration-200 hover:scale-105 hover:text-terciary focus:text-terciary ${mode === m.modo ? '' : 'opacity-60'} cursor-pointer`}
            onClick={() => setMode(m.modo)}
            type="button"
          >
            {m.texto}
            {mode === m.modo && (
              <span
                className="absolute bottom-0 left-0 rounded-full h-1 w-full bg-terciary z-[10] transition-all duration-200"
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden w-full"
        >
          {mode === "signin" && <Login initialEmail={initialEmail} />}
          {mode === "signup" && <Signup initialEmail={initialEmail} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Componente principal envuelto en Suspense
export default function InicioSesion() {
  return (
    <Suspense fallback={
      <div className="bg-secondary w-full max-w-[32rem] rounded-3xl flex flex-col p-10 gap-4 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <InicioSesionContent />
    </Suspense>
  );
}

function Login({ initialEmail = "" }: { initialEmail?: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { login } = await import("./services/auth");
      const res = await login({ email, password });
      console.log("Login response:", res);
      localStorage.setItem("token", res.message.token);
      localStorage.setItem("pendingEmail", email); // Guarda el email para la activación
      router.push("/app"); // Redirige a /app tras login exitoso
    } catch (err) {
      const error = err as Error;
      if (error.message === "Usuario no activo") {
        // Redirigir a /activate si el usuario no está activo
        window.location.href = "/activate";
        return;
      }
      if (error.message === "Usuario no encontrado") {
        showModal("Usuario no encontrado", "error");
        return;
      }
      showModal(error.message || "Error al iniciar sesión", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="w-full gap-3 flex flex-col h-56" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-2 h-full overflow-y-auto scrollbar-thumb-terciary">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="text-terciary text-end mt-2 underline bg-transparent border-none p-0 transition-all duration-200 hover:scale-105 cursor-pointer"
          >¿Olvidaste tu contraseña?</button>
          <button
            className="button-terciary transition-all duration-200 hover:scale-105 cursor-pointer"
            type="submit"
            disabled={loading}
          >{loading ? "Iniciando..." : "Iniciar sesión"}</button>
        </div>
      </form>
    </>
  );
}

function Signup({ initialEmail = "" }: { initialEmail?: string }) {
  const [form, setForm] = useState({
    username: "",
    email: initialEmail,
    password: "",
    confirmPassword: "",
    roles: ["CLIENT"],
    name: "",
    city: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const { showModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    async function fetchCities() {
      try {
        const { getCities } = await import("./services/auth");
        const data = await getCities();
        // El backend retorna { error: boolean, message: string[] }
        setCities(Array.isArray(data.message) ? data.message : []);
      } catch {
        setCities([]);
      }
    }
    fetchCities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (form.password !== form.confirmPassword) {
      showModal("Las contraseñas no coinciden", "error");
      return;
    }
    setLoading(true);
    try {
      const { register } = await import("./services/auth");
      // confirmPassword solo se usa para validación, no se debe declarar si no se usa
      const { ...data } = form;
      await register(data);
      localStorage.setItem("pendingEmail", form.email);
      showModal(
        "Registro exitoso. Revisa tu correo para activar tu cuenta.",
        "success",
        () => router.push("/activate")
      );
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        roles: ["ROLE_USER"],
        name: "",
        city: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      const error = err as Error;
      let msg = error.message;
      try {
        const specializedError = JSON.parse(error.message) as { message?: string };
        msg = specializedError.message ?? msg;
      } catch { }
      showModal(msg || "Error al registrar", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="w-full gap-3 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-2 h-full overflow-y-auto scrollbar-thumb-terciary">
          <input type="text" name="name" placeholder="Nombre(s) y Apellido(s)" value={form.name} onChange={handleChange} required />
          <input type="text" name="username" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
          {/* Cambia este input por un select */}
          <select name="city" value={form.city} onChange={handleChange} required>
            <option value="">Selecciona una ciudad</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <input type="text" name="address" placeholder="Dirección" value={form.address} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirma tu contraseña" value={form.confirmPassword} onChange={handleChange} required />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        </div>
        <button className="button-terciary transition-all duration-200 hover:scale-105 cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </>
  );
}
