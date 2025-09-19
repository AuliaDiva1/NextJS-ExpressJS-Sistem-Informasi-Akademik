/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('dashboard', (table) => {
    table.bigIncrements('id').primary(); // ID unik untuk setiap entri statistik
    table.integer('total_siswa').defaultTo(0); // Jumlah total siswa
    table.integer('total_guru').defaultTo(0); // Jumlah total guru
    table.integer('total_kelas').defaultTo(0); // Jumlah total kelas
    table.integer('total_mapel').defaultTo(0); // Jumlah total mata pelajaran
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Waktu pembuatan
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Waktu pembaruan statistik
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('dashboard');
};
