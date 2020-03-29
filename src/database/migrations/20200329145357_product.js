exports.up = function(knex) {
  return knex.schema.createTable('product', function(table) {
    table.increments();

    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('measure').notNullable();
    table.decimal('value').notNullable();

    table.integer('store_id').notNullable();
    table
      .foreign('store_id')
      .references('id')
      .inTable('store');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product');
};
