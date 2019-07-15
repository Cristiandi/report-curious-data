
exports.up = function(knex) {
  return knex.schema.createTable('curious-data_tags', table => {
    table.increments('id');
    table.integer('curious-data_id').unsigned();
    table.integer('tag_id').unsigned();
    table.timestamps(true, true);

    table.foreign('curious-data_id').references('curious-data.id').onDelete('NO ACTION').onUpdate('NO ACTION');
    table.foreign('tag_id').references('tags.id').onDelete('NO ACTION').onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('curious-data_tags');
};
