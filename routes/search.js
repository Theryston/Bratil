const express = require('express');
const router = express.Router();
const TermsSearch = require('../models/TermsSearch')


router.get('/', function(req, res) {
  res.render('search/index');
});

router.get('/response/page', (req, res) => {
  res.render('search/response', {
    question: req.query["question"]
  })
})

router.get('/response/:question', (req, res) => {
  res.send({
    response: [
      ['Lorem ipsum imperdiet ad lobortis hac eleifend scelerisque ipsum fusce, vivamus tincidunt nisi fusce proin nostra habitasse rhoncus ullamcorper, donec sagittis non tempor convallis et quisque tempor. nulla fusce nostra a porta per integer, enim lacus egestas elementum vestibulum sapien porttitor, curae quisque ut quam cras.', 1],
      ['ante non diam sociosqu erat, dictumst sem elit lorem himenaeos donec rutrum adipiscing tempus sapien. netus dictum quam nulla aptent fermentum faucibus tempus, turpis sagittis sem nullam ad nisi dolor ad, elementum consequat blandit donec ut consectetur. ', 2]
      ]
  })
})


module.exports = router;