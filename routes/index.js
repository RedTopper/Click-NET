let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Click NET' });
});

router.get('/game', function(req, res, next) {
  res.render('game');
});

module.exports = router;
