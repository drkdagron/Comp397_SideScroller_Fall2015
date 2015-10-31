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
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            this.world = new createjs.Container();
            for (var i = 0; i < this.floor.length; i++) {
                if (this.floor[i] != "n") {
                    var tmp = this.getWorldPiece(this.floor[i]);
                    tmp.x = (i % 51) * 70;
                    tmp.y = this.startingY;
                    this.world.addChild(tmp);
                }
                else {
                    console.log("moving y up");
                    this.startingY -= this.tileSize;
                    console.log("startingY now: " + this.startingY);
                }
            }
            this.addChild(this.world);
            this.player = new createjs.Sprite(playerSheet, "p1_front");
            this.player.name = "player";
            this.player.x = 50;
            this.player.y = 240;
            this.addChild(this.player);
            stage.addChild(this);
        };
        Game.prototype.update = function () {
            //this.player.y += 9.8;
            this.player.y += this.playerWorldCollisionCheck();
        };
        Game.prototype.colliding = function (s1, s2) {
            if (s1.x < s2.x + s2.getBounds().width && s1.x > s2.x)
                console.log("collision on projected X axis");
            if (s1.x + s1.getBounds().x < s2.x + s2.getBounds().width && s1.x + s1.getBounds().x > s2.x)
                console.log("collision on projected X axis");
            return 0;
        };
        Game.prototype.playerWorldCollisionCheck = function () {
            for (var l = 0; l < this.world.getNumChildren(); l++) {
                if (this.world.getChildAt(l).name == "collision") {
                    var x = this.world.getChildAt(l).x - this.player.x;
                    var y = this.world.getChildAt(l).y - this.player.y;
                    if (Math.sqrt(x * x + y * y) < 400) {
                        console.log("collision check with: " + l);
                        console.log(this.colliding(this.player, this.world.getChildAt(l)));
                    }
                }
            }
            return 0;
        };
        Game.prototype.getWorldPiece = function (val) {
            if (val == ".") {
                console.log("Returning one");
                var tmp = new createjs.Sprite(worldSheet, "grassMid");
                tmp.name = "collision";
                return tmp;
            }
            else if (val == "a") {
                console.log("returing full ground");
                return new createjs.Sprite(worldSheet, "grassCenter");
            }
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map