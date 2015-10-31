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
            stage.addChild(this);
        };
        Game.prototype.update = function () {
        };
        Game.prototype.getWorldPiece = function (val) {
            if (val == ".") {
                console.log("Returning one");
                return new createjs.Sprite(worldSheet, "grassMid");
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