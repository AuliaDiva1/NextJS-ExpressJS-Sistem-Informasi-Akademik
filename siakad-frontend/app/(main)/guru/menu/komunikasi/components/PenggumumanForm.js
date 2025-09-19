"use client";

import { useState } from "react";

export default function PengumumanForm({ onSubmit }) {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!judul || !isi) return;
    onSubmit({ judul, isi, tanggal: new Date().toLocaleDateString() });
    setJudul("");
    setIsi("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="text"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul pengumuman"
        className="w-full border px-2 py-1 rounded"
      />
      <textarea
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        placeholder="Isi pengumuman"
        className="w-full border px-2 py-1 rounded"
        rows={3}
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-1 rounded"
      >
        Tambah
      </button>
    </form>
  );
}
