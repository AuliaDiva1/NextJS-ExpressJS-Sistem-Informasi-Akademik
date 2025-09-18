'use client';

import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function GuruDashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [siswaBaru, setSiswaBaru] = useState([]);
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    // Dummy data, nanti diganti API
    const data = {
      labels: ['Matematika', 'IPA', 'Bahasa', 'IPS', 'Seni'],
      datasets: [
        {
          label: 'Rata-rata Nilai',
          data: [80, 75, 88, 70, 85],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#AB47BC']
        }
      ]
    };

    const options = {
      plugins: {
        legend: {
          labels: { color: '#495057' }
        }
      },
      scales: {
        x: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } },
        y: { ticks: { color: '#495057' }, grid: { color: '#ebedef' } }
      }
    };

    setChartData(data);
    setChartOptions(options);

    // Dummy data siswa baru
    setSiswaBaru([
      { id: 1, nama: 'Andi', kelas: 'X IPA 1' },
      { id: 2, nama: 'Budi', kelas: 'X IPS 2' },
      { id: 3, nama: 'Citra', kelas: 'X IPA 2' },
    ]);

    // Dummy agenda guru
    setAgenda([
      { id: 1, kegiatan: 'Rapat Guru', tanggal: '2025-09-20' },
      { id: 2, kegiatan: 'Penilaian Tengah Semester', tanggal: '2025-09-25' },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Guru</h1>

      {/* Statistik singkat */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Jumlah Siswa" className="shadow-md text-center">
          <p className="text-3xl font-bold text-blue-600">320</p>
        </Card>
        <Card title="Jumlah Kelas" className="shadow-md text-center">
          <p className="text-3xl font-bold text-green-600">12</p>
        </Card>
        <Card title="Kehadiran Hari Ini" className="shadow-md text-center">
          <p className="text-3xl font-bold text-orange-600">95%</p>
        </Card>
        <Card title="Agenda Mengajar" className="shadow-md text-center">
          <p className="text-3xl font-bold text-purple-600">5</p>
        </Card>
      </div>

      {/* Chart nilai rata-rata */}
      <Card title="Rata-rata Nilai Per Mata Pelajaran" className="shadow-md">
        <Chart type="bar" data={chartData} options={chartOptions} className="h-64" />
      </Card>

      {/* Tabel siswa baru */}
      <Card title="Siswa Baru" className="shadow-md">
        <DataTable value={siswaBaru} responsiveLayout="scroll" stripedRows>
          <Column field="id" header="ID" />
          <Column field="nama" header="Nama" />
          <Column field="kelas" header="Kelas" />
        </DataTable>
      </Card>

      {/* Agenda guru */}
      <Card title="Agenda Guru" className="shadow-md">
        <DataTable value={agenda} responsiveLayout="scroll" stripedRows>
          <Column field="id" header="ID" />
          <Column field="kegiatan" header="Kegiatan" />
          <Column field="tanggal" header="Tanggal" />
        </DataTable>
      </Card>
    </div>
  );
}
