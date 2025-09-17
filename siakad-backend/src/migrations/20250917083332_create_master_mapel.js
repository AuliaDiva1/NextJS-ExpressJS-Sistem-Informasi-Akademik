export function up(knex) {
  return knex.schema.createTable('master_mata_pelajaran', (table) => {
    table.increments('MAPEL_ID').primary();                  // Primary key auto increment
    table.string('KODE_MAPEL', 50).notNullable().unique();  // Kode mata pelajaran unik
    table.string('NAMA_MAPEL', 100).notNullable();          // Nama mata pelajaran
    table.text('DESKRIPSI');                                 // Deskripsi mata pelajaran
    table.string('KATEGORI', 50).notNullable();             // Misal: Umum, Wajib, Pilihan
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Aktif'); // Status
    table.timestamps(true, true);                            // created_at & updated_at
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('master_mata_pelajaran');
}
