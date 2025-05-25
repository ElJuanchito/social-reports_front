import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/Ribbons";
import NavBar from "@/components/NavBar";
import { ModalProvider } from "../components/ModalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alert360",
  description: "Alert360",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <link rel="icon" href="/favicon.svg" sizes="any" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden flex flex-col`}
      >
        <ModalProvider>
          <NavBar />
          {children}
          <ClickSpark
            baseThickness={10}
            colors={['#00fba9']}
            speedMultiplier={0.5}
            maxAge={500}
            enableFade={false}
            enableShaderEffect={true} />
        </ModalProvider>
      </body>
    </html>
  );
}
