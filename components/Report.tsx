"use client";
import { useState } from 'react';
import { Map } from '@/components/maps/Map';
import { Geocoder } from './maps/GeoCoder';
import { createReport as createReportService } from '@/components/services/reports';

interface ReportForm {
  title: string;
  description: string;
  categories: string[];
  images: File[];
  location: string;
  latitude?: number;
  longitude?: number;
}

const ReportPage: React.FC = () => {
  const [form, setForm] = useState<ReportForm>({
    title: '',
    description: '',
    categories: [],
    images: [],
    location: '',
  });

  const [selectedMarker, setSelectedMarker] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

  const handleSelectCoords = (coords: { latitude: number; longitude: number }) => {
    setForm(f => ({
      ...f,
      latitude: coords.latitude,
      longitude: coords.longitude,
      location: `Lat: ${coords.latitude}, Lng: ${coords.longitude}`
    }));
    setSelectedMarker(coords);
  };

  const handleGeocoderResult = (data: { location: string; latitude: number; longitude: number }) => {
    setForm(f => ({
      ...f,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
    }));
    setSelectedMarker({ latitude: data.latitude, longitude: data.longitude });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files) {
        setForm(f => ({ ...f, images: e.target.files ? Array.from(e.target.files) : [] }));
      }
    }
  };

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [userId] = useState<number>(1); // Simulación de usuario autenticado
  const [email] = useState<string>('usuario@ejemplo.com'); // Simulación de email autenticado

  const createReport = async () => {
    setError(null);
    setSuccess(null);
    const { title, description, location, latitude, longitude, categories, images } = form;
    const missingFields: string[] = [];
    if (!title) missingFields.push('Título');
    if (!description) missingFields.push('Descripción');
    if (!location) missingFields.push('Ubicación');
    if (latitude === undefined) missingFields.push('Latitud');
    if (longitude === undefined) missingFields.push('Longitud');
    if (!categories || categories.length === 0) missingFields.push('Categoría');
    if (!images || images.length === 0) missingFields.push('Imagen');
    if (!userId) missingFields.push('Usuario');
    if (!email) missingFields.push('Email');
    if (missingFields.length > 0) {
      console.log('Faltan los siguientes campos en el formulario:', missingFields);
      showAlert('error', `Por favor completa todos los campos obligatorios: ${missingFields.join(', ')}`);
      return;
    }
    try {
      const reportPayload = JSON.stringify({
        title,
        description,
        categories: categories.map((cat) => typeof cat === 'string' ? { name: cat, description: cat } : cat),
        location,
        latitude,
        longitude,
        userId,
        email
      });
      const res = await createReportService(reportPayload, images);
      setSuccess('Reporte creado exitosamente.');
      showAlert('success', 'Reporte creado exitosamente.');
      console.log('Created:', res);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Error al crear el reporte');
      showAlert('error', error.message || 'Error al crear el reporte');
    }
  };

  // Modal para feedback
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ type: 'error' | 'success' | 'info', message: string } | null>(null);
  const closeModal = () => setShowModal(false);

  // Utilidad para mostrar alertas en modal
  const showAlert = (type: 'error' | 'success' | 'info', message: string) => {
    setModalContent({ type, message });
    setShowModal(true);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Modal de feedback global */}
      {showModal && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            {modalContent.type === 'error' && (
              <div className="text-red-500 font-bold mb-2">{modalContent.message}</div>
            )}
            {modalContent.type === 'success' && (
              <div className="text-green-600 font-bold mb-2">{modalContent.message}</div>
            )}
            {modalContent.type === 'info' && (
              <div className="text-blue-600 font-bold mb-2">{modalContent.message}</div>
            )}
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cerrar</button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold">Crear Reporte</h1>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <input
        type="text"
        placeholder="Título"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        className="border p-2 w-full"
      />

      <input type="file" multiple onChange={handleFileChange} />

      <Geocoder onResult={handleGeocoderResult} />

      <Map onSelect={handleSelectCoords} initialMarker={selectedMarker} />

      <button
        onClick={createReport}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar Reporte
      </button>
    </div>
  );
};

export default ReportPage;