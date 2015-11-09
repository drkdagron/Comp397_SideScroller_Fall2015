var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(sheet, frame) {
            _super.call(this, sheet, frame);
            this.defaultTurnRate = 3.5;
            this.lives = 3;
            this.score = 0;
            this.setBounds(0, 0, 37, 70);
            this.regX = 37 / 2;
            this.regY = 70 / 2;
        }
        Player.prototype.faceMouse = function () {
            var x = stage.mouseX;
            var y = stage.mouseY;
            var edgeX = x - this.x;
            var edgeY = y - this.y;
            var rotateValue = (Math.atan2(edgeY, edgeX) * (180 / Math.PI)) + 90;
            if (x > this.x) {
                var ratio = 90;
                var turn = rotateValue;
                if (turn > ratio) {
                    turn -= ratio;
                }
                else {
                    turn = -(-ratio + turn);
                }
                turn /= 30;
                //console.log("TURN RATIO: " + turn);
                this.moveCar(turn);
                if (rotateValue < 60) {
                    rotateValue = 60;
                }
                else if (rotateValue > 120) {
                    rotateValue = 120;
                }
                if (rotateValue < 0) {
                    rotateValue = 0 + 90;
                }
                this.rotation = rotateValue;
            }
            else {
                this.rotation = 90;
            }
        };
        Player.prototype.moveCar = function (turnRate) {
            if (stage.mouseY > this.y) {
                this.y += this.defaultTurnRate * turnRate;
            }
            if (stage.mouseY < this.y) {
                this.y -= this.defaultTurnRate * turnRate;
            }
        };
        Player.prototype.addScore = function (add) {
            this.score += add;
        };
        Player.prototype.setScore = function (num) {
            this.score = num;
        };
        Player.prototype.getScore = function () {
            return this.score;
        };
        Player.prototype.playerHit = function () {
            this.lives--;
        };
        Player.prototype.getLives = function () {
            return this.lives;
        };
        Player.prototype.update = function () {
            this.faceMouse();
        };
        Player.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        return Player;
    })(createjs.Sprite);
    gameobject.Player = Player;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=player.js.map