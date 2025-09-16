"use client";

import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const dummySuperadmins = [
  { nama: "Admin 1", email: "admin1@example.com", role: "superadmin", status: "aktif" },
  { nama: "Admin 2", email: "admin2@example.com", role: "superadmin", status: "nonaktif" },
];

export default function Dashboard() {
  const cards = [
    { title: "Total Superadmin", value: dummySuperadmins.length, color: "#42A5F5", icon: "pi pi-users" },
    { title: "Aktif", value: dummySuperadmins.filter(d => d.status === "aktif").length, color: "#66BB6A", icon: "pi pi-check" },
    { title: "Nonaktif", value: dummySuperadmins.filter(d => d.status !== "aktif").length, color: "#EF5350", icon: "pi pi-times" },
  ];

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button label="Edit" icon="pi pi-pencil" className="p-button-sm p-button-warning" />
      <Button label="Hapus" icon="pi pi-trash" className="p-button-sm p-button-danger" />
    </div>
  );

  return (
    <div className="grid">
      {cards.map((card, i) => (
        <div className="col-12 md:col-4" key={i}>
          <Card style={{ borderTop: `4px solid ${card.color}` }}>
            <div className="flex justify-content-between align-items-center">
              <div>
                <span>{card.title}</span>
                <div className="text-xl font-bold">{card.value}</div>
              </div>
              <div className="text-3xl">
                <i className={card.icon}></i>
              </div>
            </div>
          </Card>
        </div>
      ))}

      <div className="col-12 mt-3">
        <Card>
          <DataTable value={dummySuperadmins} paginator rows={5}>
            <Column field="nama" header="Nama" />
            <Column field="email" header="Email" />
            <Column field="role" header="Role" />
            <Column field="status" header="Status" body={row => (
              <Tag value={row.status === "aktif" ? "Aktif" : "Nonaktif"} severity={row.status === "aktif" ? "success" : "danger"} />
            )} />
            <Column header="Aksi" body={actionBodyTemplate} />
          </DataTable>
        </Card>
      </div>
    </div>
  );
}
