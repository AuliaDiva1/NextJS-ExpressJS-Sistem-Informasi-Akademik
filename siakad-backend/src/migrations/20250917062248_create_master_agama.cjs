// src/migrations/20250917090100_create_agama_table.js

export async function up(knex) {
  await knex.schema.createTable("agama", (table) => {
    table.increments("IDAGAMA").primary(); // Primary Key, Auto Increment
    table.string('NAMAAGAMA', 50).notNullable(); // hapus .unique() 
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("agama");
}
