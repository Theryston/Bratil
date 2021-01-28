const express = require('express');
const router = express.Router();
const fs = require('fs')
const bcrypt = require('bcryptjs')
const UserModule = require('../models/User')
const crypto = require('crypto');
const axios = require('axios')
const nodemailer = require('../e-mail/nodemailer')
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

router.get('/profile', UserLogin, async (req, res) => {
	const cookie = req.headers.cookie
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;
	var  branch = await axios(req.protocol+'://'+req.headers.host+'/admin/branch/'+login.user.branch+'/api')
	branch = branch.data

	res.render('user/profile',
		{
			user: login.user,
			branch
		})

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

router.get('/create', (req, res) => {
	res.render('user/create')
})

router.post('/create', (req, res) => {
	var email = req.body.email
	var name = req.body.name
	var password = req.body.password
	var gender = req.body.gender

	if (!email) {
		req.flash('error_msg', 'Há algo de errado com o e-mail')
		res.redirect('/user/create')
	}

	if (!name) {
		req.flash('error_msg', 'Há algo de errado com o seu nome')
		res.redirect('/user/create')
	}

	if (!password) {
		req.flash('error_msg', 'Há algo de errado com a senha')
		res.redirect('/user/create')
	}

	if (!gender) {
		req.flash('error_msg', 'Há algo de errado com o seu gênero')
		res.redirect('/user/create')
	}

	if (gender != 'male' && gender != 'female') {
		req.flash('error_msg', 'Há algo de errado com o seu gênero')
		res.redirect('/user/create')
	}


	UserModule.findOne({
		where: {
			email: email
		}}).then(UserDataBase => {

		if (!UserDataBase) {
			var salt = bcrypt.genSaltSync(10)
			var hash = bcrypt.hashSync(password, salt)

			UserModule.create({
				email: email,
				name: name,
				gender: gender,
				password: hash
			}).then((user) => {
				crypto.randomBytes(20, (errror, buf) => {
					var token = buf.toString('hex')

					var SaveToken = fs.readFileSync('./tokens/login.json', 'utf8')
					SaveToken = JSON.parse(SaveToken)

					SaveToken.push({
						token: token, user: user.id
					})

					SaveToken = JSON.stringify(SaveToken)

					fs.writeFileSync('./tokens/login.json', SaveToken)

					res.redirect('/user/LoginSuccess?redirect='+encodeURIComponent('/user/profile')+'&token='+encodeURIComponent(token))

				})
			})
		} else {
			req.flash('error_msg', 'Já existe um usuário com este mesmo e-mail, faça login ou tente com outro e-mail')
			res.redirect('/user/create')
		}
	})
})

router.delete('/delete', async (req, res) => {
	const cookie = req.query["cookie"]

	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;

	if (login.error) {
		res.json({
			OK: false,
			message: 'Você não está conectado a sua conta para excluí-la, faça o login para excluí-la!!'
		})
	} else {
		if (login.user.branch == 1) {
			res.json({
				OK: false,
				message: 'Você é o dono da Bratil, sua conta é tão valiosa que não pode ser excluída!'
			})
		} else {
			UserModule.destroy({
				where: {
					id: login.user.id
				}}).then(() => {
				res.json({
					OK: true,
					message: 'Sua conta foi excluída com sucesso!'
				})
			}).catch(() => {
				res.json({
					OK: false,
					message: 'Houve um erro ou excluir sua conta!'
				})
			})
		}
	}
});

router.get('/logout', UserLogin, async (req, res) => {
	var cookie = req.headers.cookie
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;
	var token_login = cookie.replace(cookie.substring(0, cookie.indexOf('token_login=')+('token_login=').length), '')
	token_login = token_login.replace(token_login.substring(token_login.indexOf(';'), token_login.length), '')

	var tokens = fs.readFileSync('./tokens/login.json',
		'utf8')
	tokens = JSON.parse(tokens)

	var index = 0;
	var found = false;

	if (login.error) {
		req.flash('error_msg', 'Houve um erro ao desconectar sua conta')
		res.redirect('/user/profile')
	} else {

		for (let i = 0; i < tokens.length && !found; i++) {
			if (tokens[i].token == token_login) {
				index = i
				found = true
			}
		}

		if (found) {
			var RedirectLink = req.query["redirectlink"]
			tokens.splice(index, 1)
			tokens = JSON.stringify(tokens)
			fs.writeFileSync('./tokens/login.json', tokens)
			if (RedirectLink) {
				res.redirect(RedirectLink)
			} else {
				res.redirect('/')
			}
		}

	}
})

router.get('/forgot', async (req, res) => {
	res.render('user/forgot')
})

router.post('/forgetting', UserLogin, async (req, res) => {
	var cookie = req.headers.cookie
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;


	crypto.randomBytes(6, (errror, buf) => {
		var token = buf.toString('hex').substring(0, 6)
		token = token.toUpperCase()


		var tokens = fs.readFileSync('./tokens/reset_password.json', 'utf-8')
		tokens = JSON.parse(tokens)

		tokens.push({
			token: token,
			user: login.user.id
		})

		var SaveToken = JSON.stringify(tokens)
		fs.writeFileSync('./tokens/reset_password.json', SaveToken)

		nodemailer.transporter.sendMail({
			from: "Bratil <baitthenew@gmail.com>",
			to: login.user.email,
			subject: "Redefinir sua senha da Bratil!",
			html: `
			<div style="background:rgb(0,140,255); padding:20px; font-family:arial; border-radius:10px; color: white;">
			<h1>aqui está o token para redefinir sua senha: </h1>

			<p style="display:inline; margin-top:100px;">
			Token: <strong>${token}</strong>
			</p>
			</div>
			`

		})
	})

	var RenderEmail = login.user.email.replace(login.user.email.substring(1, login.user.email.indexOf('@')), '*********')

	res.render('user/forgetting', {
		email: RenderEmail
	})
})

router.post('/reset', UserLogin, async (req, res) => {
	var InputToken = req.body.token
	var tokens = fs.readFileSync('./tokens/reset_password.json', 'utf-8')
	tokens = JSON.parse(tokens)
	var found = false
	var times = 0

	tokens.forEach(token => {
		times++
		if (InputToken == token.token) {
			found = true
			res.render('user/reset')
		} else if (times == tokens.length-1 && !found) {
			req.flash('error_msg', 'Nos enviamos outro token para você, pois oque você digitou estava inválido!')
			res.redirect('/user/forgot')
		}
	})
})

router.post('/resetting', UserLogin, async (req, res) => {
	var cookie = req.headers.cookie
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data;
	var password = req.body.password
	var password2 = req.body.password2

	if (password == password2) {
		var salt = bcrypt.genSaltSync(10)
		var hash = bcrypt.hashSync(password, salt)

		UserModule.update({
			password: hash
		}, {
			where: {
				id: login.user.id
			}
		}).then(() => {

			var tokens_login = fs.readFileSync('./tokens/login.json', 'utf-8')
			tokens_login = JSON.parse(tokens_login)
			var index = 0
			var indexes = []

			for (let i = 0; i < tokens_login.length; i++) {
				if (tokens_login[i].user == login.user.id) {
					tokens_login.splice(i, 1)
				}
			}

			var SaveToken = JSON.stringify(tokens_login)
			fs.writeFileSync('./tokens/login.json', SaveToken)

			res.redirect('/user/resetsuccess')

		})
	} else {
		req.flash('error_msg', 'As senhas não eram idênticas')
		res.redirect('/user/forgot')
	}

})

router.get('/resetsuccess', (req, res) => {
	res.render('user/ResetSuccess')
})

module.exports = router;