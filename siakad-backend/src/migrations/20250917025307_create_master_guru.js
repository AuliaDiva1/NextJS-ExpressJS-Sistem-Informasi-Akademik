/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_guru', (table) => {
    table.bigIncrements('GURU_ID').primary();
    table.string('NIP', 30).unique().notNullable();
    table.string('NAMA', 120).notNullable();
    table.string('GELAR', 50).nullable();
    table.string('PANGKAT', 50).nullable();
    table.string('JABATAN', 100).nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_guru');
};
