"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const TabelSiswaStyles = {
  datatable: {
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  datatableHeader: {
    backgroundColor: "#007ad9",
    color: "#fff",
    fontWeight: "bold",
  },
  columnHeader: {
    fontSize: "16px",
  },
  columnHeaderContent: {
    color: "#ffffff",
  },
  rowHover: {
    backgroundColor: "#e0f7fa",
  },
  cell: {
    padding: "10px",
  },
  button: {
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    transform: "scale(1.05)",
  },
  buttonWarning: {
    backgroundColor: "#f9a825",
    border: "none",
  },
  buttonWarningHover: {
    backgroundColor: "#f57f17",
  },
  buttonDanger: {
    backgroundColor: "#d32f2f",
    border: "none",
  },
  buttonDangerHover: {
    backgroundColor: "#c62828",
  },
  responsive: {
    "@media (max-width: 768px)": {
      fontSize: "14px",
    },
  },
};

const TabelSiswa = ({ data, loading, onEdit, onDelete }) => {
  return (
    <DataTable value={data} paginator rows={10} loading={loading} size="small" scrollable style={TabelSiswaStyles.datatable}>
      <Column field="SISWA_ID" header="ID Siswa" />
      <Column field="NIS" header="NIS" />
      <Column field="NISN" header="NISN" />
      <Column field="NAMA" header="Nama" />
      <Column field="GENDER" header="Gender" />
      <Column field="TGL_LAHIR" header="Tanggal Lahir" />
      <Column field="STATUS" header="Status" />
      <Column field="EMAIL" header="Email" />
      <Column
        header="Aksi"
        body={(row) => (
          <div className="flex gap-2">
            <Button
              icon="pi pi-pencil"
              size="small"
              severity="warning"
              style={TabelSiswaStyles.buttonWarning}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelSiswaStyles.buttonWarningHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelSiswaStyles.buttonWarning.backgroundColor)}
              onClick={() => onEdit(row)}
            />
            <Button
              icon="pi pi-trash"
              size="small"
              severity="danger"
              style={TabelSiswaStyles.buttonDanger}
              onMouseEnter={(e) => (e.target.style.backgroundColor = TabelSiswaStyles.buttonDangerHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = TabelSiswaStyles.buttonDanger.backgroundColor)}
              onClick={() => onDelete(row)}
            />
          </div>
        )}
        style={{ width: "150px" }}
      />
    </DataTable>
  );
};

export default TabelSiswa;
