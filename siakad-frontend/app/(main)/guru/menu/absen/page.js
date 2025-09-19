'use client';

import { Card } from "primereact/card";
import AbsenGuru from "./component/AbsenGuru";
import AbsenSiswa from "./component/AbsenSiswa";
import TabelAbsenSiswa from "./component/TabelAbsenSiswa";

export default function AbsenPage() {
  return (
    <div className="p-3 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-5xl font-bold text-gray-800">Menu Absen</h1>
        <p className="text-gray-600 text-sm">
          Kelola absen guru dan siswa serta lihat rekap absen siswa.
        </p>
      </div>

      {/* Absen Guru */}
      <Card className="shadow-md rounded-xl p-3">
        <AbsenGuru />
      </Card>

      {/* Absen Siswa */}
      <Card className="shadow-md rounded-xl p-3">
        <AbsenSiswa />
      </Card>

      {/* Rekap Absen Siswa */}
      <Card className="shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Rekap Daftar Absen Siswa</h2>
        <TabelAbsenSiswa kelas={"X IPA 1"} /> 
        {/* default pakai kelas X IPA 1, nanti bisa dikontrol dari state */}
      </Card>
    </div>
  );
}
