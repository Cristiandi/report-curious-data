const express = require('express');
const router = express.Router();
const stringSimilarity = require('string-similarity');

const db = require('../../database');
const functions = require('../../utils/functions');

router.get('/', async (req, res, next) => {
  let data;
  try {
    data = await db.select().table('tags');
  } catch (error) {
    return next(error);
  }

  return res.status(200).send(data);
});

router.post('/', async (req, res, next) => {
  const { body } = req;
  const missingKeys = functions.getMissingKeys(['name'], body);
  if (missingKeys.length > 0) {
    return next(functions.returnError(`${missingKeys.toString()} is missing.`, 422));
  }
  let { name } = body;

  // eslint-disable-next-line no-useless-escape
  name = name.toLowerCase().replace(/[~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

  let similar;
  try {
    similar = await db.select('id', 'name').table('tags').where('name', 'like', `%${name}%`).limit(1);
  } catch (error) {
    return next(error);
  }

  if (similar.length > 0) {
    similar = similar[0];
    const similarity = stringSimilarity.compareTwoStrings(name, similar.name);
    if (similarity > 0.95) {
      const error = functions.returnError(`this may already exists.`, 412);
      return next(error);
    }
  }

  let id;
  try {
    id = (await db.table('tags').insert({ name: name }))[0];
  } catch (error) {
    return next(error);
  }

  let data;
  try {
    data = (await db.select().table('tags').where({ id }))[0];
  } catch (error) {
    return next(error);
  }

  return res.status(200).send(data);
});

module.exports = router;
