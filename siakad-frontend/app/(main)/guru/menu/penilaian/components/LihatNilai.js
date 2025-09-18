"use client";

import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { getPredikat } from "./../../../../../../utilities/PredikatUtils";

export default function LihatNilai() {
  const [form, setForm] = useState({ jenis: null, kelas: null, mapel: null });
  const [showTable, setShowTable] = useState(false);

  const jenisOptions = [{ label: "Nilai Raport", value: "raport" }];
  const kelasOptions = [
    { label: "X IPA 1", value: "X IPA 1" },
    { label: "X IPA 2", value: "X IPA 2" },
  ];
  const mapelOptions = [
    { label: "Matematika", value: "Matematika" },
    { label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
  ];

  const [data, setData] = useState([
    { id: 1, nama: "Andi", pengetahuan: 80, keterampilan: 85 },
    { id: 2, nama: "Budi", pengetahuan: 90, keterampilan: 88 },
  ]);

  const handleChangeNilai = (id, field, value) => {
    setData(data.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  return (
    <div className="space-y-6">
      {/* Form + Petunjuk */}
      <div className="grid grid-cols-3 gap-6">
        {/* Form */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Nilai</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-1">Pilih Jenis Nilai</p>
              <Dropdown
                value={form.jenis}
                options={jenisOptions}
                onChange={(e) => setForm({ ...form, jenis: e.value })}
                placeholder="-- Pilih Jenis Nilai --"
                className="w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Kelas</p>
              <Dropdown
                value={form.kelas}
                options={kelasOptions}
                onChange={(e) => setForm({ ...form, kelas: e.value })}
                placeholder="-- Pilih Kelas --"
                className="w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-1">Mata Pelajaran</p>
              <Dropdown
                value={form.mapel}
                options={mapelOptions}
                onChange={(e) => setForm({ ...form, mapel: e.value })}
                placeholder="-- Pilih Mata Pelajaran --"
                className="w-full"
              />
            </div>
            <Button
              label="Lihat Nilai"
              icon="pi pi-search"
              onClick={() => setShowTable(true)}
              className="mt-2"
            />
          </div>
        </div>

        {/* Petunjuk */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-700 mb-2">Petunjuk</h4>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
            <li>Pilih jenis nilai yang akan dilihat</li>
            <li>Pilih kelas dan mata pelajaran</li>
            <li>Kemudian klik tombol <b>Lihat Nilai</b></li>
            <li>Setelah itu nilai akan muncul otomatis di bawah</li>
          </ol>
        </div>
      </div>

      {/* Info Kelas */}
      {showTable && (
        <div className="bg-gray-100 p-4 rounded-md shadow">
          <p><b>Kelas:</b> {form.kelas}</p>
          <p><b>Jumlah Siswa:</b> {data.length}</p>
          <p><b>Mata Pelajaran:</b> {form.mapel} (Guru Pengajar)</p>
          <p><b>Wali Kelas:</b> Ibu Ani</p>
        </div>
      )}

      {/* Tabel Nilai */}
      {showTable && (
        <DataTable value={data} className="shadow-md rounded-lg" stripedRows>
          <Column field="id" header="No" />
          <Column field="nama" header="Nama Siswa" />
          <Column
            header="Pengetahuan (Angka)"
            body={(row) => (
              <InputText
                type="number"
                value={row.pengetahuan}
                onChange={(e) =>
                  handleChangeNilai(row.id, "pengetahuan", e.target.value)
                }
                className="w-24"
              />
            )}
          />
          <Column
            header="Pengetahuan (Predikat)"
            body={(row) => getPredikat(row.pengetahuan)}
          />
          <Column
            header="Keterampilan (Angka)"
            body={(row) => (
              <InputText
                type="number"
                value={row.keterampilan}
                onChange={(e) =>
                  handleChangeNilai(row.id, "keterampilan", e.target.value)
                }
                className="w-24"
              />
            )}
          />
          <Column
            header="Keterampilan (Predikat)"
            body={(row) => getPredikat(row.keterampilan)}
          />
          <Column
            header="Aksi"
            body={() => (
              <div className="flex gap-2">
                <Button icon="pi pi-save" severity="success" text />
                <Button icon="pi pi-trash" severity="danger" text />
              </div>
            )}
          />
        </DataTable>
      )}
    </div>
  );
}
