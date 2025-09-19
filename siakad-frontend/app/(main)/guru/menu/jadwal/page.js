'use client';

import { useState, useEffect } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import JadwalTable from './component/JadwalTable';

export default function JadwalPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [jadwal, setJadwal] = useState([]);
  const [selectedHari, setSelectedHari] = useState('Senin');

  const dummyJadwal = [
    { id: 1, mapel: 'Matematika', rombel: 'X IPA 1', hari: 'Senin', jam: '07:00 - 08:30' },
    { id: 2, mapel: 'Matematika', rombel: 'X IPA 2', hari: 'Senin', jam: '08:30 - 10:00' },
    { id: 3, mapel: 'Matematika', rombel: 'XI IPA 1', hari: 'Selasa', jam: '07:00 - 08:30' },
    { id: 4, mapel: 'Matematika', rombel: 'XI IPA 2', hari: 'Selasa', jam: '08:30 - 10:00' },
    { id: 5, mapel: 'Matematika', rombel: 'X IPA 1', hari: 'Rabu', jam: '07:00 - 08:30' },
  ];

  useEffect(() => {
    setJadwal(dummyJadwal);
  }, []);

  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  return (
    <div className="p-3 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-5xl font-bold text-gray-800">Jadwal Mengajar</h1>
        <p className="text-gray-600 text-sm">
          Guru bisa melihat jadwal mengajar per hari/minggu. Terintegrasi dengan data Mapel & Rombel.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="custom-tabview"
        >
          <TabPanel header="Per Hari">
            <div className="mt-4">
              <div className="mb-4 flex items-center gap-3">
                <label htmlFor="hari" className="font-semibold text-gray-700">Pilih Hari:</label>
                <select
                  id="hari"
                  value={selectedHari}
                  onChange={(e) => setSelectedHari(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {hariOptions.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <JadwalTable jadwal={jadwal} filterHari={selectedHari} />
            </div>
          </TabPanel>

          <TabPanel header="Per Minggu">
            <div className="mt-4">
              <JadwalTable jadwal={jadwal} />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
