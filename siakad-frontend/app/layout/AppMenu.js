'use client';

import React, { useContext, useState, useEffect } from "react";
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

  // Role Master Data
  if (userRole === "Master Data") {
    model = [
      {
        label: "Dashboard",
        items: [
          { label: "Dashboard Master Data", icon: "pi pi-fw pi-chart-bar", to: "/dashboard" },
        ],
      },
      {
        label: "Master",
        icon: "pi pi-fw pi-cog",
        items: [
          {label: "Master/Siswa", icon: "pi pi-fw pi-users", to: "/master/siswa", },
        ],
      },
      {
        label: "Informasi Sekolah",
        icon: "pi pi-fw pi-school",
        items: [
          { label: "Informasi Sekolah", icon: "pi pi-fw pi-info-circle", to: "/informasi-sekolah" },
        ],
      },
      {
        label: "Pengelolaan Aset",
        icon: "pi pi-fw pi-box",
        items: [
          { label: "Aset yang Dikelola", icon: "pi pi-fw pi-cogs", to: "/aset" },
        ],
      },
      {
        label: "Laporan",
        icon: "pi pi-fw pi-chart-bar",
        items: [
          { label: "Laporan Akademik", icon: "pi pi-fw pi-file", to: "/laporan" },
        ],
      },
    ];
  }

  // Role Siswa
  if (userRole === "Siswa") {
    model = [
      {
        label: "Dashboard",
        items: [
          { label: "Dashboard Siswa", icon: "pi pi-fw pi-chart-bar", to: "/dashboard" },
        ],
      },
      {
        label: "Informasi Sekolah",
        icon: "pi pi-fw pi-school",
        items: [
          { label: "Informasi Sekolah", icon: "pi pi-fw pi-info-circle", to: "/informasi-sekolah" },
        ],
      },
      {
        label: "Profil Siswa",
        icon: "pi pi-fw pi-user",
        items: [
          { label: "Profil Saya", icon: "pi pi-fw pi-id-card", to: "/profil-siswa" },
        ],
      },
      {
        label: "Penilaian",
        icon: "pi pi-fw pi-book",
        items: [
          { label: "Nilai & Penilaian", icon: "pi pi-fw pi-chart-line", to: "/penilaian" },
        ],
      },
      {
        label: "Kehadiran",
        icon: "pi pi-fw pi-calendar-check",
        items: [
          { label: "Rekapan Kehadiran", icon: "pi pi-fw pi-calendar-times", to: "/kehadiran" },
        ],
      },
      {
        label: "Komunikasi",
        icon: "pi pi-fw pi-comment",
        items: [
          { label: "Pesan Guru", icon: "pi pi-fw pi-envelope", to: "/komunikasi/guru" },
          { label: "Pesan Antar Siswa", icon: "pi pi-fw pi-comments", to: "/komunikasi/siswa" },
        ],
      },
      {
        label: "Perencanaan Belajar",
        icon: "pi pi-fw pi-calendar",
        items: [
          { label: "Jadwal Kelas", icon: "pi pi-fw pi-calendar-alt", to: "/jadwal" },
          { label: "Tugas & Ujian", icon: "pi pi-fw pi-pencil", to: "/tugas" },
        ],
      },
      {
        label: "Evaluasi Diri",
        icon: "pi pi-fw pi-chart-pie",
        items: [
          { label: "Evaluasi Diri", icon: "pi pi-fw pi-thumbs-up", to: "/evaluasi-diri" },
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
