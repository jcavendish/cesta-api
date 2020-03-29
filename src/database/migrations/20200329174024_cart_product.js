exports.up = function (knex) {
  return knex.schema.createTable('cart_product', function (table) {
    table.increments();

    table.integer('cart_id').notNullable();
    table.foreign('cart_id').references('id').inTable('cart');

    table.integer('product_id').notNullable();
    table.foreign('product_id').references('id').inTable('product');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cart_product');
};
