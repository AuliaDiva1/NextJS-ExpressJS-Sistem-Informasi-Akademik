'use client';
import Navbar from '@/app/components/NavbarSiswa';

export default function SiswaLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar di atas */}
      <Navbar />

      {/* Isi konten */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
