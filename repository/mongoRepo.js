class MongoRepo {
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
        const obj = new this.Model({
            task,
        });
        const result = await obj.save();

        return {
            id: result._id,
        };
    }

    async list() {
        console.log('Listing');
        const result = await this.Model.find().exec();

        return result;
    }

    async remove(taskID) {
        if (taskID === undefined) {
            return {
                err: 'TaskID not found',
            };
        }
        console.log(`Removing: ${taskID}`);
        const result = await this.Model.remove({
            _id: taskID,
        });

        return result;
    }
}

module.exports = MongoRepo;
