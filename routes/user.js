const express = require('express');
const router = express.Router();
const fs = require('fs')
const bcrypt = require('bcryptjs')
const UserModule = require('../models/User')
const crypto = require('crypto');
const axios = require('axios')
const UserLogin = require('../authentications/UserLogin')

router.get('/login', async (req, res) => {
	const cookie = req.headers.cookie
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;

	if (login.error) {
		res.render('user/login')
	} else {
		res.redirect('/user/profile')
	}
})

router.post('/login', (req, res) => {
	const email = req.body.email
	const password = req.body.password

	UserModule.findOne({
		where: {
			email: email
		}}).then(user => {
		if (user) {

			var correct = bcrypt.compareSync(password, user.password)

			if (correct) {

				crypto.randomBytes(20, (errror, buf) => {
					var token = buf.toString('hex')

					var SaveToken = fs.readFileSync('./tokens/login.json', 'utf8')
					SaveToken = JSON.parse(SaveToken)

					SaveToken.push({
						token: token, user: user.id
					})
					SaveToken = JSON.stringify(SaveToken)

					fs.writeFileSync('./tokens/login.json', SaveToken)

					req.flash('token_login', token)
					res.redirect('/user/LoginSuccess?redirect='+encodeURIComponent(req.body.redirect)+'&token='+encodeURIComponent(token))

				})

			} else {
				req.flash('error_msg', 'A senha que você inseriu está incorreta! tente novamente.')
				res.redirect('/user/login')
			}

		} else {
			req.flash('error_msg', 'Nós não encontramos um usuário com este e-mail, tente novamente com outro e-mail.')
			res.redirect('/user/login')
		}
	}).catch(() => {
		req.flash('error_msg', 'Houve um erro ao fazer o login.')
		res.redirect('/user/login')
	})

})

router.get('/terms', (req, res) => {
	res.render('user/terms');
});

router.get('/profile', UserLogin, (req, res) => {
	res.render('user/profile')
})

router.get('/profile/api', (req, res) => {
	const cookie = req.query["cookie"]
	var tokens = fs.readFileSync('./tokens/login.json',
		'utf8')
	tokens = JSON.parse(tokens)
	let time = 0
	let found = false

	if (cookie.indexOf('token_login=') != -1) {
		var token_login = cookie.replace(cookie.substring(0, cookie.indexOf('token_login=')+('token_login=').length), '')
		token_login = token_login.replace(token_login.substring(token_login.indexOf(';'), token_login.length), '')
		if (tokens.length != 0) {
			tokens.forEach((token) => {
				time++
				if (token.token == token_login) {
					found = true
					UserModule.findOne({
						where: {
							id: token.user
						}
					}).then(user => {
						user.password = '********'
						res.json({
							error: false,
							user: user
						})
					}).catch(() => {
						res.json({
							error: 'Houve um erro no nosso banco de dados, tente novamente mais tarde',
							user: null
						})
					})
				} else if (time == tokens.length && !found) {
					res.json({
						error: 'Token inválido!',
						user: null
					})
				}
			})
		} else {
			res.json({
				error: 'Token inválido!',
				user: null
			})
		}
	} else {
		res.json({
			error: 'Nhenhum usuário conectado',
			user: null
		})
	}
})

router.get('/LoginSuccess', (req, res) => {
	res.render('user/LoginSuccess', {
		redirect: req.query["redirect"],
		token: req.query["token"]
	})
})

module.exports = router;