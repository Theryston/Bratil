const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/response-chat', express.static('response-chat'));
app.use('/text_search_content', express.static('text_search_content'));


app.get('/', function(req, res) {
  res.render('ia');
});

app.get('/termos', function(req, res) {
  res.render('termos');
});

app.get('/search', function(req, res) {
  res.render('search');
});

app.get('*', function(req, res) {
  res.render('no-rota')
})

app.listen(3000, function () {
  console.log('porta 3000!')
});