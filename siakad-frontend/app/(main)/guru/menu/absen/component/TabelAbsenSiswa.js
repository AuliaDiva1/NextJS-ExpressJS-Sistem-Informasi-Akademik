'use client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TabelAbsenSiswa({ kelas }) {
  // Simulasi data siswa
  const data = [
    { id: 1, nama: 'Andi', kelas: 'X IPA 1', status: 'Hadir' },
    { id: 2, nama: 'Budi', kelas: 'X IPA 1', status: 'Izin' },
    { id: 3, nama: 'Citra', kelas: 'X IPA 1', status: 'Sakit' },
  ].filter((s) => s.kelas === kelas);

  return (
    <DataTable value={data} stripedRows responsiveLayout="scroll">
      <Column field="id" header="ID" />
      <Column field="nama" header="Nama Siswa" />
      <Column field="kelas" header="Kelas" />
      <Column field="status" header="Status" />
    </DataTable>
  );
}
