var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameobject;
(function (gameobject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(sheet, frame) {
            _super.call(this, sheet, frame);
            this.moveLeft = false;
            this.moveRight = false;
            this.setBounds(0, 0, 66, 92);
            window.onkeydown = this.onkeyboardpress;
            window.onkeyup = this.onkeyboardrelease;
        }
        Player.prototype.onkeyboardpress = function (event) {
            if (event.keyCode == 37) {
                this.moveLeft = true;
                console.log(this.moveLeft);
            }
            else if (event.keyCode == 39) {
                this.moveRight = true;
                console.log(this.moveRight);
            }
        };
        Player.prototype.onkeyboardrelease = function (event) {
            if (event.keyCode == 37) {
                this.moveLeft = false;
                console.log(this.moveLeft);
            }
            if (event.keyCode == 39) {
                this.moveRight = false;
                console.log(this.moveRight);
            }
        };
        Player.prototype.update = function (worldTiles) {
            if (this.moveLeft == true) {
                this.x += -1;
            }
            if (this.moveRight == true) {
                this.x += 1;
            }
            this.y += 4;
            //this.x += 1;
            this.playerWorldCollisionCheck(worldTiles);
            //if (this.moveX != 0)
            //	this.x += this.moveX * this.speed;
        };
        Player.prototype.move = function () {
            var xMove = 0;
            if (this.moveLeft)
                xMove = -1;
            if (this.moveRight)
                xMove = 1;
            xMove * 10;
            var newX = this.x + xMove;
            this.setPosition(newX, this.y);
        };
        Player.prototype.setPosition = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Player.prototype.playerWorldCollisionCheck = function (world) {
            for (var l = 0; l < world.getNumChildren(); l++) {
                if (world.getChildAt(l).name == "collision") {
                    var x = this.x + this.getBounds().x / 2 - world.getChildAt(l).x + world.getChildAt(l).getBounds().x;
                    var y = this.y + this.getBounds().y / 2 - world.getChildAt(l).y + world.getChildAt(l).getBounds().y;
                    if (Math.sqrt(x * x + y * y) < 150) {
                        //console.log("colliding with: " + l);
                        if (this.y + 92 > world.getChildAt(l).y) {
                            this.y = world.getChildAt(l).y - 92;
                        }
                    }
                }
            }
        };
        return Player;
    })(createjs.Sprite);
    gameobject.Player = Player;
})(gameobject || (gameobject = {}));
//# sourceMappingURL=player.js.map