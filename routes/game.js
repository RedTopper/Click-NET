const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let runtime = req.app.get('runtime');
    console.log(runtime.get(req.cookies['id']));
    let player = runtime.get(req.cookies['id']);
    if (!player) return;
    console.log(runtime);
    runtime.monster.health -= 100;
    if (runtime.monster.health <= 0) {
        runtime.nextMon();
    }
    player.clicks++;
    res.type("application/json");
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;