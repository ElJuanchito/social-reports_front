'use client';

import { useState } from 'react';
import Image from 'next/image';
import { increaseImportance } from '@/components/services/reports';

interface Report {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  user: {
    name: string;
    profileImage?: string;
  };
  images: string[];
  likes: number;
  comments: number;
  isVerified?: boolean;
}

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(report.likes);
  const handleLike = async () => {
    try {
      const success = await increaseImportance(report.id);
      if (success) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error toggling importance:', error);
    }
  };

  return (
    <div className="caja textoBasico bg-white rounded-lg shadow-md p-4 space-y-4">
      <form>
        <div className="cajaSecundaria flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <img
              className="fotoPerfil w-10 h-10 rounded-full object-cover"
              src={report.user.profileImage || '/profileDefault.png'}
              alt={report.user.name}
            />
            <div className="flex flex-col">
              <span className="font-bold">{report.user.name}</span>
              <span>{report.category}</span>
              <span>{report.location}</span>
              <span>{report.status}</span>
            </div>
          </div>
          <div className="iconito flex items-center space-x-2">
            {report.isVerified && (
              <i style={{ color: 'blue' }} className="bx bxs-badge-check text-xl" />
            )}
            <button type="button" className="text-gray-600 hover:text-gray-800">
              <i className="bx bx-dots-horizontal-rounded text-xl" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <p className="font-bold text-lg">{report.title}</p>
          <p className="text-gray-700">{report.description}</p>
        </div>

        {report.images?.length > 0 && (
          <img
            className="foto w-full h-64 object-cover rounded-lg mb-2"
            src={`/${report.images[0].replace(/\\/g, '/')}`}
            alt={report.title}
          />
        )}

        <div className="flex items-center text-gray-600 space-x-2 mb-2">
          <i style={{ color: 'red' }} className="bx bx-heart text-xl" />
          <span>{likesCount}</span>
        </div>

        <div className="textoBasico flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              id="meImporta"
              type="button"
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 ${liked ? 'text-red-500' : 'text-gray-600'}`}
            >
              <i className={`bx ${liked ? 'bxs-heart-circle' : 'bx-heart-circle'} text-xl`} />
              <span>Me importa</span>
            </button>
            <button type="button" className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100">
              <i className="bx bx-message-dots text-xl" />
              <span>Comentar</span>
            </button>
          </div>
          <button type="button" className="text-left text-gray-600 hover:underline">
            {report.comments > 0 ? `${report.comments} comentarios` : 'Sin comentarios'}
          </button>
        </div>
      </form>
    </div>
  );
}
