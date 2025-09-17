'use client';

import { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SiswaDashboard = () => {
  const [siswaData, setSiswaData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    try {
      const res = await axios.get(`${API_URL}/siswa`);
      setSiswaData(res.data);
    } catch (err) {
      console.error("Gagal ambil data siswa:", err);
      setSiswaData([]);
    }
  };

  const statusSeverity = (status) => {
    switch (status?.toLowerCase()) {
      case 'aktif':
        return 'success';
      case 'nonaktif':
        return 'danger';
      case 'cuti':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="grid">
      {/* Header + Tanggal */}
      <div className="col-12">
        <div className="card mb-2">
          <div className="flex justify-content-between align-items-center">
            <h1 className="text-xl font-semibold mb-3">Data Siswa</h1>
            <span className="text-sm font-bold text-700">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="grid mb-3">
          <div className="col-12 md:col-6 xl:col-3">
            <Card style={{ borderTop: '4px solid #42A5F5' }}>
              <span className="block text-500 mb-2">Total Siswa</span>
              <span className="text-900 font-bold text-xl">{siswaData.length}</span>
            </Card>
          </div>
          <div className="col-12 md:col-6 xl:col-3">
            <Card style={{ borderTop: '4px solid #66BB6A' }}>
              <span className="block text-500 mb-2">Siswa Aktif</span>
              <span className="text-900 font-bold text-xl">
                {siswaData.filter(s => s.STATUS?.toLowerCase() === 'aktif').length}
              </span>
            </Card>
          </div>
          <div className="col-12 md:col-6 xl:col-3">
            <Card style={{ borderTop: '4px solid #FFCC00' }}>
              <span className="block text-500 mb-2">Siswa Nonaktif</span>
              <span className="text-900 font-bold text-xl">
                {siswaData.filter(s => s.STATUS?.toLowerCase() === 'nonaktif').length}
              </span>
            </Card>
          </div>
          <div className="col-12 md:col-6 xl:col-3">
            <Card style={{ borderTop: '4px solid #EF5350' }}>
              <span className="block text-500 mb-2">Siswa Cuti</span>
              <span className="text-900 font-bold text-xl">
                {siswaData.filter(s => s.STATUS?.toLowerCase() === 'cuti').length}
              </span>
            </Card>
          </div>
        </div>
      </div>

      {/* Tab View */}
      <div className="col-12">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          {/* Tab 1 - Data Tabel */}
          <TabPanel header="Daftar Siswa">
            <Card>
              <div className="flex justify-content-between mb-3">
                <span className="font-medium text-lg text-900">Tabel Siswa</span>
                <Tag value="Live" severity="info" />
              </div>
              <DataTable value={siswaData} paginator rows={10} responsiveLayout="scroll">
                <Column field="NIS" header="NIS" sortable />
                <Column field="NISN" header="NISN" sortable />
                <Column field="NAMA" header="Nama" sortable />
                <Column field="GENDER" header="Jenis Kelamin" sortable />
                <Column
                  field="TGL_LAHIR"
                  header="Tanggal Lahir"
                  sortable
                  body={(rowData) => {
                    const date = new Date(rowData.TGL_LAHIR);
                    return date.toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    });
                  }}
                />
                <Column
                  field="STATUS"
                  header="Status"
                  sortable
                  body={(rowData) => (
                    <Tag value={rowData.STATUS} severity={statusSeverity(rowData.STATUS)} />
                  )}
                />
                <Column field="EMAIL" header="Email" sortable />
              </DataTable>
            </Card>
          </TabPanel>

          {/* Tab 2 - Statistik Detail */}
          <TabPanel header="Statistik (Detail)">
            <div className="grid">
              <div className="col-12">
                <Card>
                  <span className="text-lg font-medium text-900">Belum ada grafik, bisa ditambahkan Chart.js</span>
                </Card>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default SiswaDashboard;
