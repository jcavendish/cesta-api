exports.up = function(knex) {
  return knex.schema.createTable('store', function(table) {
    table.increments();

    table.string('name').notNullable();
    table.integer('rate').notNullable();

    table.integer('user_id').notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('user');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('store');
};
