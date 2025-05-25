"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdSearch } from "react-icons/io";
import { FiPlusSquare, FiArchive } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { RiHome2Line } from "react-icons/ri";

export default function NavBar() {
    const [expanded, setExpanded] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { icon: <RiHome2Line className="size-7 text-secondary text-nowrap" />, text: "Inicio", href: "/app", id: 2 },
        { icon: <IoMdSearch className="size-7 text-secondary text-nowrap" />, text: "Buscar", href: "/app/search", id: 1 },
        { icon: <FiPlusSquare className="size-7 text-secondary text-nowrap" />, text: "Crear reporte", href: "/app/create", id: 3 },
        { icon: <FiArchive className="size-7 text-secondary text-nowrap" />, text: "Historiales", href: "/app/history", id: 4 },
    ];

    return (
        <div className="flex">
            {/* Collapsed NavBar */}
            <div className={`bg-white shadow-lg transition-all duration-300 ${expanded ? "w-64" : "w-16"} flex flex-col py-4 px-2`}>
                {/* Hamburger button */}
                <button
                    className="mb-8 h-11 pl-3 pr-4 rounded-lg flex items-center transition-colors hover:bg-gray-100"
                    onClick={() => setExpanded(prev => !prev)}
                >
                    <div className="flex flex-col gap-[3px] w-6">
                        <motion.div
                            animate={{ width: expanded ? 24 : 12 }}
                            className="h-[4px] bg-black rounded-full"
                        />
                        <motion.div
                            animate={{ width: expanded ? 24 : 20 }}
                            className="h-[4px] bg-black rounded-full"
                        />
                        <motion.div
                            animate={{ width: expanded ? 24 : 12 }}
                            className="h-[4px] bg-black rounded-full"
                        />
                    </div>
                    {expanded && (
                        <span className="text-lg ml-3">{"Menú"}</span>
                    )}
                </button>


                {/* Navigation links */}
                <div className="flex-1 flex flex-col py-1 h-8 gap-1">
                    {menuItems.map((item) => {
                        const isSelected = pathname === item.href;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex h-10 items-center px-2 rounded-lg transition-colors ${isSelected ? "bg-secondary text-white" : "hover:bg-gray-100 text-gray-500"}`}
                            >
                                <span className="relative flex justify-center items-center w-8 min-w-8 flex-shrink-0">
                                    {/* Ícono azul */}
                                    <span className={`absolute inset-0 flex justify-center items-center transition-opacity duration-200 ${isSelected ? 'opacity-0' : 'opacity-100'}`}> 
                                        {React.cloneElement(item.icon, { className: 'size-7 text-secondary' })}
                                    </span>
                                    {/* Ícono blanco */}
                                    <span className={`absolute inset-0 flex justify-center items-center transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}> 
                                        {React.cloneElement(item.icon, { className: 'size-7 text-white' })}
                                    </span>
                                    {/* fallback para layout */}
                                    <span className="invisible"> 
                                        {React.cloneElement(item.icon, { className: 'size-7' })}
                                    </span>
                                </span>
                                {expanded && (
                                    <span className={`text-lg ml-3 text-nowrap ${isSelected ? "text-white" : ""}`}>{item.text}</span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Logout */}
                <div className="mt-auto px-2 pt-4 border-t border-gray-200">
                    <Link
                        href="/"
                        className="flex h-10 items-center pl-4 pr-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-500"
                    >
                        <span className="flex justify-center items-center w-8 min-w-8 flex-shrink-0">
                            <FaSignOutAlt className="size-5" />
                        </span>
                        {expanded && (
                            <span className="text-lg ml-3 text-nowrap">Cerrar sesión</span>
                        )}
                    </Link>
                </div>
            </div>

        </div>
    );
}