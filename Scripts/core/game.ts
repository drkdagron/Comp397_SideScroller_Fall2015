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


// GLOBAL GAME FRAMEWORK VARIABLES
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var state: number;
var currentState: objects.Scene; // alias for our current state

// GAME OBJECTS
var menu: states.Menu;
var game: states.Game;
var over: states.Over;

// manifest of all our assets
var manifest = [
    //{ id: "BackButton", src: "../../Assets/images/BackButton.png" },
    //{ id: "NextButton", src: "../../Assets/images/NextButton.png" },
    //{ id: "StartButton", src: "../../Assets/images/StartButton.png" },
];

var playerSheet: createjs.SpriteSheet;
var playerData = {

"images": [
    "../../Assets/images/player/atlas.png"
],

"frames": [
    [2, 2, 67, 94, 0, 0, 0],
    [71, 2, 71, 93, 0, 0, -2],
    [144, 2, 70, 93, 0, 0, -4],
    [216, 2, 67, 93, 0, -3, -4],
    [285, 2, 66, 93, 0, -5, -1],
    [353, 2, 72, 92, 0, 0, -1],
    [427, 2, 71, 92, 0, -1, 0],
    [500, 2, 70, 92, 0, 0, -4],
    [572, 2, 69, 92, 0, 0, 0],
    [643, 2, 66, 92, 0, 0, 0],
    [711, 2, 66, 92, 0, 0, 0],
    [779, 2, 66, 92, 0, -6, -1],
    [847, 2, 66, 92, 0, -3, -5],
    [915, 2, 66, 92, 0, -3, -5],
    [983, 2, 66, 92, 0, -4, -3],
    [1051, 2, 69, 71, 0, 0, 0]
],

"animations": {
    "p1_jump": [0],
    "p1_walk05": [1],
    "p1_walk07": [2],
    "p1_walk10": [3],
    "p1_walk01": [4],
    "p1_walk04": [5],
    "p1_walk03": [6],
    "p1_walk06": [7],
    "p1_hurt": [8],
    "p1_front": [9],
    "p1_stand": [10],
    "p1_walk02": [11],
    "p1_walk08": [12],
    "p1_walk09": [13],
    "p1_walk11": [14],
    "p1_duck": [15]
},
};


var enemySheet: createjs.SpriteSheet;
var enemyData = {

"images": [
    "../../Assets/images/enemies/atlas.png"
],

"frames": [
    [2, 2, 75, 31, 0, 0, 0],
    [79, 2, 44, 30, 0, 0, 0],
    [79, 34, 44, 30, 0, 0, 0],
    [2, 35, 72, 36, 0, 0, 0],
    [76, 66, 50, 28, 0, 0, 0],
    [2, 73, 66, 42, 0, 0, 0],
    [70, 96, 54, 31, 0, 0, 0],
    [2, 117, 66, 42, 0, 0, 0],
    [70, 129, 51, 51, 0, 0, 0],
    [2, 161, 62, 43, 0, 0, 0],
    [66, 182, 59, 33, 0, 0, 0],
    [2, 206, 59, 12, 0, 0, 0],
    [63, 217, 57, 31, 0, 0, 0],
    [2, 220, 51, 51, 0, 0, 0],
    [55, 250, 51, 51, 0, 0, 0],
    [2, 303, 48, 146, 0, 0, 0],
    [2, 273, 51, 26, 0, 0, 0],
    [52, 303, 48, 146, 0, 0, 0]
],

"animations": {
    "flyFly2": [0],
    "snailShell": [1],
    "snailShell_upsidedown": [2],
    "flyFly1": [3],
    "slimeWalk1": [4],
    "fishDead": [5],
    "snailWalk1": [6],
    "fishSwim1": [7],
    "blockerBody": [8],
    "fishSwim2": [9],
    "flyDead": [10],
    "slimeDead": [11],
    "snailWalk2": [12],
    "blockerMad": [13],
    "blockerSad": [14],
    "pokerMad": [15],
    "slimeWalk2": [16],
    "pokerSad": [17]
},
};

