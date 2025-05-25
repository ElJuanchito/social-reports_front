"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
    const [notifications, setNotifications] = useState(false);
    const pathname = usePathname();
    const startsApp = pathname.startsWith("/app");
    console.log(pathname)
    return <div className={`bg-white py-4 px-8 ${startsApp ? "" : "rounded-full mx-3 mt-3 top-3"} flex justify-between items-center sticky z-[999]`}>
        <Link className="flex size-8" href={!startsApp ? "/app" : "/"} >
            <Image src={"/favicon-dark.svg"} width={64} height={64} alt={""} />
        </Link>
        {!startsApp && <div className="flex items-center gap-8">
            <Link href={{ pathname: "/auth", query: { mode: "signup" } }}>Regístrate</Link>
            <Link href={{ pathname: "/auth", query: { mode: "signin" } }} >Inicia sesión</Link>
            <Link href={"#"}>Nosotros</Link>
            <Link href={"#"}>Contáctanos</Link>
        </div>}
        {startsApp && <div className="flex items-center gap-4">
            <Link href={"#"} onClick={() => {
                setNotifications(!notifications)
            }}><Image className="size-8" src={notifications ? "/bell-unread.svg" : "/bell.svg"} width={64} height={64} alt={""} /></Link>
            <Link href={"/app/profile"}><Image className="size-8" src={"/user.svg"} width={64} height={64} alt={""} /></Link>
        </div>}
    </div>;
}