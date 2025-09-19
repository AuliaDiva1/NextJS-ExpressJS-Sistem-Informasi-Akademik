/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_kelas', (table) => {
    table.bigIncrements('KELAS_ID').primary();
    table.string('KODE_KELAS', 20).unique();
    table.enu('TINGKAT', ['10', '11', '12']).notNullable();
    table.string('JURUSAN', 50).notNullable();
    table.string('NAMA_KELAS', 120).notNullable();
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Aktif');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_kelas');
};
