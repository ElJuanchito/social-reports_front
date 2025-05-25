"use client";

import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  delay?: number;
}

export default function CategoryCard({ name, description, icon, color, delay = 0 }: CategoryCardProps) {
  const iconComponents: Record<string, JSX.Element> = {
    'shield': (
      <svg className="w-6 h-6" fill="none" stroke="#20cfcf" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"></path>
      </svg>
    ),
    'heart-pulse': (
      <svg className="w-6 h-6" fill="none" stroke="#00fba9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    ),
    'road': (
      <svg className="w-6 h-6" fill="none" stroke="#00bfae" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
      </svg>
    ),
    'paw-print': (
      <svg className="w-6 h-6" fill="none" stroke="#00fba9" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.172a2 2 0 00-1.962 1.608l-.992 5.162A2 2 0 0012.171 12H8.12a2 2 0 01-1.92-1.434L5.143 7.353A2 2 0 006.08 5h1.7a2 2 0 001.85-1.232l.164-.533a2 2 0 00-.689-2.185"></path>
      </svg>
    ),
    'tree': (
      <svg className="w-6 h-6" fill="none" stroke="#1c0747" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    )
  };

  return (
    <motion.div 
      className={`${color} rounded-xl p-6 text-white text-center flex flex-col items-center h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        {iconComponents[icon] || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-white text-opacity-80 text-sm">{description}</p>
    </motion.div>
  );
}
