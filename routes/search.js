const express = require('express');
const router = express.Router();
const Search = require('../models/Search')
const SearchInDatabase = require('../robots/search/SearchInDatabase')
const ResearchEngagementModule = require('../models/ResearchEngagement')
const axios = require('axios')

/*
Search.create({
	title: "jsjwj",
	content: "ksjsj",
	main: "jajsjjs",
	ReadTime: 10,
	userId: 1
})*/

router.get('/', (req, res) => {
	res.render('search/index');
});

router.get('/response/page', (req, res) => {
	var question = req.query["question"]

	if (question && question != undefined) {
		res.render('search/response', {
			question: question
		})
	} else {
		res.redirect('/search')
	}
})

router.get('/response', (req, res) => {
	const question = req.query["question"]
	SearchInDatabase(question).then((success) => {
		res.send(success)
	}).catch((erro) => {
		res.send(erro)
	})
})

router.get('/term/:id', (req, res) => {
	var id = req.params.id
	var title = req.query['title']
	if (!isNaN(id)) {
		if (id != null || id != undefined) {
			Search.findByPk(id).then((term) => {
				if (term) {
					res.render('search/term', {
						term: term.dataValues
					})
				} else {
					if (title != undefined) {
						req.flash('error_msg', 'Não foi possível encontrar o termo de busca, mais fizemos uma pesquisa relacionada a ele.')
						res.redirect('/search/response/page?question='+title)
					} else {
						req.flash('error_msg', 'Desculpe, não foi possível encontrar o termo de busca.')
						res.redirect('/search')
					}
				}
			}).catch(() => {
				res.redirect('/search/response/page?question='+title)
			})
		} else {
			if (title != undefined) {
				req.flash('error_msg', 'Não foi possível encontrar o termo de busca, mais fizemos uma pesquisa relacionada a ele.')
				res.redirect('/search/response/page?question='+title)
			} else {
				req.flash('error_msg', 'Desculpe, não foi possível encontrar o termo de busca.')
				res.redirect('/search')
			}
		}
	} else {
		if (title != undefined) {
			req.flash('error_msg', 'Não foi possível encontrar o termo de busca, mais fizemos uma pesquisa relacionada a ele.')
			res.redirect('/search/response/page?question='+title)
		} else {
			req.flash('error_msg', 'Desculpe, não foi possível encontrar o termo de busca.')
			res.redirect('/search')
		}
	}
})

router.get('/engagements', async (req, res) => {
	const cookie = req.query["cookie"]
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data


	if (!login.error) {
		var engagements = await ResearchEngagementModule.findAll({
			where: {
				userId: login.user.id
			}
		})

		res.json(engagements)

	} else {
		res.json({
			error: 'você não está conectado a sua conta Mycroway'
		})
	}
})

router.post('/engagement/create', async (req, res) => {
	const cookie = req.query["cookie"]
	var login = await axios(req.protocol+'://'+req.headers.host+'/user/profile/api?cookie='+encodeURIComponent(cookie))
	login = login.data
	
	var searchId = Number(req.body.searchId)

	if (!login.error) {
		var engagement = await ResearchEngagementModule.create({
			userId: login.user.id,
			searchId: searchId
		})
		res.json(engagement)
	} else {
		res.json({
			error: "você não está conectado a sua conta Mycroway"
		})
	}
})


module.exports = router;