'use client';

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useState, useEffect } from "react";

export default function FormDialogAbsen({
  visible,
  onHide,
  onSubmit,
  formData,
  setFormData,
  isGuru = false, // kalau true → form absensi guru
  siswaOptions = [],
}) {
  const statusOptions = [
    { label: "Hadir", value: "Hadir" },
    { label: "Izin", value: "Izin" },
    { label: "Sakit", value: "Sakit" },
    { label: "Alpa", value: "Alpa" },
  ];

  const footer = (
    <div className="flex justify-end gap-2">
      <Button label="Batal" icon="pi pi-times" severity="secondary" onClick={onHide} />
      <Button label="Simpan" icon="pi pi-check" severity="success" onClick={onSubmit} />
    </div>
  );

  return (
    <Dialog
      header={isGuru ? "Absen Guru" : "Absen Siswa"}
      visible={visible}
      style={{ width: "400px" }}
      modal
      onHide={onHide}
      footer={footer}
    >
      <div className="flex flex-col gap-4">
        {/* Pilih siswa hanya jika absen siswa */}
        {!isGuru && (
          <Dropdown
            value={formData.NIS}
            options={siswaOptions}
            onChange={(e) => setFormData({ ...formData, NIS: e.value })}
            placeholder="Pilih Siswa"
            className="w-full"
          />
        )}

        {/* Tanggal */}
        <Calendar
          value={formData.TANGGAL ? new Date(formData.TANGGAL) : null}
          onChange={(e) => setFormData({ ...formData, TANGGAL: e.value })}
          showIcon
          placeholder="Pilih Tanggal"
          className="w-full"
        />

        {/* Status Kehadiran */}
        <Dropdown
          value={formData.STATUS}
          options={statusOptions}
          onChange={(e) => setFormData({ ...formData, STATUS: e.value })}
          placeholder="Pilih Status"
          className="w-full"
        />

        {/* Catatan opsional */}
        <InputText
          value={formData.KETERANGAN || ""}
          onChange={(e) => setFormData({ ...formData, KETERANGAN: e.target.value })}
          placeholder="Keterangan (opsional)"
          className="w-full"
        />
      </div>
    </Dialog>
  );
}
