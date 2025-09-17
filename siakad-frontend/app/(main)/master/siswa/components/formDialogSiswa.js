"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const FormSiswaStyles = {
  dialog: {
    width: "30vw",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  inputText: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  invalidInput: {
    borderColor: "#f44336",
  },
  errorMessage: {
    color: "#f44336",
    fontSize: "12px",
    marginTop: "4px",
  },
  submitButton: {
    marginTop: "16px",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#007ad9",
    border: "none",
    color: "#fff",
    borderRadius: "4px",
    transition: "all 0.3s ease-in-out",
  },
  submitButtonHover: {
    backgroundColor: "#005bb5",
  },
};

const FormSiswa = ({ visible, formData, onHide, onChange, onSubmit, errors }) => {
  const inputClass = (field) =>
    errors[field]
      ? { ...FormSiswaStyles.inputText, ...FormSiswaStyles.invalidInput }
      : FormSiswaStyles.inputText;

  const genderOptions = [
    { label: "Laki-laki", value: "L" },
    { label: "Perempuan", value: "P" },
  ];

  const statusOptions = [
    { label: "Aktif", value: "Aktif" },
    { label: "Lulus", value: "Lulus" },
    { label: "Nonaktif", value: "Nonaktif" },
  ];

  return (
    <Dialog
      header={formData.SISWA_ID ? "Edit Siswa" : "Tambah Siswa"}
      visible={visible}
      onHide={onHide}
      style={FormSiswaStyles.dialog}
    >
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label style={FormSiswaStyles.formLabel}>NIS</label>
          <InputText
            style={inputClass("NIS")}
            value={formData.NIS}
            onChange={(e) => onChange({ ...formData, NIS: e.target.value })}
          />
          {errors.NIS && <small style={FormSiswaStyles.errorMessage}>{errors.NIS}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>NISN</label>
          <InputText
            style={inputClass("NISN")}
            value={formData.NISN}
            onChange={(e) => onChange({ ...formData, NISN: e.target.value })}
          />
          {errors.NISN && <small style={FormSiswaStyles.errorMessage}>{errors.NISN}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>Nama</label>
          <InputText
            style={inputClass("NAMA")}
            value={formData.NAMA}
            onChange={(e) => onChange({ ...formData, NAMA: e.target.value })}
          />
          {errors.NAMA && <small style={FormSiswaStyles.errorMessage}>{errors.NAMA}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>Gender</label>
          <Dropdown
            value={formData.GENDER}
            options={genderOptions}
            onChange={(e) => onChange({ ...formData, GENDER: e.value })}
            optionLabel="label"
            placeholder="Pilih Gender"
            style={inputClass("GENDER")}
          />
          {errors.GENDER && <small style={FormSiswaStyles.errorMessage}>{errors.GENDER}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>Tanggal Lahir</label>
          <InputText
            style={inputClass("TGL_LAHIR")}
            value={formData.TGL_LAHIR}
            onChange={(e) => onChange({ ...formData, TGL_LAHIR: e.target.value })}
          />
          {errors.TGL_LAHIR && <small style={FormSiswaStyles.errorMessage}>{errors.TGL_LAHIR}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>Status</label>
          <Dropdown
            value={formData.STATUS}
            options={statusOptions}
            onChange={(e) => onChange({ ...formData, STATUS: e.value })}
            optionLabel="label"
            placeholder="Pilih Status"
            style={inputClass("STATUS")}
          />
          {errors.STATUS && <small style={FormSiswaStyles.errorMessage}>{errors.STATUS}</small>}
        </div>

        <div>
          <label style={FormSiswaStyles.formLabel}>Email</label>
          <InputText
            style={inputClass("EMAIL")}
            value={formData.EMAIL}
            onChange={(e) => onChange({ ...formData, EMAIL: e.target.value })}
          />
          {errors.EMAIL && <small style={FormSiswaStyles.errorMessage}>{errors.EMAIL}</small>}
        </div>

        <div className="text-right pt-3">
          <Button
            type="submit"
            label="Simpan"
            icon="pi pi-save"
            style={FormSiswaStyles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = FormSiswaStyles.submitButtonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = FormSiswaStyles.submitButton.backgroundColor)}
          />
        </div>
      </form>
    </Dialog>
  );
};

export default FormSiswa;
