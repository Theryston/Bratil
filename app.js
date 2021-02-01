const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require("path")
const search = require('./routes/search');
const user = require('./routes/user');
const admin = require('./routes/admin');
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const url = require('url')
const SearchInDatabase = require('./robots/search/SearchInDatabase')
const SearchModule = require('./models/Search')
const UserModule = require('./models/User')
const session = require("express-session");
const flash = require("connect-flash")
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const axios = require('axios')
const fs = require('fs')

/*
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync('ur87Yi6JgHuNUFF', salt)

UserModule.create({
	name: 'Theryston Santos',
	email: 'funktodo2@gmail.com',
	gender: 'male',
	password: hash,
	branch: 1
})
*/

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

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
	res.locals.token_login = req.flash("token_login")
	next()
})

setTimeout(() => {
	fs.writeFileSync('./tokens/reset_password.json', '[]')
}, 1000*60*10)

//pastas
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'text_search_content')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

//socket.io
io.on('connection', async (socket) => {
	const ruoter = url.parse(socket.handshake.headers.referer).pathname
	const EmitedUrl = url.parse(socket.handshake.headers.referer)
	const cookie = socket.handshake.headers.cookie
	var login = await axios(EmitedUrl.protocol+'//'+EmitedUrl.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data

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

	if (!login.error) {
		if (login.user.branch == 1 || login.user.branch == 4) {
			socket.on('UpdateUserBranchCode', (BranchCode) => {
				if (BranchCode.code != 1) {
					if (BranchCode.code != '' || BranchCode.code == 0) {
						if (!isNaN(BranchCode.code)) {
							UserModule.findOne({
								where: {
									id: BranchCode.id
								}
							}).then((user) => {
								if (user.branch != 1) {
									UserModule.update({
										branch: BranchCode.code
									}, {
										where: {
											id: BranchCode.id
										}
									})
								}
							})
						}
					}
				}
			})

			socket.on('DeleteUserAccount', async (id) => {
				var user = await UserModule.findOne({
					where: {
						id: id
					},
					raw: true
				})

				if (user.branch != 1) {
					UserModule.destroy({
						where: {
							id: id
						}
					})
				}
			})
		}

		socket.on('UpdateMyUserAcount', async (user) => {
			console.log(user.name)
				var UserCreated = await UserModule.findOne({
					where: {
						email: user.email
					}})

				if (!UserCreated || UserCreated.id == login.user.id) {
					UserModule.update({
						...user
					}, {
						where: {
							id: login.user.id
						}})
				}
			})
	}

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
app.use('/admin', admin)

app.get('*', function(req, res) {
	res.redirect('/404')
})

const port = 3000

http.listen(port, () => {
	console.log('servidor rodando na porta: '+port)
});