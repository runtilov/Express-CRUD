const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const crudTasks = require('./routes/CRUD');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks/api', crudTasks);

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});

module.exports = app;
