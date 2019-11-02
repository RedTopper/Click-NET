const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let runtime = req.app.get('runtime');
    console.log(runtime.get(req.cookies['id']));
    let player = runtime.get(req.cookies['id']);
    if (!player) return;
    runtime.monster.health -= 1;
    player.clicks++;
    res.type("application/json");
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;