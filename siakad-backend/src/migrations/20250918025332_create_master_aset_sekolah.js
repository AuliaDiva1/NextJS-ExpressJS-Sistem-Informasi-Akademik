export const up = function (knex) {
  return knex.schema.createTable('master_aset_sekolah', (table) => {
    table.increments('ID').primary();                       // No (auto-increment)
    table.string('NAMA_BARANG', 150).notNullable();         // Jenis / NamaBarang
    table.string('MERK_TYPE', 100);                         // Merk / Type
    table.integer('JUMLAH_BARANG').notNullable().defaultTo(1); // JumlahBarang
    table.string('ASAL_USUL_PEROLEHAN', 100);               // AsalUsulPerolehan
    table.string('PERIODE', 20);                            // Periode
    table.text('KETERANGAN');                               // Keterangan
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now()); // CreatedAt
    table.timestamp('UPDATED_AT').defaultTo(knex.fn.now()); // UpdatedAt
  });
};

export const down = function (knex) {
  return knex.schema.dropTableIfExists('master_aset_sekolah');
};
