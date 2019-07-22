
const seed = async (knex) => {
  const tags = [
    {
      id: 1,
      name: 'ciencia'
    },
    {
      id: 2,
      name: 'tecnología'
    },
    {
      id: 3,
      name: 'cosmología'
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
