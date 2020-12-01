const express = require('express');
const router = express.Router();
const Search = require('../models/Search')
const SearchInDatabase = require('../robots/search/SearchInDatabase')

router.get('/', function(req, res) {
	res.render('search/index');
});

router.get('/response/page', (req, res) => {
	res.render('search/response', {
		question: req.query["question"]
	})
})

router.get('/response', (req, res) => {
	SearchInDatabase(req.query["question"]).then((success) => {
		res.send(success)
	}).catch((erro) => {
		res.send(erro)
	})
})


module.exports = router;