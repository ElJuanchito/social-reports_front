import Link from 'next/link';
import Image from 'next/image';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container flex flex-col px-4 py-16">
        <div className="flex self-center gap-8 max-w-1/2">
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="relative h-32 w-48">
                <Image
                  src="/logo-dark.svg"
                  alt="Alert360 Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="mb-6">
              Una plataforma comunitaria para reportar y resolver incidentes en tu vecindario en tiempo real.
            </p>
            <div className="flex flex-col space-x-4">
              <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <BsGithub /> BackEnd
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <BsGithub /> FrontEnd
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Funcionalidades</h3>
            <ul className="space-y-4">
              <li><Link href="/features" className="hover:text-amber-400 transition-colors">Reportes geolocalizados</Link></li>
              <li><Link href="/features" className="hover:text-amber-400 transition-colors">Categorías de incidentes</Link></li>
              <li><Link href="/features" className="hover:text-amber-400 transition-colors">Notificaciones en tiempo real</Link></li>
              <li><Link href="/features" className="hover:text-amber-400 transition-colors">Comunidad colaborativa</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Alert360. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}