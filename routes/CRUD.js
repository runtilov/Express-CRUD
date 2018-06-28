const express = require('express');

const router = express.Router();

const connection = require('mysql').createConnection({
  host: '192.168.99.100',
  user: 'root',
  password: 'parola',
  database: 'taskDb',
});

async function init() {
  await new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) return reject(err);
      return resolve(err);
    });
  });
}

init();

const MYSQLRepo = require('../repository/mysqlRepo');
// const RAMRepo = require('../repository/ramRepo');

const todoRepository = new MYSQLRepo(connection);

router.route('/').get(list);

router.route('/').delete(remove);

router.route('/').post(add);

async function add(req, res) {
  const result = await todoRepository.add(req.body.task);
  res.json(result);
}

async function list(req, res) {
  const result = await todoRepository.list();
  res.json(result);
}

async function remove(req, res) {
  const result = await todoRepository.remove(req.body.id);
  res.json(result);
}

module.exports = router;
