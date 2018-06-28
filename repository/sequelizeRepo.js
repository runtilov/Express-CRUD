const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql',

/*   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }, */
  
});

const ToDo = sequelize.define('task', {
  task: Sequelize.STRING,
  date: Sequelize.DATE,
})
