export async function up(knex) {
  return knex.schema.createTable("mapel", (table) => {
    table.bigIncrements("MAPEL_ID").primary();
    table.string("KODE_MAPEL", 20).unique().notNullable();
    table.string("NAMA_MAPEL", 100).notNullable();
    table.string("KATEGORI", 50).nullable();
    table.enu("STATUS", ["aktif", "nonaktif"]).defaultTo("aktif");
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists("mapel");
}
