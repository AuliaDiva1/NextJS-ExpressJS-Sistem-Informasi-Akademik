"use client";

import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function Navbar() {
  const items = [
    { label: "Dashboard", icon: "pi pi-home" },
    { label: "Mata Pelajaran", icon: "pi pi-book" },
    { label: "Nilai", icon: "pi pi-chart-line" },
    { label: "Absensi", icon: "pi pi-calendar" },
  ];

  const end = (
    <div className="flex align-items-center gap-2">
      <Button icon="pi pi-user" label="Profil" text />
      <Button icon="pi pi-sign-out" label="Logout" severity="danger" text />
    </div>
  );

  return (
    <div className="card shadow-2">
      <Menubar model={items} end={end} />
    </div>
  );
}
