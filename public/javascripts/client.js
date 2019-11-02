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


class Monster {

}

class Message {
    constructor(json) {
        this.player = json.player;
        this.text = json.text;
        this.time = new Date(json.time).toLocaleTimeString();
    }
}

ws.onmessage = function (event) {
  let json = JSON.parse(event.data);

  switch (json.type) {
      case "monster":
          update(json.body);
          break;
      case "connect":
          connect(json.body);
          break;
      case "message":
          message(new Message(json.body));
          break;
      default:
          console.log("Cannot handle " + json.type);
  }
};

function update() {

}

function connect() {

}

function message(message) {
    console.log(message);
}