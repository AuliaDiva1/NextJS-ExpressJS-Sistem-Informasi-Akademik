'use client';

import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [barChartData, setBarChartData] = useState({});
  const [barChartOptions, setBarChartOptions] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});

  // Palet warna konsisten
  const cardColors = ['#00ACC1', '#E53935', '#FFB300', '#8E24AA']; // Toska, Merah, Kuning, Ungu Muda

  useEffect(() => {
    axios.get(`${API_URL}/dashboard-sma`).then((res) => {
      const resData = res.data;
      setData(resData);

      const style = getComputedStyle(document.documentElement);

      // Bar chart: Statistik Sekolah
      const labels = ['Siswa', 'Guru', 'Kelas', 'Mata Pelajaran'];
      const values = resData.chart?.data ?? [500, 25, 15, 12];

      setBarChartData({
        labels,
        datasets: [
          {
            label: 'Statistik Sekolah',
            data: values,
            backgroundColor: cardColors,
            borderColor: cardColors,
            borderWidth: 1,
          },
        ],
      });

      setBarChartOptions({
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { beginAtZero: true, ticks: { color: style.getPropertyValue('--text-color') }, grid: { color: style.getPropertyValue('--surface-border') } },
          y: { ticks: { color: style.getPropertyValue('--text-color') } },
        },
      });

      // Line chart: Tren Siswa & Guru
      const lineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];
      setLineChartData({
        labels: lineLabels,
        datasets: [
          {
            label: 'Siswa',
            data: resData.trend?.siswa ?? [50, 55, 60, 65, 70, 72, 75],
            fill: false,
            borderColor: '#00ACC1',
            tension: 0.4,
          },
          {
            label: 'Guru',
            data: resData.trend?.guru ?? [5, 5, 6, 6, 7, 7, 8],
            fill: false,
            borderColor: '#E53935',
            tension: 0.4,
          },
        ],
      });

      setLineChartOptions({
        plugins: { legend: { labels: { color: style.getPropertyValue('--text-color') } } },
        scales: {
          x: { ticks: { color: style.getPropertyValue('--text-color') } },
          y: { ticks: { color: style.getPropertyValue('--text-color'), beginAtZero: true } },
        },
      });

    }).catch(err => {
      console.error('Gagal ambil data dashboard:', err);
      setData(null);
    });
  }, []);

  const cards = [
    { title: 'Siswa', value: data?.siswaCount ?? 500, icon: 'pi pi-users', border: cardColors[0] },
    { title: 'Guru', value: data?.guruCount ?? 25, icon: 'pi pi-user', border: cardColors[1] },
    { title: 'Kelas', value: data?.kelasCount ?? 15, icon: 'pi pi-home', border: cardColors[2] },
    { title: 'Mata Pelajaran', value: data?.mapelCount ?? 12, icon: 'pi pi-book', border: cardColors[3] },
  ];

  return (
    <div className="grid">
      <div className="card col-12 mb-2">
        <div className="flex justify-content-between align-items-center">
          <h1 className="text-xl font-semibold mb-3 flex-1">Dashboard SIAKAD SMA</h1>
          <span className="text-sm font-bold text-700">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="col-12">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          {/* Statistik & Ringkasan */}
          <TabPanel header="Statistik & Ringkasan">
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
                        <Tag value="Live" severity="info" className="ml-2"/>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}

              <div className="col-12 md:col-6">
                <Card>
                  <div className="flex justify-content-between mb-3">
                    <span className="font-medium text-lg text-900">Tren Siswa & Guru</span>
                    <Tag value="Live" severity="info" />
                  </div>
                  <Chart type="line" data={lineChartData} options={lineChartOptions} className="w-full" />
                </Card>
              </div>

              <div className="col-12 md:col-6">
                <Card>
                  <div className="flex justify-content-between mb-3">
                    <span className="font-medium text-lg text-900">Statistik Sekolah</span>
                    <Tag value="Live" severity="info" />
                  </div>
                  <Chart type="bar" data={barChartData} options={barChartOptions} className="w-full" />
                </Card>
              </div>
            </div>
          </TabPanel>

          {/* Data Terkini */}
          <TabPanel header="Data Terkini">
            <div className="grid">
              {data?.siswa && (
                <div className="col-12">
                  <Card>
                    <div className="flex justify-content-between mb-3">
                      <span className="font-medium text-lg text-900">Data Siswa Terbaru</span>
                      <Tag value="Live" severity="info" />
                    </div>
                    <DataTable value={data.siswa} paginator rows={5} responsiveLayout="scroll">
                      {Object.keys(data.siswa[0] || {}).map((field, idx) => (
                        <Column key={idx} field={field} header={field.toUpperCase()} sortable />
                      ))}
                    </DataTable>
                  </Card>
                </div>
              )}

              {data?.guru && (
                <div className="col-12">
                  <Card>
                    <div className="flex justify-content-between mb-3">
                      <span className="font-medium text-lg text-900">Data Guru Terbaru</span>
                      <Tag value="Live" severity="info" />
                    </div>
                    <DataTable value={data.guru} paginator rows={5} responsiveLayout="scroll">
                      {Object.keys(data.guru[0] || {}).map((field, idx) => (
                        <Column key={idx} field={field} header={field.toUpperCase()} sortable />
                      ))}
                    </DataTable>
                  </Card>
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Dashboard;
