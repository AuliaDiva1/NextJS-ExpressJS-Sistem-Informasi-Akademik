"use client";

import { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import EntryNilai from "./components/EntryNilai";
import LihatNilai from "./components/LihatNilai";

export default function PenilaianPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-5xl font-bold text-gray-800">Penilaian</h2>
        <p className="text-gray-600 text-sm">
          Kelola entry nilai dan lihat rekap nilai siswa.
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="custom-tabview"
        >
          <TabPanel header="Entry Nilai">
            <div className="mt-4">
              <EntryNilai />
            </div>
          </TabPanel>
          <TabPanel header="Lihat Nilai">
            <div className="mt-4">
              <LihatNilai />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}
