"use client";

import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DetailSiswaDialog from "./component/DetailSiswaDialog";

export default function ProfileSiswaPage() {
  const [visible, setVisible] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // Data dummy siswa
  const siswaList = [
    {
      id: 1,
      nama: "Andi Setiawan",
      nisn: "1234567890",
      nis: "2023001",
      kelas: "X",
      rombel: "IPA 1",
      gender: "L",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
      alamat: "Jl. Melati No. 10, Surakarta",
      ttl: "Surakarta, 12 Januari 2007",
    },
    {
      id: 2,
      nama: "Siti Aisyah",
      nisn: "0987654321",
      nis: "2023002",
      kelas: "X",
      rombel: "IPA 1",
      gender: "P",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
      alamat: "Jl. Mawar No. 5, Karanganyar",
      ttl: "Karanganyar, 8 Februari 2007",
    },
  ];

  const handleLihatDetail = (siswa) => {
    setSelectedSiswa(siswa);
    setVisible(true);
  };

  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-5xl font-bold text-gray-800">Profil Siswa</h2>
        <p className="text-gray-600 text-sm">
          Lihat data profil siswa secara detail dan terorganisir.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Nama Siswa</th>
              <th className="border px-3 py-2">NISN</th>
              <th className="border px-3 py-2">NIS</th>
              <th className="border px-3 py-2">Kelas</th>
              <th className="border px-3 py-2">Rombel</th>
              <th className="border px-3 py-2">L/P</th>
              <th className="border px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {siswaList.map((siswa, index) => (
              <tr key={siswa.id} className="text-center hover:bg-gray-50">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{siswa.nama}</td>
                <td className="border px-3 py-2">{siswa.nisn}</td>
                <td className="border px-3 py-2">{siswa.nis}</td>
                <td className="border px-3 py-2">{siswa.kelas}</td>
                <td className="border px-3 py-2">{siswa.rombel}</td>
                <td className="border px-3 py-2">{siswa.gender}</td>
                <td className="border px-3 py-2">
                  <Button
                    label="Lihat Detail"
                    icon="pi pi-search"
                    className="p-button-sm p-button-outlined"
                    onClick={() => handleLihatDetail(siswa)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop up detail siswa */}
      <Dialog
        header="Detail Siswa"
        visible={visible}
        style={{ width: "60vw" }}
        modal
        onHide={() => setVisible(false)}
      >
        {selectedSiswa && <DetailSiswaDialog siswa={selectedSiswa} />}
      </Dialog>
    </div>
  );
}
