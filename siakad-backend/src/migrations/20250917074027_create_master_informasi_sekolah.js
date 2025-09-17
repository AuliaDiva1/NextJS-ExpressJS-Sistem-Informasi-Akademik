export async function up(knex) {
  return knex.schema.createTable("master_informasi_sekolah", (table) => {
    table.increments("ID_SEKOLAH").primary(); // Primary Key
    table.string("NAMA_SEKOLAH", 150).notNullable();
    table.text("ALAMAT").notNullable();
    table.enu("JENJANG_AKREDITASI", ["A", "B", "C"]).notNullable();
    table.date("TANGGAL_AKREDITASI");
    table.string("NPSN", 20).unique().notNullable();
    table.enu("STATUS", ["Aktif", "Nonaktif"]).defaultTo("Aktif");

    // JUMLAH_SISWA & JUMLAH_GURU sebaiknya dibuat kolom biasa,
    // lalu diisi lewat query (misalnya pakai trigger atau saat select dengan join)
    table.integer("JUMLAH_SISWA").defaultTo(0);
    table.integer("JUMLAH_GURU").defaultTo(0);

    table.timestamps(true, true); // created_at & updated_at
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("master_informasi_sekolah");
}
