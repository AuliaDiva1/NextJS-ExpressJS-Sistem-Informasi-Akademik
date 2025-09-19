"use client";

export default function PengumumanList({ data }) {
  return (
    <div className="space-y-2">
      {data.length === 0 && <p className="text-gray-400">Belum ada pengumuman.</p>}
      {data.map((p) => (
        <div key={p.id} className="p-2 border rounded bg-gray-50">
          <h4 className="font-semibold">{p.judul}</h4>
          <p>{p.isi}</p>
          <small className="text-gray-500">{p.tanggal}</small>
        </div>
      ))}
    </div>
  );
}
