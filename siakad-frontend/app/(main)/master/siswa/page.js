"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import TabelSiswa from "./components/tabelSiswa"; // Pastikan pathnya benar
import FormSiswa from "./components/formDialogSiswa"; // Pastikan pathnya benar
import HeaderBar from "@/app/components/headerbar";
import ToastNotifier from "@/app/components/toastNotifier";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SiswaPage = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const [formData, setFormData] = useState({
    SISWA_ID: 0,
    NIS: "",
    NISN: "",
    NAMA: "",
    GENDER: "",
    TGL_LAHIR: "",
    STATUS: "",
    EMAIL: "",
  });

  const [errors, setErrors] = useState({});
  const toastRef = useRef(null);

  useEffect(() => {
    fetchSiswa();
  }, []);

  const fetchSiswa = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/siswa`);
      setData(res.data);
      setOriginalData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.NIS?.trim()) newErrors.NIS = "NIS wajib diisi";
    if (!formData.NISN?.trim()) newErrors.NISN = "NISN wajib diisi";
    if (!formData.NAMA?.trim()) newErrors.NAMA = "Nama wajib diisi";
    if (!formData.GENDER?.trim()) newErrors.GENDER = "Gender wajib diisi";
    if (!formData.TGL_LAHIR?.trim()) newErrors.TGL_LAHIR = "Tanggal Lahir wajib diisi";
    if (!formData.STATUS?.trim()) newErrors.STATUS = "Status wajib diisi";
    if (!formData.EMAIL?.trim()) newErrors.EMAIL = "Email wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (keyword) => {
    if (!keyword) {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (item) =>
          item.NIS.toLowerCase().includes(keyword.toLowerCase()) ||
          item.NISN.toLowerCase().includes(keyword.toLowerCase()) ||
          item.NAMA.toLowerCase().includes(keyword.toLowerCase())
      );
      setData(filtered);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const isEdit = !!formData.SISWA_ID;
    const url = isEdit
      ? `${API_URL}/siswa/${formData.SISWA_ID}`
      : `${API_URL}/siswa`;

    try {
      if (isEdit) {
        await axios.put(url, formData);
        toastRef.current?.showToast("00", "Data berhasil diperbarui");
      } else {
        await axios.post(url, formData);
        toastRef.current?.showToast("00", "Data berhasil ditambahkan");
      }
      fetchSiswa();
      setDialogVisible(false);
      resetForm();
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      toastRef.current?.showToast("01", "Gagal menyimpan data");
    }
  };

  const handleEdit = (row) => {
    setFormData({ ...row });
    setDialogVisible(true);
  };

  const handleDelete = (row) => {
    confirmDialog({
      message: `Apakah Anda yakin ingin menghapus siswa ${row.NAMA}?`,
      header: "Konfirmasi Hapus",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Ya",
      rejectLabel: "Batal",
      accept: async () => {
        try {
          await axios.delete(`${API_URL}/siswa/${row.SISWA_ID}`);
          fetchSiswa();
          toastRef.current?.showToast("00", "Data berhasil dihapus");
        } catch (err) {
          console.error("Gagal menghapus data:", err);
          toastRef.current?.showToast("01", "Gagal menghapus data");
        }
      },
    });
  };

  const resetForm = () => {
    setFormData({
      SISWA_ID: 0,
      NIS: "",
      NISN: "",
      NAMA: "",
      GENDER: "",
      TGL_LAHIR: "",
      STATUS: "",
      EMAIL: "",
    });
    setErrors({});
  };

  return (
    <div className="card">
      <ToastNotifier ref={toastRef} />
      <ConfirmDialog />

      <h3 className="text-xl font-semibold mb-3">Master Siswa</h3>

      <div className="flex items-center justify-end">
        <HeaderBar
          title=""
          placeholder="Cari Siswa"
          onSearch={handleSearch}
          onAddClick={() => {
            resetForm();
            setDialogVisible(true);
          }}
        />
      </div>

      <TabelSiswa
        data={data}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormSiswa
        visible={dialogVisible}
        onHide={() => {
          setDialogVisible(false);
          resetForm();
        }}
        onChange={setFormData}
        onSubmit={handleSubmit}
        formData={formData}
        errors={errors}
      />
    </div>
  );
};

export default SiswaPage;
