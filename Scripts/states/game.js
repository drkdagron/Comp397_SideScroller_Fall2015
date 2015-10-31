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
        // PRIVATE INSTANCE VARIABLES
        // CONSTRUCTOR
        function Game() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Game.prototype.start = function () {
            console.log("game state started");
            stage.addChild(this);
        };
        Game.prototype.update = function () {
        };
        return Game;
    })(objects.Scene);
    states.Game = Game;
})(states || (states = {}));
//# sourceMappingURL=game.js.map