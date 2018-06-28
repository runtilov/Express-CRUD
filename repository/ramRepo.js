class RamRepo {
  constructor() {
    this._data = [];
    this._nextID = 0;
    console.log('RAM INITIALIZED');
  }

  async add(task) {
    console.log(`Adding: ${task}`);
    return this._data.push({
      id: this._getNextID(),
      task,
    });
  }

  async list() {
    console.log('Listing...');
    return this._data;
  }

  async remove(taskID) {
    console.log(`Removing id: ${taskID}`);
    const index = this._data.find(elem => (elem.id === taskID));
    if (index !== -1) this._data.slice(index, 1);
    else throw new Error(`Task with id: ${taskID} doesn't exist`);
  }

  _getNextID() {
    const id = this._nextID;
    this._nextID += 1;
    return id;
  }
}

module.exports = RamRepo;
