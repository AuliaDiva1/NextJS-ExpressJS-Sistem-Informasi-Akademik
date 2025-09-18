'use client';

import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import FormDialogAbsen from "./FormDialogAbsen";

export default function AbsenGuru() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    TANGGAL: null,
    STATUS: null,
    KETERANGAN: "",
  });
  const [absenResult, setAbsenResult] = useState(null);
  const toast = useRef(null);

  const handleSubmit = () => {
    if (!formData.TANGGAL || !formData.STATUS) {
      toast.current.show({
        severity: "warn",
        summary: "Gagal",
        detail: "Tanggal dan Status wajib diisi!",
      });
      return;
    }

    // Simulasi simpan data
    setAbsenResult(formData);
    setVisible(false);
    toast.current.show({
      severity: "success",
      summary: "Absen Tercatat",
      detail: `Anda absen: ${formData.STATUS} (${formData.TANGGAL.toLocaleDateString()})`,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <h2 className="text-lg font-semibold mb-3">Absen Kehadiran Guru</h2>

      {absenResult ? (
        <p className="text-green-600 font-medium">
          ✅ Anda sudah absen: {absenResult.STATUS} (
          {absenResult.TANGGAL?.toLocaleDateString()})
        </p>
      ) : (
        <Button
          label="Absen Sekarang"
          icon="pi pi-check"
          onClick={() => setVisible(true)}
        />
      )}

      <FormDialogAbsen
        visible={visible}
        onHide={() => setVisible(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isGuru={true} // bedakan dari siswa
      />
    </div>
  );
}
