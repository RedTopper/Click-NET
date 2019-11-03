const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    if (!player) return;

    runtime.monster.health -= 10 * player.level;
    if (runtime.monster.health <= 0) {
        player.xp += (runtime.monster.healthMax / 10);
        while (player.xp >= player.xpreq) {
            console.log("here");
            player.xp -= player.xpreq;
            player.xpreq *= 1.5;
            player.level++;
        }
        runtime.nextMonReal();
    }
    player.clicks++;
    res.type("application/json");
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;