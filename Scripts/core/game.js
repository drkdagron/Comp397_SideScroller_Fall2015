/// <reference path="../config/config.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />
/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../states/menu.ts" />
/// <reference path="../gameobjects/UiButton.ts" />
/// <reference path="../gameobjects/coin.ts" />
/// <reference path="../gameobjects/rock.ts" />
/// <reference path="../gameobjects/world.ts" />
/// <reference path="../gameobjects/player.ts" />
// GLOBAL GAME FRAMEWORK VARIABLES
var assets;
var canvas;
var stage;
var stats;
var state;
var currentState; // alias for our current state
// GAME OBJECTS
var menu;
var game;
var over;
var score;
var background;
// manifest of all our assets
var manifest = [
    { id: "click", src: "../../Assets/audio/click1.ogg" },
    { id: "bg", src: "../../Assets/audio/pkmn_route1.mp3" },
    { id: "hit", src: "../../Assets/audio/thunder.ogg" },
    { id: "pickup", src: "../../Assets/audio/pickup4.ogg" },
];
var playerSheet;
var playerData = {
    "images": [
        "../../Assets/images/player/atlas.png"
    ],
    "frames": [
        [0, 0, 39, 70, 0, 0, 0],
    ],
    "animations": {
        "car": [0]
    },
};
var enemySheet;
var enemyData = {
    "images": [
        "../../Assets/images/enemies/atlas.png"
    ],
    "frames": [
        [0, 0, 80, 80, 0, 0, 0],
        [100, 0, 80, 80, 0, 0, 0],
        [0, 100, 80, 80, 0, 0, 0]
    ],
    "animations": {
        "rock1": [0],
        "rock2": [1],
        "rock3": [2],
    },
};
var worldSheet;
var worldData = {
    "images": [
        "../../Assets/images/world/atlas.png"
    ],
    "frames": [
        [0, 0, 1920, 480, 0, 0, 0],
    ],
    "animations": {
        "background": [0],
    },
};
var coinSheet;
var coinData = {
    "images": [
        "../../Assets/images/coins/atlas.png"
    ],
    "frames": [
        [0, 0, 40, 40, 0, 0, 0],
        [40, 0, 40, 40, 0, 0, 0],
        [80, 0, 40, 40, 0, 0, 0],
        [0, 40, 40, 40, 0, 0, 0],
        [40, 40, 40, 40, 0, 0, 0],
    ],
    "animations": {
        "gold": [0],
        "goldsilver": [1],
        "silver": [2],
        "bronze": [3],
        "blue": [4],
    },
};
var uiSheet;
var uiData = {
    "images": [
        "../../Assets/images/ui/atlas.png"
    ],
    "frames": [
        [0, 0, 190, 49, 0, 0, 0],
        [0, 49, 190, 49, 0, 0, 0],
        [0, 98, 190, 49, 0, 0, 0],
    ],
    "animations": {
        "play": [0],
        "restart": [1],
        "menu": [2],
    },
};
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    playerSheet = new createjs.SpriteSheet(playerData);
    enemySheet = new createjs.SpriteSheet(enemyData);
    worldSheet = new createjs.SpriteSheet(worldData);
    coinSheet = new createjs.SpriteSheet(coinData);
    uiSheet = new createjs.SpriteSheet(uiData);
    init();
}
function init() {
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting
    state = config.MENU_STATE;
    changeState(state);
    //createjs.Sound.play("bg", null, 0, 0, -1, 0.05, 0);
}
// Main Game Loop
function gameLoop(event) {
    stats.begin(); // start counting
    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame
    stats.end(); // stop counting
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// state machine prep
function changeState(state) {
    // Launch various scenes
    switch (state) {
        case config.MENU_STATE:
            // show the menu scene
            stage.removeAllChildren();
            menu = new states.Menu();
            currentState = menu;
            break;
        case config.PLAY_STATE:
            // show the play scene
            stage.removeAllChildren();
            game = new states.Game();
            currentState = game;
            break;
        case config.OVER_STATE:
            // show the game over scene
            stage.removeAllChildren();
            over = new states.Over();
            currentState = over;
            break;
    }
    currentState.start();
    console.log(currentState.numChildren);
}
//# sourceMappingURL=game.js.map