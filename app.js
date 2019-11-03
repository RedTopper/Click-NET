const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const WebSocket = require('ws');
const Runtime = require('./game/runtime');

let wss = new WebSocket.Server({port: 6969});
let runtime = new Runtime();

const game = require('./routes/game');
const index = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('wss', wss);
app.set('runtime', runtime);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/game', game);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// runtime tasks
setInterval(function () {
    runtime.save();
}, 5000);

setInterval(function () {
    let StageKills = runtime.getStageKills();
    wss.clients.forEach(function (socket) {
        socket.send(
            JSON.stringify({
                type: 'update',
                monster: runtime.monster,
                players: runtime.players,
                scene: runtime.scene,
                stage: runtime.stage,
                killsStage: runtime.killsStage,
                killsTotal: runtime.killsTotal,
                stageKills: StageKills
            })
        );
    })
}, 500);

setInterval(function () {
    if(runtime.monster.lasthp === undefined){
        runtime.monster.lasthp = runtime.monster.health;
    }

    runtime.monster.dps = runtime.monster.lasthp - runtime.monster.health;
    runtime.monster.lasthp = runtime.monster.health;

    runtime.players.forEach(function (value) {
        value.skills.forEach(function (skill) {
            if (skill.timer > 0) {
                skill.timer -= 1;
            }
        })
    })
}, 1000);


function attack() {
    if (runtime.players.length === 0) return;

    let i = Math.floor(Math.random() * runtime.players.length);
    let player = runtime.players[i];
    let attack = runtime.monster.attacks[Math.floor(Math.random() * runtime.monster.attacks.length)];

    player.health -= attack.damage;

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify({
            type: "message",
            message: player.name + " was attacked by the " + runtime.monster.display + " with " + attack.display + "!"
        }));
    });

    if (player.health <= 0) {
        runtime.players[i] = runtime.create(player.id, player.name, player.type);
        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({
                type: "message",
                message: player.name + " kicked the bucket!"
            }));
        });
    }
}

(function loop() {
    let rand = Math.round(Math.random() * 5000) + 5000;
    rand = rand / (runtime.players.length - 1 < 1 ? 1 : runtime.players.length);
    setTimeout(function() {
        attack();
        loop();
    }, rand);
}());

module.exports = app;
