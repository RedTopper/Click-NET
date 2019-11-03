let ws = new WebSocket("ws://" + location.hostname + ":6969");

let player = new Vue({
    el: '#player',
    data: {
        type: 'unknown',
        name: '',
        level: 0,
        clicks: 0,
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
        health: 100,
        max: 1000
    }
});

$('#attack').click(function () {
    $.getJSON( "/game/attack", function( data ) {});
});

ws.onmessage = function (event) {
  let json = JSON.parse(event.data);
  switch (json.type) {
      case "update":
          wsUpdate(json.monster, json.players, json.scene);
          break;
      default:
          console.log("Cannot handle " + json.type);
  }
};

function wsUpdate(jsMon, jsPlayers, jsScene) {
    monster.name = jsMon.name;
    monster.display = jsMon.display;
    monster.health = jsMon.health;
    monster.background = jsScene.background;
    player.players = jsPlayers;
    jsPlayers.forEach(function(jsplayer) {
        if (jsplayer.id === getCookie('id')) {
            player.clicks = jsplayer.clicks;
            player.level = jsplayer.level;
            player.name = jsplayer.name;
            player.type = jsplayer.type;
            player.id = jsplayer.id;
        }
    });
}

function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}