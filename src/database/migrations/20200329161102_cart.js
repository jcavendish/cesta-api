exports.up = function (knex) {
  return knex.schema.createTable('cart', function (table) {
    table.increments();

    table.decimal('total').notNullable();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');

    table.integer('store_id').notNullable();
    table.foreign('store_id').references('id').inTable('store');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart');
};
