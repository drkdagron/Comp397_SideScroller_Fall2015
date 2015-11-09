var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // GAME CLASS
    var Game = (function (_super) {
        __extends(Game, _super);
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
            // PRIVATE INSTANCE VARIABLES
            this.floor = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
            this.tileSize = 70;
            this.startingY = canvas.clientHeight - 55;
            this.rock = [];
            this.coin = [];
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
            this.player = new gameobject.Player(playerSheet, "car");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
            for (var i = 0; i < 7; i++) {
                var name;
                if (i % 3 == 0) {
                    name = "rock1";
                }
                else if (i % 3 == 1) {
                    name = "rock2";
                }
                else if (i % 3 == 2) {
                    name = "rock3";
                }
                //screen is 640 wide so i want to spread out the tiles at even intervals
                this.rock[i] = new gameobject.Rock(enemySheet, name, 640 + ((640 / 7) * i));
                this.addChild(this.rock[i]);
            }
            for (var i = 0; i < 3; i++) {
                this.coin[i] = new gameobject.Coin(coinSheet, "gold");
                this.coin[i].x = 700 + ((640 / 3) * i);
                this.addChild(this.coin[i]);
            }
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 120, 20);
            this.addChild(this.lives);
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 500, 20);
            this.addChild(this.score);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            this.player.update();
            this.world.update();
            for (var rock = 0; rock < 7; rock++) {
                this.rock[rock].update();
                if (this.checkRockCollision(this.rock[rock], this.player)) {
                    this.player.playerHit();
                    this.lives.text = "Lives: " + this.player.getLives();
                    this.rock[rock].reset();
                }
            }
            for (var coin = 0; coin < 3; coin++) {
                this.coin[coin].update();
                if (this.checkCoinCollision(this.coin[coin], this.player)) {
                    this.player.addScore(100);
                    this.score.text = "Score: " + this.player.getScore();
                    this.coin[coin].setAlive(false);
                }
            }
        };
        Game.prototype.checkCoinCollision = function (c, p) {
            var x = c.x - p.x;
            var y = c.y - p.y;
            var num = Math.sqrt(x * x + y * y);
            if (num < 50) {
                return true;
            }
            else {
                return false;
            }
        };
        Game.prototype.checkRockCollision = function (r, p) {
            var x = r.x - p.x;
            var y = r.y - p.y;
            var num = Math.sqrt(x * x + y * y);
            if (num < 68) {
                return true;
            }
            else {
                return false;
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map