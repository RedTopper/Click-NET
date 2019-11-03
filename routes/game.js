const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    let players = runtime.players;
    console.log(players);
    if (!player) return;

    runtime.monster.health -= 1000 * player.level * player.clickMult;
    if (runtime.monster.health <= 0) {
        players.forEach(function(p) {
            p.xp += ((runtime.monster.healthMax / 10) * (p.id === player.id ? 1.0 : 0.5));
            while (p.xp >= p.xpreq) {
                p.xp -= p.xpreq;
                p.xpreq *= 1.5;
                p.level++;
            }
            runtime.nextMonReal();
        });
    }
    player.clicks++;
    res.type("application/json");
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;