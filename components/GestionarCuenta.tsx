"use client";
import { useState } from 'react';
import { FiUpload, FiTrash2, FiKey } from 'react-icons/fi';
import Image from 'next/image';
import { API_BASE_URL } from './services/index';

export default function GestionarCuenta() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    ciudad: '',
    direccion: '',
    telefono: '',
    correo: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Obtener datos actuales del usuario (GET)
  // Puedes hacer esto en un useEffect si quieres precargar los datos

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!id || !token) throw new Error('No autenticado');
      const body = {
        name: formData.nombre,
        city: formData.ciudad,
        address: formData.direccion,
        phone: formData.telefono,
        email: formData.correo
      };
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('Error al actualizar los datos');
      setMessage('Datos actualizados correctamente');
    } catch (err) {
      setError((err as Error).message || 'Error al actualizar los datos');
    }
  };

  const handleDeleteAccount = async () => {
    setMessage(null);
    setError(null);
    try {
      const id = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!id || !token) throw new Error('No autenticado');
      const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Error al eliminar la cuenta');
      setMessage('Cuenta eliminada correctamente');
      // Aquí podrías redirigir al usuario al logout o landing
    } catch (err) {
      setError((err as Error).message || 'Error al eliminar la cuenta');
    }
  };

  return (
    <div className="w-[500px] h-full bg-white rounded-[50px] shadow-md p-8 mx-auto my-5 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <Image 
          src={profileImage || '/images/profileDefault.png'} 
          alt="Foto de perfil" 
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <button 
          onClick={handleRemoveImage}
          className="bg-transparent text-red-500 border-none px-2 py-1 rounded text-sm cursor-pointer transition-colors hover:text-red-400"
        >
          Eliminar foto
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <label className="flex flex-col justify-center items-center w-full h-[70px] bg-white rounded-xl shadow-md cursor-pointer text-2xl text-purple-900 transition-colors hover:bg-gray-100 hover:text-purple-800">
          <FiUpload className="text-2xl" />
          <span className="text-sm mt-1 font-sans text-purple-900">Importar foto</span>
          <input 
            type="file" 
            id="cambiarFoto" 
            accept="image/*" 
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre completo" 
          value={formData.nombre}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="text" 
          name="ciudad" 
          placeholder="Ciudad" 
          value={formData.ciudad}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="text" 
          name="direccion" 
          placeholder="Dirección" 
          value={formData.direccion}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Teléfono" 
          value={formData.telefono}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="email" 
          name="correo" 
          placeholder="Correo electrónico" 
          value={formData.correo}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        {message && <div className="text-green-600 text-sm text-center">{message}</div>}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button 
          type="submit" 
          className="bg-purple-900 text-white border-none py-3 rounded-full cursor-pointer text-base transition-colors hover:bg-purple-800"
        >
          Guardar cambios
        </button>
      </form>

      <div className="flex justify-start gap-4 mt-5 w-full">
        <button onClick={handleDeleteAccount} className="flex items-center gap-2 bg-transparent border-none text-purple-900 text-sm cursor-pointer transition-colors hover:text-purple-800">
          <FiTrash2 className="text-lg" />
          Eliminar cuenta
        </button>
        <button className="flex items-center gap-2 bg-transparent border-none text-purple-900 text-sm cursor-pointer transition-colors hover:text-purple-800">
          <FiKey className="text-lg" />
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
}
