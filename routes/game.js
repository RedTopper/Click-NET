const express = require('express');
const game = express.Router();

game.get('/attack/:monster', function(req, res) {
    let runtime = req.app.get('runtime');
    let player = runtime.get(req.cookies['id']);
    res.end(JSON.stringify({some: "thing"}));
});

module.exports = game;