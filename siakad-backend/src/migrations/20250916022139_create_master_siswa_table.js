exports.up = function (knex) {
  return knex.schema.createTable('master_siswa', (table) => {
    table.bigIncrements('SISWA_ID').primary();
    table.string('NIS', 20).unique();
    table.string('NISN', 20).unique();
    table.string('NAMA', 120).notNullable();
    table.enu('GENDER', ['L', 'P']).notNullable();
    table.date('TGL_LAHIR');
    table.enu('STATUS', ['Aktif', 'Lulus', 'Nonaktif']).defaultTo('Aktif');
    table.string('EMAIL', 120).unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('master_siswa');
};
