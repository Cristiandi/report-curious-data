
exports.up = function(knex) {
  return knex.schema.createTable('curious-data', table => {
    table.increments('id');
    table.text('data', 'mediumtext');
    table.integer('user_id').unsigned();
    table.timestamps(true, true);

    table.foreign('user_id').references('users.id').onDelete('NO ACTION').onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('curious-data');
};
