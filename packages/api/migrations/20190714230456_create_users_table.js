
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id');
    table.string('email');
    table.string('phone', 15);
    table.string('authId');
    table.string('name');
    table.date('birthDate');
    table.timestamps(true, true);

    table.unique('email');
    table.unique('phone');
    table.unique('authId');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
