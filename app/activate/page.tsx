"use client";

import { useState, useEffect } from "react";
import { verify, sendVerificationCode } from "@/components/services/auth";
import { useRouter } from "next/navigation";

export default function ActivatePage() {
  // Temporizador de 15 minutos
  const [time, setTime] = useState(0); // Timer inicia en 0
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [requested, setRequested] = useState(false); // Si ya se pidió el código
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    // Llenar automáticamente el email si existe en localStorage
    const storedEmail = localStorage.getItem("pendingEmail") || "";
    setEmail(storedEmail);
  }, []);

  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');

  const handleRequestCode = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const emailToSend = email.trim();
      if (!emailToSend) {
        setError("Por favor ingresa tu correo electrónico");
        setLoading(false);
        return;
      }
      setSuccess("Código enviado correctamente");
      setRequested(true);
      setTime(15 * 60); // Inicia el temporizador de 15 minutos
      localStorage.setItem("pendingEmail", emailToSend);
    } catch (err) {
      const error = err as Error;
      setError(error.message || "No se pudo enviar el código");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const emailToSend = email.trim();
      if (!emailToSend) {
        setError("Por favor ingresa tu correo electrónico");
        setLoading(false);
        return;
      }
      await verify({ email: emailToSend, code });
      setSuccess("Cuenta activada correctamente");
      // Redirige al login con el correo y elimina pendingEmail
      localStorage.removeItem("pendingEmail");
      router.push(`/auth?mode=signin&email=${encodeURIComponent(emailToSend)}`);
    } catch {
      setError("Código inválido o expirado");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const emailToSend = email.trim();
      if (!emailToSend) {
        setError("Por favor ingresa tu correo electrónico");
        setLoading(false);
        return;
      }
      await sendVerificationCode({ email: emailToSend });
      setSuccess("Código reenviado");
      setTime(15 * 60);
      localStorage.setItem("pendingEmail", emailToSend);
    } catch {
      setError("No se pudo reenviar el código");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-secondary p-6 rounded-2xl max-w-md mx-auto mt-10">
      <h2 className="text-white text-2xl font-bold text-center">ACTIVA TU CUENTA</h2>
      <p className="text-white text-center">Hemos enviado un código a tu correo electrónico.<br />Ingresa el código para activar tu cuenta</p>
      {!requested && (
        <>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-lg text-center text-lg bg-white/90 placeholder:text-gray-400 mb-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <button
            className="bg-terciary text-secondary font-bold py-3 px-8 rounded-lg w-full max-w-xs transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={handleRequestCode}
            disabled={loading}
          >{loading ? "Enviando..." : "Solicitar código"}</button>
        </>
      )}
      {requested && (
        <>
          <input
            type="text"
            placeholder="Ingrese el código de verificación"
            className="w-full p-3 rounded-lg text-center text-lg bg-white/90 placeholder:text-gray-400"
            value={code}
            onChange={e => setCode(e.target.value)}
            disabled={loading}
          />
          <div className="text-terciary font-semibold text-center">Tiempo restante {minutes}:{seconds} minutos</div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            className="bg-terciary text-white font-bold py-3 px-8 rounded-lg w-full max-w-xs transition-all duration-200 hover:scale-105 cursor-pointer"
            onClick={handleVerify}
            disabled={loading || !code}
          >{loading ? "Verificando..." : "Verificar código"}</button>
          <div className="text-white text-center text-sm mt-2">
            ¿No recibiste ningún código? <button
              className="font-bold underline text-white bg-transparent border-none p-0 transition-all duration-200 hover:scale-105 cursor-pointer"
              onClick={handleResend}
              disabled={loading}
            >Reenviar</button>
          </div>
        </>
      )}
    </div>
  );
}
