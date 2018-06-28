class SQLRepo {
    constructor(model) {
        this.Model = model;
    }

    async add(task) {
        if (task === undefined) {
            return {
                err: 'No task recieved',
            };
        }
        console.log(`Adding: ${task}`);

        return this.Model.create({
            task,
        });
    }

    async list() {
        console.log('Listing');

        return this.Model.findAll();
    }

    async remove(taskID) {
        if (taskID === undefined) {
            return {
                err: 'Task id not found',
            };
        }
        console.log(`Deleting: ${taskID}`);

        return this.Model.destroy({
            where: {
                id: taskID,
            },
        });
    }
}

module.exports = SQLRepo;
