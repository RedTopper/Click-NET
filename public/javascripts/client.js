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
        players: []
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
        dps: 0
    }
});

let skills = new Vue({
    el: '#skills',
    data: {
        list: [],
    }
});

let upgrades = new Vue({
    el: '#upgrades',
    data: {
        purchases: [],
    }
});

$('#attack').click(function () {
    $.getJSON( "/game/attack", function( data ) {});
});

ws.onmessage = function (event) {
  let json = JSON.parse(event.data);
  console.log(json);
  if (json.type === "update") {
      wsUpdate(json.monster, json.players, json.scene, json.skills, json.upgrades);
  }
};

function wsUpdate(jsMon, jsPlayers, jsScene, jsSkills, jsUpgrades) {
    monster.name = jsMon.name;
    monster.display = jsMon.display;
    monster.health = jsMon.health;
    monster.healthMax = jsMon.healthMax;
    monster.background = jsScene.background;
    stats.dps = jsMon.dps;
    for (let i=0; i<jsPlayers.length; i++) {
        if (jsPlayers[i].id === getCookie('id')) {
            player.clicks = jsPlayers[i].clicks;
            player.level = jsPlayers[i].level;
            player.name = jsPlayers[i].name;
            player.type = jsPlayers[i].type;
            player.id = jsPlayers[i].id;
            player.xp = jsPlayers[i].xp;
            player.xpreq = jsPlayers[i].xpreq;
            for (let i = 0; i < jsSkills.length; i++) {
                if (jsSkills[i].for === player.type) {
                    skills.list = []
                    for (let j=0; j<jsSkills[i].skills.length; j++) {
                        if (jsSkills[i].skills[j].requiredLvl <= player.level) {
                            skills.list.push(jsSkills[i].skills[j]);
                        }
                    }
                }
            }
            for (let i = 0; i < jsUpgrades.length; i++) {

            }
            console.log(jsPlayers[i]);
            jsPlayers.splice(i, 1);
        }
    }
    player.players = jsPlayers;
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}