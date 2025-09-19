/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_mata_pelajaran', (table) => {
    table.increments('MAPEL_ID').primary();                 
    table.string('KODE_MAPEL', 50).notNullable().unique();  
    table.string('NAMA_MAPEL', 100).notNullable();         
    table.text('DESKRIPSI');                                
    table.string('KATEGORI', 50).notNullable();            
    table.enu('STATUS', ['Aktif', 'Tidak Aktif']).defaultTo('Aktif'); 
    table.timestamps(true, true);                            
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_mata_pelajaran');
};
