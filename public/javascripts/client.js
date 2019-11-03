let ws = new WebSocket("ws://" + location.hostname + ":6969");

let player = new Vue({
    el: '#player',
    data: {
        type: 'unknown',
        name: '',
        level: 0,
        clicks: 0,
        id: "Loading..."
    }
});

let players = new Vue({
    el: "#players",
    data: {
        at: [
            {
                type: 'unknown',
                name: '',
                level: 0,
                clicks: 0,
                id: "Loading..."
            }
        ]
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

    jsPlayers.forEach(function(jsplayer) {
        if (jsplayer.id === document.cookie.substring(3)) {
            player.clicks = jsplayer.clicks;
            player.level = jsplayer.level;
            player.name = jsplayer.name;
            player.type = jsplayer.type;
            player.id = jsplayer.id;
        } else {
            players.at[jsplayer.id] = {
                type: jsplayer.type,
                name: jsplayer.name,
                level: jsplayer.level,
                clicks: jsplayer.clicks,
                id: jsplayer.id
            }
        }
    });
}