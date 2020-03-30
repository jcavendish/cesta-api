exports.up = function (knex) {
  return knex.schema.createTable('comment', function (table) {
    table.increments();

    table.string('text').notNullable();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');

    table.integer('store_id').notNullable();
    table.foreign('store_id').references('id').inTable('store');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comment');
};
