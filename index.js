const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const crudTasks = require('./routes/CRUD');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks/api', crudTasks);

app.use('/', (req, res) => {
  res.send('SERVER IS UP');
});

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});

module.exports = app;
