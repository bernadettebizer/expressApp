'use strict';

const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const oauth = require('./scripts/oauth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/about', (req, res) => res.render('pages/about', { title: 'About', message: 'Select a book to view the first page!' }));
app.get('/lotr', (req, res) => res.render('partials/lotr'));
app.get('/hpatss', (req, res) => res.render('partials/hpatss'));
app.get('/', (req, res) => {
  const message = 'hello, friend!';
  const title = 'Hey!';
  res.render('pages/index', { title, message });
});
app.get('/content', (req, res) => res.render('viewScripts/content'));
app.post('/', (req, res) => {
  const auth = oauth.checkSignature(req.body);
  res.render('pages/index', { title: auth.title, message: auth.message });
});

app.listen(port);
