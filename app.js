const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path")
const search = require('./routes/search');
const user = require('./routes/user');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const url = require('url')
const SearchInDatabase = require('./robots/search/SearchInDatabase')
const SearchModule = require('./models/Search')
const session = require("express-session");
const flash = require("connect-flash")


//handlebars
app.engine('handlebars', handlebars({
	defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//session
app.use(session({
	secret: "hsbsbsbdgsha dhx ddhxhd",
	resave: true,
	saveUninitiaLized: true
}))
app.use(flash())

app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg")
	res.locals.error_msg = req.flash("error_msg")
	next()
})

//pastas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'text_search_content')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

//socket.io
io.on('connection', (socket) => {
	const ruoter = url.parse(socket.handshake.headers.referer).pathname


	//socket.io search
	if (ruoter.match('/search') !== null) {
		SearchModule.findAll({
			raw: true
		}).then(searches => {

			socket.on('searchValue', (searchValue) => {
				SearchInDatabase(searchValue, searches).then((response) => {
					socket.emit('responseToSearch', response)
				}).catch((error) => {
					socket.emit('responseToSearch', error)
				})
			})

		})
	}

	//outros sockets

})

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

const port = 3000

http.listen(port, () => {
	console.log('servidor rodando na porta: '+port)
});