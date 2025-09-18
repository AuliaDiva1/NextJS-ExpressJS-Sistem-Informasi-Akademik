'use client';

export default function AbsenPage() {
  const dataAbsensi = [
    { tanggal: "2025-09-01", status: "Hadir" },
    { tanggal: "2025-09-02", status: "Hadir" },
    { tanggal: "2025-09-03", status: "Izin" },
    { tanggal: "2025-09-04", status: "Sakit" },
    { tanggal: "2025-09-05", status: "Hadir" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Absensi</h1>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Tanggal</th>
            <th className="text-left px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataAbsensi.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{row.tanggal}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    row.status === "Hadir"
                      ? "bg-green-500"
                      : row.status === "Sakit"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
