/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_kurikulum', (table) => {
    table.bigIncrements('KURIKULUM_ID').primary();
    table.string('NAMA_KURIKULUM', 100).notNullable();
    table.integer('TAHUN').notNullable();
    table.text('DESKRIPSI');
    table.enu('STATUS', ['Aktif', 'Nonaktif']).defaultTo('Aktif');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_kurikulum');
};
