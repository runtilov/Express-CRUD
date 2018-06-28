<<<<<<< HEAD
const router = require('express').Router();

module.exports = router;

async function main() {
    const todoRepository = await require('../repository/repoMan')('ram');

    router.route('/').get(list);

    router.route('/:id').delete(remove);

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
        const result = await todoRepository.remove(req.params.id);
        res.json(result);
    }
}

main();
=======
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100/bla');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

async function init() {
    await new Promise((resolve) => {
        db.once('open', () => {
            resolve();
          });
    });
}

init();

// const MYSQLRepo = require('../repository/mysqlRepo');
// const RAMRepo = require('../repository/ramRepo');
const MongoRepo = require('../repository/mongoRepo');

const todoRepository = new MongoRepo(db, mongoose);

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
>>>>>>> 0f78c6deee8ec10be79165ce6701a626ac8e837a
