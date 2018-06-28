class DBRepo {
  constructor() {
    this._conn = require('mysql').createConnection({
      host: '192.168.99.100',
      user: 'root',
      password: 'parola',
      database: 'taskDb',
    });
    this._init().then(() => {
      console.log('DB INITIALIZED');
    });
  }

  async add(task) {
    console.log(`Adding: ${task}`);
    return this._query(`INSERT INTO tasks (taskName, date) VALUES ("${task}", DATE(NOW()))`);
  }

  async list() {
    console.log('Listing');
    return this._query('SELECT * FROM tasks');
  }

  async remove(taskID) {
    console.log(`Deleting: ${taskID}`);
    return this._query(`DELETE FROM  tasks WHERE id = ${taskID}`);
  }

  async _init() {
    try {
      await this._connect();
      await this._query('CREATE TABLE IF NOT EXISTS tasks(id int AUTO_INCREMENT, taskName VARCHAR(255), date DATE, PRIMARY KEY(id))');
    } catch (err) {
      throw err;
    }
  }

  async _connect() {
    return new Promise((resolve, reject) => {
      this._conn.connect((err) => {
        if (err) return reject(err);
        return resolve(true);
      });
    });
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
