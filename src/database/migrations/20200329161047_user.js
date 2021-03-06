exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments();

    table.string('username').unique().notNullable();
    table.string('password').notNullable();
    table.string('email').unique().notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
