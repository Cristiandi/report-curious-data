const express = require('express');
const tagsRoutes = require('./tags');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send(new Date());
});

router.use('/tags', tagsRoutes);

module.exports = router;
