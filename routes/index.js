const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let runtime = req.app.get('runtime');
  res.render('index', { title: 'Click NET', runtime: runtime });
  req.app.get('wss').clients.forEach(function each(client) {
    client.send("hello");
  })
});

router.get('/game', function(req, res, next) {
  res.render('game');
});

module.exports = router;
