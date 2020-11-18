const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path")
const search = require('./routes/search');
const user = require('./routes/user');


//handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//pastas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'text_search_content')))


//Rotas
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/sitemap', (req, res) => {
  res.sendfile('./sitemaps/sitemap.xml')
})

app.get('/404', (req, res) => {
  res.render('error/404')
})

app.use('/search', search)
app.use('/user', user)

app.get('*', function(req, res) {
  res.redirect('/404')
})

app.listen(3000, () => {
  console.log('servidor rodando 3000')
});