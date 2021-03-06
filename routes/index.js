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
});

router.get('/quit', function (req, res) {
    let runtime = req.app.get('runtime');
    runtime.quit(req.cookies['id']);
    res.clearCookie('id');
    res.redirect("/");
});

router.get('/win', function (req, res) {
    let runtime = req.app.get('runtime');
    runtime.quit(req.cookies['id']);
    res.clearCookie('id');
    res.render('win', { title: 'Click NET', runtime: runtime });
});

router.get('/game', join);
router.post('/game', join);

function join(req, res) {
    let runtime = req.app.get('runtime');
    let player = runtime.join(res, req.cookies['id'], req.body.name, req.body.type);
    if (player) {
        res.render('game', {player: player});
        req.app.get('wss').clients.forEach(function each(client) {
            client.send(JSON.stringify({
                type: "message",
                message: "Player " + player.name + " joined!"
            }));
        })
    }
}

module.exports = router;
