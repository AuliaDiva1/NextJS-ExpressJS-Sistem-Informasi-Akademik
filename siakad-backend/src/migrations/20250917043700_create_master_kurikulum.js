export async function up(knex) {
  await knex.schema.createTable('master_kurikulum', (table) => {
    table.bigIncrements('KURIKULUM_ID').primary();
    table.string('NAMA_KURIKULUM', 100).notNullable(); 
    table.integer('TAHUN').notNullable();              
    table.text('DESKRIPSI');                           
    table.enu('STATUS', ['Aktif', 'Nonaktif']).defaultTo('Aktif');
    table.timestamps(true, true);                     
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('master_kurikulum');
}
