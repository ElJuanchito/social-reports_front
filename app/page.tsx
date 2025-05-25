// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Components
import Footer from '@/components/Footer';
import FeatureCard from '@/components/FeatureCard';
import CategoryCard from '@/components/CategoryCard';
import { FaBell, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Reportes geolocalizados",
      description: "Reporta incidentes en tiempo real con precisión GPS y visualízalos en un mapa interactivo.",
      icon: "map-pin",
    },
    {
      title: "Categorías específicas",
      description: "Clasifica reportes por seguridad, emergencias médicas, infraestructura, mascotas y comunidad.",
      icon: "tag",
    },
    {
      title: "Notificaciones en tiempo real",
      description: "Recibe alertas instantáneas sobre incidentes cercanos a tu ubicación.",
      icon: "bell",
    },
    {
      title: "Comunidad colaborativa",
      description: "Comenta en reportes, verifica información y contribuye a la seguridad de tu vecindario.",
      icon: "users",
    },
    {
      title: "Seguimiento de incidentes",
      description: "Monitorea el estado de los reportes desde su creación hasta su resolución.",
      icon: "clipboard-check",
    },
    {
      title: "Priorización comunitaria",
      description: "Marca reportes como importantes para destacar incidentes urgentes.",
      icon: "alert-triangle",
    }
  ];

  const categories = [
    {
      name: "Seguridad",
      description: "Robos, actividades delictivas y situaciones sospechosas.",
      icon: "shield",
      color: "bg-[#20cfcf]",
    },
    {
      name: "Emergencias médicas",
      description: "Accidentes de tránsito, desmayos y otras emergencias de salud.",
      icon: "heart-pulse",
      color: "bg-terciary",
    },
    {
      name: "Infraestructura",
      description: "Calles en mal estado, problemas de alumbrado público.",
      icon: "road",
      color: "bg-[#00bfae]",
    },
    {
      name: "Mascotas",
      description: "Mascotas perdidas o encontradas en tu vecindario.",
      icon: "paw-print",
      color: "bg-terciary",
    },
    {
      name: "Comunidad",
      description: "Contaminación, basuras y otras preocupaciones vecinales.",
      icon: "tree",
      color: "bg-secondary",
    }
  ];

  return (
    <main className="flex-1 flex flex-col">


      {/* Hero Section */}
      <section className="relative px-2 bg-background py-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('/mapa.png')",
            backgroundSize: "cover",
            transform: `translateY(${scrollY * 0.2}px)`
          }}></div>
        </div>

        <motion.div
          className="container mx-auto px-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Image src={'/logo.svg'} alt={'Alert360'} width={512} height={512} className='w-1/3 h-fit'/>
            </motion.div>

            <motion.p
              className="text-xl lg:text-2xl mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Una plataforma comunitaria para reportar y resolver incidentes en tu vecindario en tiempo real.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Link href={{ pathname: "/auth", query: { mode: "signup" } }} className="bg-terciary hover:bg-secondary text-secondary hover:text-terciary font-bold py-3 px-8 rounded-lg text-center shadow-lg transition-all transform hover:scale-105">
                Regístrate ahora
              </Link>
              <Link href={{ pathname: "/auth", query: { mode: "signin" } }} className="bg-gray-100 bg-opacity-90 hover:bg-opacity-100 text-secondary font-bold py-3 px-8 rounded-lg text-center shadow-lg transition-all transform hover:scale-105">
                Inicia sesión
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-6">
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-terciary rounded-full flex items-center justify-center shadow-lg">
                  <FaMapMarkerAlt className="text-secondary w-8 h-8 lg:w-10 lg:h-10" />
                </div>
                <div className="w-20 h-20 lg:w-32 lg:h-32 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                  <FaBell className="text-terciary w-10 h-10 lg:w-14 lg:h-14" />
                </div>
                <div className="w-16 h-16 lg:w-24 lg:h-24 bg-terciary rounded-full flex items-center justify-center shadow-lg">
                  <FaUsers className="text-secondary w-8 h-8 lg:w-10 lg:h-10" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full">
                <div className="h-2 bg-gradient-to-r from-transparent via-terciary to-transparent opacity-60"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#f2f4f7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">¿Cómo funciona?</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Tres simples pasos para contribuir a la seguridad de tu comunidad
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <motion.div
              className="lg:w-1/3 text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-terciary w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-2xl font-bold mb-4">Regístrate</h3>
              <p className="text-secondary">Crea tu cuenta con tu información básica y verifica tu correo electrónico para activarla.</p>
            </motion.div>

            <motion.div
              className="lg:w-1/3 text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-terciary w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-2xl font-bold mb-4">Reporta incidentes</h3>
              <p className="text-secondary">Documenta situaciones con fotos, ubicación precisa y detalles para informar a tu comunidad.</p>
            </motion.div>

            <motion.div
              className="lg:w-1/3 text-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-terciary w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-2xl font-bold mb-4">Mantente informado</h3>
              <p className="text-secondary">Recibe notificaciones en tiempo real sobre incidentes cercanos a tu ubicación.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Características principales</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Alert360 está diseñado para brindar la mejor experiencia en reportes comunitarios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-[#f2f4f7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Categorías de reportes</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Organiza tus reportes en categorías para una respuesta más efectiva
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                description={category.description}
                icon={category.icon}
                color={category.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            Únete a Alert360 hoy mismo
          </motion.h2>
          <motion.p
            className="text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sé parte del cambio en tu comunidad. Juntos podemos crear vecindarios más seguros y conectados.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href={{ pathname: "/auth", query: { mode: "signup" } }} className="bg-secondary text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105">
              Regístrate gratis
            </Link>
            <Link href="/features" className="bg-transparent border-2 border-secondary font-bold py-4 px-10 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105 hover:bg-secondary/20">
              Conoce más
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}