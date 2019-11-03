const fs = require("fs");
const uuid = require('uuid/v4');

const types = [
    'paladin',
    'swordsman',
    'mage'
];

const monsters = {
    alien: {
        name: 'alien',
        display: 'Probing Alien',
        health: 1300,
        attacks: [
            {
                display: "Spit",
                damage: 7
            }
        ]
    },
    beefcake_domino: {
        name: 'beefcake_domino',
        display: 'Beefcake Domino',
        health: 2000,
        attacks: [
            {
                display: "Think",
                damage: -2
            },
            {
                display: "Nail Bat",
                damage: 18
            }
        ]
    },
    brain: {
        name: 'brain',
        display: 'Brainy Monk',
        health: 900,
        attacks: [
            {
                display: "Punch",
                damage: 10
            },
            {
                display: "Total Focus",
                damage: 35
            }
        ]
    },
    creep: {
        name: 'creep',
        display: 'Creeper',
        health: 500,
        attacks: [
            {
                display: "Death's Kiss",
                damage: 50
            }
        ]
    },
    fish: {
        name: 'fish',
        display: 'Angry Fish',
        health: 1000,
        attacks: [
            {
                display: "Bite",
                damage: 10
            }
        ]
    },
    flower: {
        name: 'flower',
        display: 'Man-Eating Flower',
        health: 1100,
        attacks: [
            {
                display: "Thorns",
                damage: 20
            }
        ]
    },
    goo: {
        name: 'goo',
        display: 'Disgustingly, Terrifying Pile of Goo',
        health: 2500,
        attacks: [
            {
                display: "Consume",
                damage: 18
            }
        ]
    },
    medium_domino: {
        name: 'medium_domino',
        display: 'Teenage Domino',
        health: 1600,
        attacks: [
            {
                display: "Grounded",
                damage: -5
            },
            {
                display: "Disobedience",
                damage: 12
            }
        ]
    },
    shark: {
        name: 'shark',
        display: 'Great White Shark',
        health: 1300,
        attacks: [
            {
                display: "Chomp",
                damage: 12
            },
            {
                display: "Thrash",
                    damage: 20
            }
        ]
    },
    small_domino: {
        name: 'small_domino',
        display: 'Baby Domino',
        health: 2750,
        attacks: [
            {
                display: "Baby",
                damage: -1
            },
            {
                display: "Cry",
                damage: 4
            }
        ]
    },
    spider: {
        name: 'spider',
        display: 'Spider',
        health: 1000,
        attacks: [
            {
                display: "Shoot Web",
                damage: 8
            }
        ]
    },
    sword: {
        name: 'sword',
        display: 'Curious, Prodding Sword',
        health: 900,
        attacks: [
            {
                display: "Stab",
                damage: 30
            }
        ]
    },
    tree: {
        name: 'tree',
        display: '',
        health: 1750,
        attacks: [
            {
                display: "Timber",
                damage: 25
            },
            {
                display: "Stomp",
                damage: 20
            }
        ]
    },
    worm: {
        name: 'worm',
        display: 'Highly Intelligent Worm',
        health: 800,
        attacks: [
            {
                display: "Worm",
                damage: 0
            },
            {
                display: "Death Ray",
                damage: 15
            }
        ]
    }
};

const progress = [
    {
        required: 5,
        background: [
            'windows',
        ],
        enemies: [
           monsters.spider,
        ],
        healthMultiplier: .5
    },
    {
        required: 10,
        background: [
            'cave'
        ],
        enemies: [
            monsters.spider,
            monsters.alien
        ],
        healthMultiplier: .75
    },
    {
        required: 1,
        background: [
            'fire'
        ],
        enemies: [
            monsters.worm,
            monsters.spider,
            monsters.alien
        ],
        healthMultiplier: 1.25
    },
    {
        required: 1,
        background: [
            'castle'
        ],
        enemies: [
            monsters.small_domino
        ],
        healthMultiplier: 2,
    },
    {
        required: 1,
        background: [
            'castle'
        ],
        enemies: [
            monsters.medium_domino
        ],
        healthMultiplier: 2,
    },
    {
        required: 1,
        background: [
            'castle'
        ],
        enemies: [
            monsters.beefcake_domino
        ],
        healthMultiplier: 2,
    },
    {
        required: 10,
        background: [
            'ocean'
        ],
        enemies: [
            monsters.fish,
            monsters.shark
        ],
        healthMultiplier: 2.5
    },
    {
        required: 10,
        background: [
            'meadow'
        ],
        enemies: [
            monsters.flower,
            monsters.tree
        ],
        healthMultiplier: 3
    },
    {
        required: 10,
        background: [
            'dungeon'
        ],
        enemies: [
            monsters.sword,
            monsters.brain
        ],
        healthMultiplier: 3.5
    },
    {
        required: 10,
        background: [
            'underworld'
        ],
        enemies: [
            monsters.goo,
            monsters.creep
        ],
        healthMultiplier: 4
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