var worldSheet: createjs.SpriteSheet;
var worldData = {

"images": [
    "../../Assets/images/world/atlas.png"
],

"frames": [
    [2, 2, 48, 146, 0, 0, 0],
    [52, 2, 48, 146, 0, 0, 0],
    [102, 2, 48, 106, 0, 0, 0],
    [102, 110, 70, 25, 0, 0, -45],
    [152, 2, 48, 106, 0, 0, 0],
    [174, 110, 70, 20, 0, 0, -50],
    [202, 2, 70, 70, 0, 0, 0],
    [202, 74, 5, 24, 0, 0, 0],
    [209, 74, 5, 24, 0, 0, 0],
    [246, 74, 70, 70, 0, 0, 0],
    [274, 2, 70, 70, 0, 0, 0],
    [318, 74, 70, 70, 0, 0, 0],
    [346, 2, 70, 70, 0, 0, 0],
    [390, 74, 70, 70, 0, 0, 0],
    [418, 2, 70, 70, 0, 0, 0],
    [462, 74, 70, 70, 0, 0, 0],
    [490, 2, 70, 70, 0, 0, 0],
    [534, 74, 70, 70, 0, 0, 0],
    [562, 2, 70, 70, 0, 0, 0],
    [606, 74, 70, 70, 0, 0, 0],
    [634, 2, 70, 70, 0, 0, 0],
    [678, 74, 70, 70, 0, 0, 0],
    [706, 2, 70, 70, 0, 0, 0],
    [750, 74, 70, 70, 0, 0, 0],
    [778, 2, 70, 70, 0, 0, 0],
    [822, 74, 70, 70, 0, 0, 0],
    [850, 2, 70, 70, 0, 0, 0],
    [894, 74, 70, 70, 0, 0, 0],
    [922, 2, 70, 70, 0, 0, 0],
    [966, 74, 70, 70, 0, 0, 0],
    [994, 2, 70, 70, 0, 0, 0],
    [1038, 74, 70, 70, 0, 0, 0],
    [1066, 2, 70, 70, 0, 0, 0],
    [1110, 74, 70, 70, 0, 0, 0],
    [1138, 2, 70, 70, 0, 0, 0],
    [1182, 74, 70, 70, 0, 0, 0],
    [1210, 2, 70, 70, 0, 0, 0],
    [1254, 74, 70, 70, 0, 0, 0],
    [1282, 2, 70, 70, 0, 0, 0],
    [1326, 74, 70, 70, 0, 0, 0],
    [1354, 2, 70, 70, 0, 0, 0],
    [1398, 74, 70, 70, 0, 0, 0],
    [1426, 2, 70, 70, 0, 0, 0],
    [1470, 74, 70, 70, 0, 0, 0],
    [1498, 2, 70, 70, 0, 0, 0],
    [1542, 74, 70, 70, 0, 0, 0],
    [1570, 2, 70, 70, 0, 0, 0],
    [1614, 74, 70, 61, 0, 0, -9],
    [1642, 2, 70, 45, 0, 0, -25],
    [1686, 49, 70, 45, 0, 0, -25],
    [1714, 2, 70, 40, 0, 0, -30],
    [1686, 96, 70, 40, 0, 0, -30],
    [1758, 44, 70, 40, 0, 0, 0],
    [1786, 2, 70, 40, 0, 0, 0],
    [1758, 86, 70, 40, 0, 0, 0],
    [1830, 44, 70, 40, 0, 0, 0],
    [1902, 2, 28, 67, 0, -21, -1],
    [1902, 71, 28, 67, 0, -20, -1],
    [1830, 86, 28, 50, 0, -21, -18]
],

"animations": {
    "hill_large": [0],
    "hill_largeAlt": [1],
    "hill_small": [2],
    "bridgeLogs": [3],
    "hill_smallAlt": [4],
    "bridge": [5],
    "box": [6],
    "grassLedgeLeft": [7],
    "grassLedgeRight": [8],
    "boxAlt": [9],
    "boxCoin": [10],
    "boxCoinAlt": [11],
    "boxCoinAlt_disabled": [12],
    "boxCoin_disabled": [13],
    "boxEmpty": [14],
    "boxExplosive": [15],
    "boxExplosiveAlt": [16],
    "boxExplosive_disabled": [17],
    "boxItem": [18],
    "boxItemAlt": [19],
    "boxItemAlt_disabled": [20],
    "boxItem_disabled": [21],
    "boxWarning": [22],
    "brickWall": [23],
    "door_closedMid": [24],
    "door_openMid": [25],
    "grass": [26],
    "grassCenter": [27],
    "grassCenter_rounded": [28],
    "grassCliffLeft": [29],
    "grassCliffLeftAlt": [30],
    "grassCliffRight": [31],
    "grassCliffRightAlt": [32],
    "grassHillLeft": [33],
    "grassHillLeft2": [34],
    "grassHillRight": [35],
    "grassHillRight2": [36],
    "grassLeft": [37],
    "grassMid": [38],
    "grassRight": [39],
    "ladder_mid": [40],
    "ladder_top": [41],
    "liquidWater": [42],
    "lock_blue": [43],
    "lock_green": [44],
    "lock_red": [45],
    "lock_yellow": [46],
    "fence": [47],
    "liquidWaterTop": [48],
    "liquidWaterTop_mid": [49],
    "door_closedTop": [50],
    "door_openTop": [51],
    "grassHalf": [52],
    "grassHalfLeft": [53],
    "grassHalfMid": [54],
    "grassHalfRight": [55],
    "tochLit": [56],
    "tochLit2": [57],
    "torch": [58]
},
};

//function preload(): void {
//    assets = new createjs.LoadQueue();
//    assets.installPlugin(createjs.Sound);
//    assets.on("complete", init, this);
//    assets.loadManifest(manifest);
    
//}

function init():void {
    playerSheet = new createjs.SpriteSheet(playerData);
    enemySheet = new createjs.SpriteSheet(enemyData);
    worldSheet = new createjs.SpriteSheet(worldData);
    
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage
    stage.enableMouseOver(20); // enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 fps
    createjs.Ticker.on("tick", gameLoop); // update gameLoop every frame
    setupStats(); // sets up our stats counting

    state = config.PLAY_STATE;
    changeState(state);

}

// Main Game Loop
function gameLoop(event: createjs.Event): void {
    stats.begin(); // start counting


    currentState.update(); // calling State's update method
    stage.update(); // redraw/refresh stage every frame

    stats.end(); // stop counting
}

// Setup Game Stats
function setupStats():void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}





// state machine prep
function changeState(state): void {
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
 