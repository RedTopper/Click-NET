const express = require('express');
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
  let player = req.app.get('runtime').join(req.cookies['id'], req.body.name, req.body.type);
  if (player === false) {
    res.redirect("/");
    return;
  }

  res.render('game');
});

module.exports = router;
