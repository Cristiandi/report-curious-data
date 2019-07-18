const express = require('express');
const router = express.Router();

const db = require('../../database');

router.get('/', async (req, res, next) => {
  let data;
  try {
    data = await db.select().table('tags');
  } catch (error) {
    return next(error);
  }

  return res.status(200).send(data);
});

module.exports = router;
