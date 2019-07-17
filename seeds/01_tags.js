
const seed = async (knex) => {
  const tags = [
    {
      id: 1,
      name: 'Ciencia'
    },
    {
      id: 2,
      name: 'Tecnología'
    },
    {
      id: 3,
      name: 'Cosmología'
    }
  ];

  const promises = tags.map(async tag => {
    const rows = await knex('tags').select('id').where('name', tag.name);
    if (rows.length === 0) {
      const id = (await knex('tags').insert(tag))[0];
      return { id };
    }
    return { ...rows[0] };
  });

  await Promise.all(promises);
};

module.exports = {
  seed
};
