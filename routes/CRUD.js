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
