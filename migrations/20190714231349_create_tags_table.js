
const up = knex => {
  return knex.schema.createTable('tags', table => {
    table.increments('id');
    table.string('name', 100);
    table.timestamps(true, true);

    table.unique('name');
  });
};

const down = knex => {
  return knex.schema.dropTable('tags');
};

module.exports = {
  up,
  down
};
