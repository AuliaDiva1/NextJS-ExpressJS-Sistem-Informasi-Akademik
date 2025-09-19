/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable("mapel", (table) => {
    table.bigIncrements("MAPEL_ID").primary();
    table.string("KODE_MAPEL", 20).unique().notNullable();
    table.string("NAMA_MAPEL", 100).notNullable();
    table.string("KATEGORI", 50).nullable();
    table.enu("STATUS", ["aktif", "nonaktif"]).defaultTo("aktif");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists("mapel");
};
