const fs = require("fs");

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
        this.count = 0;
        this.players = [];
    }

    load(json) {
        this.count = json.count;
        this.players = json.players;
    }

    save() {
        let json = JSON.stringify(this);
        fs.writeFile('runtime.json', json, 'utf8', function () {
            console.log("Saved!");
        });
    }

    players() {
        return this.players
    }

    join(id, name) {
        console.log(id, name);
    }
}

module.exports = Runtime;