const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('user/login')
})

router.get('/terms', (req, res) => {
  res.render('user/terms');
});

module.exports = router;