class DBRepo {
  constructor(connection) {
    this._conn = connection;
  }

  async add(task) {
    if (task === undefined) return undefined;
    console.log(`Adding: ${task}`);

    return this._query(`INSERT INTO tasks (taskName, date) VALUES ("${task}", DATE(NOW()))`);
  }

  async list() {
    console.log('Listing');

    return this._query('SELECT * FROM tasks');
  }

  async remove(taskID) {
    if (taskID === undefined) return undefined;
    console.log(`Deleting: ${taskID}`);

    return this._query(`DELETE FROM  tasks WHERE id = ${taskID}`);
  }

  async _query(sqlQuery) {
    return new Promise((resolve, reject) => {
      this._conn.query(sqlQuery, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
}

module.exports = DBRepo;
