'use client';

import { useState, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import TabelAbsenSiswa from './TabelAbsenSiswa';
import FormDialogAbsen from './FormDialogAbsen';

export default function AbsenSiswa() {
  const [kelas, setKelas] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    NIS: null,
    TANGGAL: null,
    STATUS: null,
    KETERANGAN: '',
  });
  const toast = useRef(null);

  const kelasOptions = [
    { label: 'X IPA 1', value: 'X IPA 1' },
    { label: 'X IPA 2', value: 'X IPA 2' },
    { label: 'X IPS 1', value: 'X IPS 1' },
  ];

  // Contoh data siswa (ini nanti bisa ambil dari API sesuai kelas)
  const siswaOptions = [
    { label: '1001 - Andi', value: '1001' },
    { label: '1002 - Budi', value: '1002' },
    { label: '1003 - Citra', value: '1003' },
  ];

  const handleSubmit = () => {
    if (!formData.NIS || !formData.TANGGAL || !formData.STATUS) {
      toast.current.show({
        severity: 'warn',
        summary: 'Gagal',
        detail: 'Semua field wajib diisi!',
      });
      return;
    }

    // Simulasi simpan data absen siswa
    console.log('Data Absen Siswa:', { ...formData, kelas });
    setShowForm(false);
    toast.current.show({
      severity: 'success',
      summary: 'Absen Tercatat',
      detail: `Siswa ${formData.NIS} absen ${formData.STATUS}`,
    });

    // Reset form
    setFormData({
      NIS: null,
      TANGGAL: null,
      STATUS: null,
      KETERANGAN: '',
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2 className="text-lg font-semibold mb-3">Absen Siswa</h2>
      <div className="flex items-center gap-3 mb-4">
        <Dropdown
          value={kelas}
          options={kelasOptions}
          onChange={(e) => setKelas(e.value)}
          placeholder="Pilih Kelas"
        />
        <Button
          label="Tambah Absen"
          icon="pi pi-plus"
          onClick={() => setShowForm(true)}
          disabled={!kelas}
        />
      </div>

      {kelas ? (
        <TabelAbsenSiswa kelas={kelas} />
      ) : (
        <p className="text-gray-500">Silakan pilih kelas untuk melihat data absen.</p>
      )}

      <FormDialogAbsen
        visible={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        siswaOptions={siswaOptions}
        isGuru={false}
      />
    </div>
  );
}
