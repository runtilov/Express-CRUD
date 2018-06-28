class RamRepo {
    constructor(storage) {
        this._data = storage;
        this._nextID = 0;
        console.log('RAM INITIALIZED');
    }

    async add(task) {
        if (task === undefined) return undefined;
        console.log(`Adding: ${task}`);

        return this._data.push({ id: this._getNextID(), task });
    }

    async list() {
        console.log('Listing...');
        return this._data;
    }

    async remove(taskID) {
        if (taskID === undefined) return { err: 'TaskID not found' };
        console.log(`Removing id: ${taskID}`);
        const index = this._data.findIndex(elem => (elem.id == taskID));
        if (index === -1) throw new Error(`Task with id: ${taskID} doesn't exist`);

        return this._data.splice(index, 1);
    }

    _getNextID() {
        const id = this._nextID;
        this._nextID += 1;

        return id;
    }
}

module.exports = RamRepo;
