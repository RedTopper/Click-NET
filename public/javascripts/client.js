let ws = new WebSocket("ws://" + location.hostname + ":6969");

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
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
      case "monsters":
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