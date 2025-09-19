'use client';

import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';

// Dummy: nanti ganti dengan API
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const GuruDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [siswaBaru, setSiswaBaru] = useState([]);
  const [agenda, setAgenda] = useState([]);

  // Palet warna konsisten
  const cardColors = ['#00ACC1', '#E53935', '#FFB300', '#8E24AA'];

  useEffect(() => {
    // Chart dummy
    const style = getComputedStyle(document.documentElement);
    setChartData({
      labels: ['Matematika', 'IPA', 'Bahasa', 'IPS', 'Seni'],
      datasets: [
        {
          label: 'Rata-rata Nilai',
          data: [80, 75, 88, 70, 85],
          backgroundColor: cardColors,
          borderColor: cardColors,
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: style.getPropertyValue('--text-color') }, grid: { color: style.getPropertyValue('--surface-border') } },
        y: { ticks: { color: style.getPropertyValue('--text-color') }, beginAtZero: true },
      },
    });

    // Dummy siswa baru
    setSiswaBaru([
      { id: 1, nama: 'Andi', kelas: 'X IPA 1' },
      { id: 2, nama: 'Budi', kelas: 'X IPS 2' },
      { id: 3, nama: 'Citra', kelas: 'X IPA 2' },
    ]);

    // Dummy agenda
    setAgenda([
      { id: 1, kegiatan: 'Rapat Guru', tanggal: '2025-09-20' },
      { id: 2, kegiatan: 'Penilaian Tengah Semester', tanggal: '2025-09-25' },
    ]);
  }, []);

  const cards = [
    { title: 'Jumlah Siswa', value: 320, icon: 'pi pi-users', border: cardColors[0] },
    { title: 'Jumlah Kelas', value: 12, icon: 'pi pi-home', border: cardColors[1] },
    { title: 'Kehadiran Hari Ini', value: '95%', icon: 'pi pi-check-circle', border: cardColors[2] },
    { title: 'Agenda Mengajar', value: 5, icon: 'pi pi-calendar', border: cardColors[3] },
  ];

  return (
    <div className="grid">
      <div className="card col-12 mb-2">
        <div className="flex justify-content-between align-items-center">
          <h1 className="text-xl font-semibold mb-3 flex-1">Dashboard Guru</h1>
          <span className="text-sm font-bold text-700">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="col-12">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          {/* Ringkasan & Statistik */}
          <TabPanel header="Ringkasan & Statistik">
            <div className="grid">
              {cards.map((card, i) => (
                <div className="col-12 md:col-6 xl:col-3" key={i}>
                  <Card className="shadow-md" style={{ borderTop: `4px solid ${card.border}` }}>
                    <div className="flex justify-content-between">
                      <div>
                        <span className="block text-500 mb-2">{card.title}</span>
                        <span className="text-900 font-bold text-xl md:text-2xl">{card.value}</span>
                      </div>
                      <div className="flex align-items-center justify-content-center border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <i className={`${card.icon} text-xl`} />
                        <Tag value="Live" severity="info" className="ml-2" />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}

              <div className="col-12">
                <Card>
                  <div className="flex justify-content-between mb-3">
                    <span className="font-medium text-lg text-900">Rata-rata Nilai Per Mata Pelajaran</span>
                    <Tag value="Live" severity="info" />
                  </div>
                  <Chart type="bar" data={chartData} options={chartOptions} className="w-full h-64" />
                </Card>
              </div>
            </div>
          </TabPanel>

          {/* Data Terkini */}
          <TabPanel header="Data Terkini">
            <div className="grid">
              <div className="col-12 md:col-6">
                <Card>
                  <div className="flex justify-content-between mb-3">
                    <span className="font-medium text-lg text-900">Siswa Baru</span>
                    <Tag value="Live" severity="info" />
                  </div>
                  <DataTable value={siswaBaru} paginator rows={5} responsiveLayout="scroll" stripedRows>
                    <Column field="id" header="ID" sortable />
                    <Column field="nama" header="Nama" sortable />
                    <Column field="kelas" header="Kelas" sortable />
                  </DataTable>
                </Card>
              </div>

              <div className="col-12 md:col-6">
                <Card>
                  <div className="flex justify-content-between mb-3">
                    <span className="font-medium text-lg text-900">Agenda Guru</span>
                    <Tag value="Live" severity="info" />
                  </div>
                  <DataTable value={agenda} paginator rows={5} responsiveLayout="scroll" stripedRows>
                    <Column field="id" header="ID" sortable />
                    <Column field="kegiatan" header="Kegiatan" sortable />
                    <Column field="tanggal" header="Tanggal" sortable />
                  </DataTable>
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default GuruDashboard;
