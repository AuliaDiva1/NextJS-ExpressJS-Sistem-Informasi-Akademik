/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('master_aset_sekolah', (table) => {
    table.increments('ID').primary();                       
    table.string('NAMA_BARANG', 150).notNullable();       
    table.string('MERK_TYPE', 100);                         
    table.integer('JUMLAH_BARANG').notNullable().defaultTo(1);
    table.string('ASAL_USUL_PEROLEHAN', 100);             
    table.string('PERIODE', 20);                         
    table.text('KETERANGAN');                               
    table.timestamp('CREATED_AT').defaultTo(knex.fn.now()); 
    table.timestamp('UPDATED_AT').defaultTo(knex.fn.now()); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTableIfExists('master_aset_sekolah');
};
