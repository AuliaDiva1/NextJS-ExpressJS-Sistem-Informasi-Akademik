"use client";

import { Card } from "primereact/card";
import AbsenGuru from "./component/AbsenGuru";
import AbsenSiswa from "./component/AbsenSiswa";
import TabelAbsenSiswa from "./component/TabelAbsenSiswa";

export default function AbsenPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Menu Absen</h1>

      {/* Absen Guru */}
      <Card className="shadow-md">
        <AbsenGuru />
      </Card>

      {/* Absen Siswa */}
      <Card className="shadow-md">
        <AbsenSiswa />
      </Card>

      {/* Rekap Absen Siswa */}
      <Card className="shadow-md">
        <h2 className="text-lg font-semibold mb-3">📌 Rekap Daftar Absen Siswa</h2>
        <TabelAbsenSiswa kelas={"X IPA 1"} /> 
        {/* default pakai kelas X IPA 1, nanti bisa dikontrol dari state */}
      </Card>
    </div>
  );
}
