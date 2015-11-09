var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            console.log("menu state started");
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            this.title = new objects.Label("Off-Roader XTREME!", "40px Consolas", "#333", 320, 80);
            this.addChild(this.title);
            this.howTo = new objects.Label("Use the mouse to guide the car \n\n" +
                "through the rocky route! \n\n\n\n" +
                "Collect coins for points!", "24px Consolas", "#333", 320, 220);
            this.addChild(this.howTo);
            this.play = new gameobject.UiButton(uiSheet, "play", 320, 360);
            this.play.on("click", this.startGame, this);
            this.addChild(this.play);
            stage.addChild(this);
        };
        Menu.prototype.startGame = function () {
            changeState(config.PLAY_STATE);
        };
        Menu.prototype.update = function () {
            this.background.update();
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map