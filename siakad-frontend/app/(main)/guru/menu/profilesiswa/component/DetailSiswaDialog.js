export default function DetailSiswaDialog({ siswa }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Data siswa di kiri */}
      <div className="col-span-2 space-y-2">
        <p><strong>Nama:</strong> {siswa.nama}</p>
        <p><strong>NISN:</strong> {siswa.nisn}</p>
        <p><strong>NIS:</strong> {siswa.nis}</p>
        <p><strong>Kelas:</strong> {siswa.kelas}</p>
        <p><strong>Rombel:</strong> {siswa.rombel}</p>
        <p><strong>Jenis Kelamin:</strong> {siswa.gender === "L" ? "Laki-laki" : "Perempuan"}</p>
        <p><strong>Tempat/Tanggal Lahir:</strong> {siswa.ttl}</p>
        <p><strong>Alamat:</strong> {siswa.alamat}</p>
      </div>

      {/* Foto siswa di kanan */}
      <div className="col-span-1 flex justify-center">
        <img
          src={siswa.foto}
          alt={siswa.nama}
          className="w-40 h-52 object-cover rounded-md shadow-md"
        />
      </div>
    </div>
  );
}
