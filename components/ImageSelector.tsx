"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ImageSelectorProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  onChange,
  maxFiles = 5,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFiles = Array.from(e.target.files).slice(0, maxFiles);

    // Crear URLs para vista previa
    const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));

    // Limpiar cualquier URL previa para evitar memory leaks
    previewImages.forEach(url => URL.revokeObjectURL(url));

    setPreviewImages(newPreviewUrls);
    onChange(selectedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFiles = Array.from(e.dataTransfer.files).slice(0, maxFiles);
      const newPreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));

      previewImages.forEach(url => URL.revokeObjectURL(url));

      setPreviewImages(newPreviewUrls);
      onChange(selectedFiles);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);

    // Liberar la URL que ya no se usa
    URL.revokeObjectURL(previewImages[indexToRemove]);

    setPreviewImages(newPreviews);

    // Por ahora, podemos enviar un array vacío para indicar cambio
    onChange([]);
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="mb-3 text-3xl text-blue-500">
            <i className='bx bx-image-add'></i>
          </div>
          <div className="text-gray-700 font-medium">
            Arrastra tus imágenes aquí o haz clic para seleccionar
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Puedes subir hasta {maxFiles} imágenes (JPG, PNG)
          </div>
        </label>
      </div>

      {previewImages.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Vista previa</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewImages.map((url, index) => (
              <div key={index} className="relative group">
                <div className="relative h-40 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <Image
                    src={url}
                    alt={`Vista previa ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md opacity-75 hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
