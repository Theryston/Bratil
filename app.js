const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path")


//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//pastas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'text_search_content')))


//Rotas
app.get('/', function(req, res) {
  res.render('ia');
});

app.get('/termos', function(req, res) {
  res.render('termos');
});

app.get('/autores', function(req, res) {
  res.render('autores');
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