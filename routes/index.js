const express = require('express');
const uuid = require('uuid/v4');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies['id']) {
    res.redirect('/game');
  }

  let runtime = req.app.get('runtime');
  res.render('index', { title: 'Click NET', runtime: runtime });
  req.app.get('wss').clients.forEach(function each(client) {
    client.send("hello");
  })
});

router.post('/game', function(req, res) {
  req.app.get('runtime').join(req.cookies['id'], req.body.name);

  res.render('game');
});

module.exports = router;
