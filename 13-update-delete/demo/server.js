'use strict'

// Application Dependencies
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({extended: true}));

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))

// Database Setup
const client = new pg.Client('postgres://localhost:5432/task_app');
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getTasks);

app.get('/tasks/:task_id', getOneTask);

app.get('/add', showForm);

app.post('/add', addTask);

app.put('/update/:task_id', updateTask);

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// HELPER FUNCTIONS

function getTasks(request, response) {
  let SQL = 'SELECT * from tasks;';

  return client.query(SQL)
    .then(results => response.render('index', {results: results.rows}))
    .catch(handleError);
}

function getOneTask(request, response) {
  let SQL = 'SELECT * FROM tasks WHERE id=$1;';
  let values = [request.params.task_id];

  return client.query(SQL, values)
    .then(result => response.render('pages/detail-view', {task: result.rows[0]}))
    .catch(handleError);
}

function showForm(request, response) {
  response.render('pages/add-view');
}

function addTask(request, response) {
  let {title, description, category, contact, status, due} = request.body;

  let SQL = 'INSERT INTO tasks(title, description, category, contact, status, due) VALUES ($1, $2, $3, $4, $5, $6);';
  let values = [title, description, category, contact, status, due];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

function updateTask(request, response) {
  // destructure variables
  let {title, description, category, contact, status, due} = request.body;
  // need SQL to update the specific task that we were on
  let SQL = `UPDATE tasks SET title=$1, description=$2, category=$3, contact=$4, status=$5, due=$6 WHERE id=$7;`;
  // use request.params.task_id === whatever task we were on
  let values = [title, description, category, contact, status, due, request.params.task_id];

  client.query(SQL, values)
    .then(response.redirect(`/tasks/${request.params.task_id}`))
    .catch(err => handleError(err, response));
}

function handleError(error, response) {
  response.render('pages/error-view', {error: 'Uh Oh'});
}
