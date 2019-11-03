const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    if (!player) return;

    damage(runtime, player, 5 * player.level * player.clickMult);

    player.clicks++;
    res.type("application/json");
    res.end(JSON.stringify({status: "ok"}));
});

game.get('/skill/:name', function (req, res) {
    let name = req.params.name;
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    if (!player) return;

    for (let i = 0; i < player.skills.length; i++) {
        let skill = player.skills[i];
        if (skill.name === name && skill.timer === 0) {
            skill.timer = skill.cooldown;
            damage(runtime, player, skill.damage);
            res.type("application/json");
            res.end(JSON.stringify({status: "ok"}));
            return;
        }
    }

    res.type("application/json");
    res.end(JSON.stringify({status: "no"}));
});

function damage(runtime, player, damage) {
    let players = runtime.players;
    runtime.monster.health -= damage;

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
}

module.exports = game;