'use client';

export default function NilaiPage() {
  const dataNilai = [
    { mapel: "Matematika", nilai: 88, keterangan: "Baik" },
    { mapel: "Bahasa Indonesia", nilai: 92, keterangan: "Sangat Baik" },
    { mapel: "Bahasa Inggris", nilai: 76, keterangan: "Cukup" },
    { mapel: "IPA", nilai: 85, keterangan: "Baik" },
    { mapel: "IPS", nilai: 80, keterangan: "Baik" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Informasi Nilai</h1>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Mata Pelajaran</th>
            <th className="text-left px-4 py-2">Nilai</th>
            <th className="text-left px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {dataNilai.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{row.mapel}</td>
              <td className="px-4 py-2 font-semibold">{row.nilai}</td>
              <td className="px-4 py-2">{row.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
