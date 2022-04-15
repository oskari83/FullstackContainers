const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const { getAsync } = require("../redis");

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  const ct = (await getAsync("visits")) || 0
  res.send({
    added_todos: ct
  });
});

module.exports = router;
