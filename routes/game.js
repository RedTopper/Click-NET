const express = require('express');
const game = express.Router();

game.get('/attack', function(req, res) {
    let wss = req.app.get("wss");
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;