const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if (req.cookies['id']) {
    res.redirect('/game');
    return;
  }

  let runtime = req.app.get('runtime');
  res.render('index', { title: 'Click NET', runtime: runtime });
  req.app.get('wss').clients.forEach(function each(client) {
    client.send("hello");
  })
});

router.get('/quit', function (req, res) {
  let runtime = req.app.get('runtime');
  runtime.quit(req.cookies['id']);
  res.clearCookie('id');
  res.redirect("/");
});

router.get('/game', join);
router.post('/game', join);

function join(req, res) {
  let runtime = req.app.get('runtime');
  let player = runtime.join(res, req.cookies['id'], req.body.name, req.body.type);

  if (player) {
    res.render('game', {player: player});
  } else {
    res.redirect("/");
  }
}

module.exports = router;
