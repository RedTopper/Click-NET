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
    }

    load(json) {
        this.count = json.count;
    }

    save() {
        let json = JSON.stringify(this);
        fs.writeFile('runtime.json', json, 'utf8', function () {
            console.log("Saved!");
        });
    }

    inc() {
        this.count += 1;
        return this.count;
    }
}

module.exports = Runtime;