const express = require('express');
const router = express.Router();
const Search = require('../models/Search')
const SearchInDatabase = require('../robots/search/SearchInDatabase')
//const flash = require("connect-flash")

router.get('/', function(req, res) {
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
					res.send(`
						<h1>${term.title}</h1>
						<hr />
						<p>${term.content}</p>
					`)
				} else {
					if (title != undefined) {
						req.flash('error_msg', 'Não foi possível encontrar o termo de busca mais, fizemos uma pesquisa relacionada a ele.')
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
				req.flash('error_msg', 'Não foi possível encontrar o termo de busca mais, fizemos uma pesquisa relacionada a ele.')
				res.redirect('/search/response/page?question='+title)
			} else {
				req.flash('error_msg', 'Desculpe, não foi possível encontrar o termo de busca.')
				res.redirect('/search')
			}
		}
	} else {
		if (title != undefined) {
			req.flash('error_msg', 'Não foi possível encontrar o termo de busca mais, fizemos uma pesquisa relacionada a ele.')
			res.redirect('/search/response/page?question='+title)
		} else {
			req.flash('error_msg', 'Desculpe, não foi possível encontrar o termo de busca.')
			res.redirect('/search')
		}
	}
})


module.exports = router;