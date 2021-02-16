const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('mai/index')
})

module.exports = router;