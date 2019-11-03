let ws = new WebSocket("ws://" + location.hostname + ":6969");

let player = new Vue({
    el: '#player',
    data: {
        type: 'unknown',
        name: '',
        level: 0,
        clicks: 0,
        xp: 0,
        xpreq: 200,
        id: "Loading...",
        players: [],
        clickMult: 0
    }
});

let monster = new Vue({
    el: '#monster',
    data: {
        background: 'unknown',
        name: 'unknown',
        display: 'the unknown',
        health: 1,
        healthMax: 1
    }
});

let stats = new Vue({
    el: '#stats',
    data: {
        dps: 0,
        stage: 0,
        killsStage: 0,
        killsTotal: 0,
        stageKills: 0
    }
});

let skills = new Vue({
    el: '#skills',
    data: {
        list: [],
    }
});

let log = new Vue({
    el: '#log',
    data: {
        messages: [
            'This is the start of the log history.',
            'Welcome to Click-NET'
        ]
    }
});

function skill(name) {
    $.getJSON("/game/skill/" + name, function (data) {
    });
}

$('#attack').click(function () {
    $.getJSON("/game/attack", function (data) {
    });
    $(this).effect('shake', 'fast', 2);
});

ws.onmessage = function (event) {
    let json = JSON.parse(event.data);
    if (json.type === "update") {
        let jsMon = json.monster;
        let jsPlayers = json.players;
        let jsScene = json.scene;
        let jsStage = json.stage;
        let jsKillsStage = json.killsStage;
        let jsKillsTotal = json.killsTotal;
        let jsStageKills = json.stageKills;

        monster.name = jsMon.name;
        monster.display = jsMon.display;
        monster.health = jsMon.health;
        monster.healthMax = jsMon.healthMax;
        monster.background = jsScene.background;
        stats.dps = jsMon.dps;
        stats.stage = jsStage + 1;
        stats.killsStage = jsKillsStage;
        stats.killsTotal = jsKillsTotal;
        stats.stageKills = jsStageKills;
        for (let i = 0; i < jsPlayers.length; i++) {
            if (jsPlayers[i].id === getCookie('id')) {
                player.clicks = jsPlayers[i].clicks;
                player.level = jsPlayers[i].level;
                player.name = jsPlayers[i].name;
                player.type = jsPlayers[i].type;
                player.id = jsPlayers[i].id;
                player.xp = jsPlayers[i].xp;
                player.xpreq = jsPlayers[i].xpreq;

                // skills
                skills.list = [];
                for (let j = 0; j < jsPlayers[i].skills.length; j++) {
                    if (jsPlayers[i].skills[j].requiredLvl <= player.level) {
                        skills.list.push(jsPlayers[i].skills[j]);
                    }
                }

                // remove self from list
                jsPlayers.splice(i, 1);
            }
        }

        player.players = jsPlayers;
    }

    if (json.type === "message") {
        let jsMessage = json.message;

        log.messages.unshift(jsMessage);

        if (log.messages.length === 6) {
            log.messages.pop();
        }
    }
};

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}