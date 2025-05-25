"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterItemProps {
  endValue: number;
  suffix: string;
  title: string;
  duration?: number;
}

function CounterItem({ endValue, suffix, title, duration = 2 }: CounterItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = endValue;
      const totalDuration = duration * 1000;
      const incrementTime = totalDuration / end;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, endValue, duration]);
  
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}

export default function CounterSection() {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <CounterItem endValue={50000} suffix="+" title="Usuarios activos" />
          <CounterItem endValue={125000} suffix="+" title="Reportes resueltos" />
          <CounterItem endValue={250} suffix="+" title="Comunidades" />
          <CounterItem endValue={95} suffix="%" title="Casos verificados" />
        </motion.div>
      </div>
    </section>
  );
}
