const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const database = './database/index.js';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/home', function(req, res) {
  res.end('Hello from the home page!');
});

app.get('/login', function(req, res) {
  res.end('Hello world from the PantryPatron login page!')
});

app.get('/register', function (req, res) {
  res.end('Hello from the register page!');
});

app.get('/logout', function(req, res) {
  res.end('Hello from the logout page!');
});

app.get('/list', function(req, res) {
  res.end('Hello from the lists page!');
});

const port = 3000;

app.listen(process.env.port || port, function() {
  console.log(`Listening on port ${port}`);
});


