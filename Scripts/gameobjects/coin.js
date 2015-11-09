var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gameobject;
(function (gameobject) {
    var Coin = (function (_super) {
        __extends(Coin, _super);
        function Coin(sheet, tile) {
            _super.call(this, sheet, tile);
            this.moveSpeed = 5;
            this.alive = true;
            this.aliveTimer = 400;
            this.timer = 0;
            this.regX = 20;
            this.regY = 20;
        }
        Coin.prototype.reset = function () {
            this.x = 700;
            this.y = Math.random() * 480 + 1;
            if (this.y < 40) {
                this.y = 40;
            }
            else if (this.y > 440) {
                this.y = 440;
            }
        };
        Coin.prototype.setAlive = function (al) {
            this.alive = al;
            this.x = -100;
            this.y = -100;
        };
        Coin.prototype.update = function () {
            if (this.alive == true) {
                this.x -= this.moveSpeed;
                this.rotation += 0.5;
                if (this.x < -50) {
                    this.reset();
                }
            }
            else if (this.alive == false) {
                console.log("coin dead");
                this.timer += 1;
                if (this.timer > this.aliveTimer) {
                    this.reset();
                    this.alive = true;
                    this.timer = 0;
                }
            }
        };
        return Coin;
    })(createjs.Sprite);
    gameobject.Coin = Coin;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=coin.js.map