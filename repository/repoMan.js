const SQLRepo = require('../repository/sqlRepo');
const RAMRepo = require('../repository/ramRepo');
const MongoRepo = require('../repository/mongoRepo');

module.exports = async (name) => {
    if (name === 'sql') {
        const t = sqlRepo();
        return t;
    } else if (name === 'mongo') {
        const t = mongoRepo();
        return t;
    } else if (name === 'ram') {
        const t = ramRepo();
        return t;
    } else throw new Error('DB Class not found');
};

async function sqlRepo() {
    const Sequelize = require('sequelize');
        const sequelize = new Sequelize('taskDb', 'root', 'parola', {
            host: '192.168.99.100',
            dialect: 'mysql' || 'sqlite' || 'postgres' || 'mssql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });
        const Task = sequelize.define('tasks', {
            task: {
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.DATE,
            },
        },
            {
                freezeTableName: true,
            });
        await Task.sync();

        return new SQLRepo(Task);
}

async function mongoRepo() {
    const mongoose = require('mongoose');
        mongoose.connect('mongodb://192.168.99.100/bla');

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));

        await new Promise((resolve) => {
            db.once('open', () => {
                resolve();
            });
        });

        const schema = mongoose.Schema({
            task: String,
            date: { type: Date, default: Date.now },
        });
        const model = mongoose.model('Task', schema);

        return new MongoRepo(model);
}

function ramRepo() {
    return new RAMRepo([]);
}
