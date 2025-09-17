export function up(knex) {
  return knex.schema.createTable('master_guru', (table) => {
    table.bigIncrements('GURU_ID').primary();
    table.string('NIP', 30).unique().notNullable();
    table.string('NAMA', 120).notNullable();
    table.string('GELAR', 50).nullable();
    table.string('PANGKAT', 50).nullable();
    table.string('JABATAN', 100).nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('master_guru');
}
