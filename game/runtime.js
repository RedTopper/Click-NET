const fs = require("fs");
const uuid = require('uuid/v4');
const Player = require('./player.js');

class Runtime {
    constructor() {
        this.defaults();
        let runtime = this;
        fs.readFile('runtime.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return;
            }

            let json = JSON.parse(data);
            runtime.load(json);
            console.log("Loaded!");
        });
    }

    defaults() {
        this.players = [];
    }

    load(json) {
        this.players = json.players;
    }

    save() {
        let json = JSON.stringify(this);
        fs.writeFile('runtime.json', json, 'utf8', function () {});
    }

    get(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                return this.players[i];
            }
        }

        return null;
    }

    join(id, name, type) {
        const types = [
            'paladin',
            'swordsman',
            'mage'
        ];

        if (id !== undefined && this.get(id)) {
            console.log("Player " + name + " reconnected!");
            return true;
        }

        if (typeof name != "string") {
            console.log("Player name not a string!");
            return false;
        }

        if (name.length < 3) {
            console.log("Player name not long enough!");
            return false;
        }

        if (!types.includes(type)) {
            console.log("Player incorrect class!");
            return false;
        }

        let player = Player(uuid(), name.substring(0, 12), type);
        this.players.push(player);
        console.log("Player " + name + " joined!");
        return player;
    }
}

module.exports = Runtime;