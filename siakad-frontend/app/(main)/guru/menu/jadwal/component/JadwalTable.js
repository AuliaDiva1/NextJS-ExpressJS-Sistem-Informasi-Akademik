'use client';

import React from 'react';

export default function JadwalTable({ jadwal, filterHari }) {
  // Filter sesuai hari jika diberikan
  const data = filterHari ? jadwal.filter(j => j.hari === filterHari) : jadwal;

  if (data.length === 0) {
    return <p className="mt-4 text-center text-gray-500">Belum ada jadwal.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 mt-4">
      <thead>
        <tr className="text-center">
          <th className="py-2 px-4 border-b">No</th>
          <th className="py-2 px-4 border-b">Mata Pelajaran</th>
          <th className="py-2 px-4 border-b">Rombel</th>
          <th className="py-2 px-4 border-b">Hari</th>
          <th className="py-2 px-4 border-b">Jam</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id} className="text-center">
            <td className="py-2 px-4 border-b">{index + 1}</td>
            <td className="py-2 px-4 border-b">{item.mapel}</td>
            <td className="py-2 px-4 border-b">{item.rombel}</td>
            <td className="py-2 px-4 border-b">{item.hari}</td>
            <td className="py-2 px-4 border-b">{item.jam}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
