const express = require('express');

const router = express.Router();

const Repo = require('../repository/dbRepo'); // comenteaza asta si decomenteaza urmatoarea pentru RAM
// const Repo = require('../repository/ramRepo');

const todoRepository = new Repo();

router.route('/').get(list);

router.route('/delete').get(remove);

router.route('/add').get(add);

async function add(req, res) {
  const result = await todoRepository.add(req.query.task);
  res.json(result);
}

async function list(req, res) {
  const result = await todoRepository.list();
  res.json(result);
}

async function remove(req, res) {
  const result = await todoRepository.remove(req.query.taskID);
  res.json(result);
}

module.exports = router;
