"use client";

import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

// Dummy data absensi
const dummyAbsensi = [
  { tanggal: "2025-09-10", status: "Hadir" },
  { tanggal: "2025-09-11", status: "Izin" },
  { tanggal: "2025-09-12", status: "Hadir" },
  { tanggal: "2025-09-13", status: "Alpa" },
];

// Navbar dengan PrimeReact Menubar
function Navbar() {
  const items = [
    { label: "Dashboard", icon: "pi pi-home" },
    { label: "Nilai", icon: "pi pi-chart-line" },
    { label: "Jadwal", icon: "pi pi-calendar" },
  ];

  const end = (
    <Button
      label="Logout"
      icon="pi pi-sign-out"
      severity="danger"
      text
    />
  );

  return (
    <div className="shadow-2 mb-4">
      <Menubar model={items} end={end} />
    </div>
  );
}

export default function DashboardSiswa() {
  const cards = [
    {
      title: "Total Hadir",
      value: dummyAbsensi.filter((d) => d.status === "Hadir").length,
      color: "#66BB6A",
      icon: "pi pi-check",
    },
    {
      title: "Izin",
      value: dummyAbsensi.filter((d) => d.status === "Izin").length,
      color: "#FFA726",
      icon: "pi pi-info-circle",
    },
    {
      title: "Alpa",
      value: dummyAbsensi.filter((d) => d.status === "Alpa").length,
      color: "#EF5350",
      icon: "pi pi-times",
    },
  ];

  return (
    <div className="min-h-screen surface-50">
      {/* Navbar */}
      <Navbar />

      {/* Isi Dashboard */}
      <div className="p-4">
        {/* Cards */}
        <div className="grid">
          {cards.map((card, i) => (
            <div key={i} className="col-12 md:col-4">
              <Card className="shadow-2 border-round">
                <div className="flex align-items-center justify-content-between">
                  <div>
                    <span className="text-500">{card.title}</span>
                    <div className="text-xl font-bold">{card.value}</div>
                  </div>
                  <i
                    className={`${card.icon} text-3xl`}
                    style={{ color: card.color }}
                  ></i>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Table Absensi */}
        <Card className="shadow-2 border-round mt-4">
          <h2 className="text-lg font-semibold mb-3">Riwayat Absensi</h2>
          <DataTable value={dummyAbsensi} paginator rows={5}>
            <Column field="tanggal" header="Tanggal" />
            <Column
              field="status"
              header="Status"
              body={(row) => (
                <Tag
                  value={row.status}
                  severity={
                    row.status === "Hadir"
                      ? "success"
                      : row.status === "Izin"
                      ? "warning"
                      : "danger"
                  }
                />
              )}
            />
          </DataTable>
        </Card>
      </div>
    </div>
  );
}
