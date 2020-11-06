const express = require('express');
const app = express();
const handlebars = require('express-handlebars');


//handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//pastas
app.use('/assets', express.static('assets'));
app.use('/response-chat', express.static('response-chat'));
app.use('/text_search_content', express.static('text_search_content'));

//Rotas
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

app.listen(3000, () => {
  console.log('servidor rodando 3000')
});