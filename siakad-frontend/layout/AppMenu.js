"use client";

import { useState, useEffect, useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Cookies from "js-cookie";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const roleFromCookies = Cookies.get("role");
    setUserRole(roleFromCookies);
  }, []);

  if (!userRole) return null;

  let model = [];

  if (userRole === "Super Admin") {
    model = [
      {
        label: "Dashboard",
        items: [
          { label: "Dashboard Utama", icon: "pi pi-fw pi-chart-bar", to: "/" },
        ],
      },
      {
        label: "Master Data",
        items: [
          { label: "Master Agama", icon: "pi pi-fw pi-building-columns", to: "/master/agama" },
          { label: "Master Guru", icon: "pi pi-fw pi-users", to: "/master/guru" },
          { label: "Master Informasi Sekolah", icon: "pi pi-fw pi-home", to: "/master/informasi_sekolah" },
          { label: "Master Kelas", icon: "pi pi-fw pi-table", to: "/master/kelas" },
          { label: "Master Kurikulum", icon: "pi pi-fw pi-book", to: "/master/kurikulum" },
          { label: "Master Siswa", icon: "pi pi-fw pi-users", to: "/master/siswa" },
        ],
      },
      {
        label: "Fitur Siswa",
        items: [
          { label: "Manajemen Siswa", icon: "pi pi-fw pi-users", to: "/siswa/manajemen" },
          { label: "Absensi Siswa", icon: "pi pi-fw pi-calendar", to: "/siswa/absensi" },
          { label: "Rekap Absensi", icon: "pi pi-fw pi-history", to: "/siswa/rekap-absen" },
          { label: "Laporan Nilai", icon: "pi pi-fw pi-file", to: "/siswa/laporan-nilai" },
        ],
      },
      {
        label: "Fitur Guru",
        items: [
          { label: "Manajemen Guru", icon: "pi pi-fw pi-users", to: "/guru/manajemen" },
          { label: "Kalender Guru", icon: "pi pi-fw pi-calendar", to: "/guru/kalender" },
          { label: "Komunikasi Guru", icon: "pi pi-fw pi-comment", to: "/guru/komunikasi" },
          { label: "Pengajaran & Penilaian", icon: "pi pi-fw pi-pencil", to: "/guru/pengajaran" },
        ],
      },
      {
        label: "Fitur KBM",
        items: [
          { label: "Rencana Pembelajaran", icon: "pi pi-fw pi-book", to: "/kbm/rencana" },
          { label: "Pelaksanaan KBM", icon: "pi pi-fw pi-check", to: "/kbm/pelaksanaan" },
          { label: "Evaluasi Pembelajaran", icon: "pi pi-fw pi-chart-bar", to: "/kbm/evaluasi" },
        ],
      },
      {
        label: "Fitur Jadwal",
        items: [
          { label: "Jadwal Kelas", icon: "pi pi-fw pi-table", to: "/jadwal/kelas" },
          { label: "Jadwal Ujian", icon: "pi pi-fw pi-calendar-check", to: "/jadwal/ujian" },
          { label: "Jadwal Guru", icon: "pi pi-fw pi-calendar", to: "/jadwal/guru" },
        ],
      },
      {
        label: "Fitur Penilaian",
        items: [
          { label: "Penilaian Kelas", icon: "pi pi-fw pi-star", to: "/penilaian/kelas" },
          { label: "Penilaian Ujian", icon: "pi pi-fw pi-paperclip", to: "/penilaian/ujian" },
          { label: "Penilaian Praktikum", icon: "pi pi-fw pi-file", to: "/penilaian/praktikum" },
          { label: "Laporan Penilaian", icon: "pi pi-fw pi-chart-line", to: "/penilaian/laporan" },
        ],
      },
      {
        label: "Fitur Evaluasi",
        items: [
          { label: "Evaluasi Pembelajaran", icon: "pi pi-fw pi-chart-pie", to: "/evaluasi/pembelajaran" },
          { label: "Evaluasi Pengajaran", icon: "pi pi-fw pi-chart-line", to: "/evaluasi/pengajaran" },
          { label: "Evaluasi Kinerja", icon: "pi pi-fw pi-chart-bar", to: "/evaluasi/kinerja" },
        ],
      },
    ];
  }

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) =>
          !item.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator" key={`separator-${i}`}></li>
          )
        )}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
