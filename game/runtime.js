const fs = require("fs");
const uuid = require('uuid/v4');

const types = [
    'paladin',
    'swordsman',
    'mage'
];

const monsters = {
    spider: {
        name: 'spider',
        display: 'Spider',
        health: 1000,
        attacks: [
            {
                display: "Shoot Web",
                damage: 10
            }
        ]
    },
    alien: {
        name: 'alien',
        display: 'Alien',
        health: 1500,
        attacks: [
            {
                display: "Spit",
                damage: 9
            }
        ]
    },
    worm: {
        name: 'worm',
        display: 'Worm',
        health: 700,
        attacks: [
            {
                display: "Worm",
                damage: 0
            },
            {
                display: "Laser",
                damage: 20
            }
        ]
    },
    small_domino: {
        name: 'small_domino',
        display: 'Domino Baby',
        health: 1800,
        attacks: [
            {
                display: "Baby",
                damage: -1
            },
            {
                display: "Cry",
                damage: 10
            }
        ]
    },
    medium_domino: {
        name: 'medium_domino',
        display: 'Domino Apprentice',
        health: 1800,
        attacks: [
            {
                display: "Baby",
                damage: -1
            },
            {
                display: "Cry",
                damage: 10
            }
        ]
    },
    papa_domino: {
        name: 'papa-domino',
        display: 'Papa Domino',
        health: 1800,
        attacks: [
            {
                display: "Baby",
                damage: -1
            },
            {
                display: "Cry",
                damage: 10
            }
        ]
    }
};

const progress = [
    {
        required: 10,
        background: [
            'windows',
            'cave'
        ],
        enemies: [
           monsters.spider,
           monsters.alien
        ],
        healthMultiplier: 1
    },
    {
        required: 1,
        background: [
            'fire'
        ],
        enemies: [
           monsters.small_domino
        ],
        healthMultiplier: 5
    },
    {
        required: 10,
        background: [
            'castle'
        ],
        enemies: [
            monsters.worm,
            monsters.alien,
            monsters.spider
        ],
        healthMultiplier: 2,
    }
];

const skills = {
    paladin: [
        {
            name: 'pummel',
            display: 'Pummel',
            cooldown: 0,
            timer: 0,
            damage: 2,
            requiredLvl: 1
        },
        {
            name: 'protect',
            display: 'Protect',
            cooldown: 20,
            timer: 0,
            damage: 0,
            requiredLvl: 2
        },
    ],
    swordsman: [
        {
            name: 'slash',
            display: 'Slash',
            cooldown: 0,
            timer: 0,
            damage: 2,
            requiredLvl: 1
        },
        {
            name: 'cleave',
            display: 'Cleave',
            cooldown: 15,
            timer: 0,
            damage: 70,
            requiredLvl: 3
        }
    ],
    mage: [
        {
            name: 'lightning',
            display: 'Lightning Bolt',
            cooldown: 0,
            timer: 0,
            damage: 1,
            requiredLvl: 1
        },
        {
            name: 'heal',
            display: 'Heal',
            cooldown: 10,
            timer: 0,
            damage: -10,
            requiredLvl: 1
        },
        {
            name: 'fireball',
            display: 'Fireball',
            cooldown: 20,
            timer: 0,
            damage: 50,
            requiredLvl: 2
        },
        {
            name: 'tornado',
            display: 'Tornado',
            cooldown: 15,
            timer: 0,
            damage: 45,
            requiredLvl: 3
        }
    ]
};

const upgrades = [
    {
        for: 'Clicker Damage',
        stats: [
            {
                amount: 0,
                cost: 25,
                multiplier: 1.1
            }
        ]
    },
    {
        for: 'Spell Effectiveness',
        stats: [
            {
                amount: 0,
                cost: 50,
                multiplier: 1.25
            }
        ]
    },
    {
        for: 'Clicker Minion',
        stats: [
            {
                amount: 0,
                cost: 50,
                damage: 1
            }
        ]
    },
    {
        for: 'Clicker Apprentice',
        stats: [
            {
                amount: 0,
                cost: 100,
                damage: 2
            }
        ]
    },
    {
        for: 'Clicker Master',
        stats: [
            {
                amount: 0,
                cost: 400,
                damage: 5
            }
        ]
    },
    {
        for: 'Clicker Kanye',
        stats: [
            {
                amount: 0,
                cost: 2000,
                damage: 25
            }
        ]
    }
];

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

    nextMonReal() {
        this.killsTotal++;
        this.killsStage++;
        let stage = progress[this.stage];
        if (this.killsStage >= stage.required) {
            this.stage++;
            if (this.stage >= progress.length) this.stage = progress.length - 1;
            this.killsStage = 0;
            stage = progress[this.stage];
        }

        let mon = stage.enemies[Math.floor(Math.random() * stage.enemies.length)];
        mon = JSON.parse(JSON.stringify(mon));
        mon.healthMax = (Math.random() + 0.5) * mon.health * stage.healthMultiplier;
        mon.healthMax = Math.floor(mon.healthMax / 10) * 10;
        mon.health = mon.healthMax;
        this.scene.background = stage.background[Math.floor(Math.random() * stage.background.length)];
        this.monster = mon;
    }

    defaults() {
        this.killsTotal = 0;
        this.killsStage = 0;
        this.stage = 0;
        this.players = [];
        this.monster = monsters.spider;
        this.scene = {
            background: 'windows'
        };

        this.nextMonReal();
    }

    load(json) {
        this.key(json, 'players');
        this.key(json, 'stage');
        this.key(json, 'killsStage');
        this.key(json, 'killsTotal');
        this.key(json, 'monster');
        this.key(json, 'scene');
    }

    save() {
        let json = JSON.stringify(this);
        fs.writeFile('runtime.json', json, 'utf8', function () {});
    }

    key(json, key) {
        if (json[key] !== undefined) this[key] = json[key];
    }

    get(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                return this.players[i];
            }
        }

        return null;
    }

    quit(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                this.players.splice(i, 1);
            }
        }
    }

    join(res, id, name = undefined, type = undefined) {
        if (id !== undefined) {
            let found = this.get(id);
            if (found) {
                console.log("NOTICE: Reconnected " + found.name);
                return found;
            }
        }

        if (typeof name != "string") {
            console.log("WARNING: Player name not a string!");
            res.clearCookie('id');
            res.redirect("/");
            return undefined;
        }

        if (name.length < 3) {
            console.log("WARNING: Player name not long enough!");
            res.clearCookie('id');
            res.redirect("/");
            return undefined;
        }

        if (!types.includes(type)) {
            console.log("WARNING: Player incorrect class!");
            res.clearCookie('id');
            res.redirect("/");
            return undefined;
        }

        let player = this.create(uuid(), name, type);

        this.players.push(player);
        res.cookie('id',  player.id, { maxAge: Number(new Date().getTime()/1000) + 60*60*24*30 });
        console.log("NOTICE: Connected " + player.name);

        return player;
    }

    create(id, name, type) {
        return {
            id: id,
            name: name.substring(0, 12),
            level: 1,
            clicks: 0,
            type: type,
            xp: 0,
            health: 100,
            healthMax: 100,
            xpreq: 200,
            skills: JSON.parse(JSON.stringify(skills[type])),
            clickMult: type === 'mage' ? 0.5 : type === 'paladin' ? 1.0 : 1.5
        };
    }

    getStageKills(){
        return progress[this.stage].required;
    }

}

module.exports = Runtime;