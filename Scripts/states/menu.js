var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.play = new gameobject.UiButton(uiSheet, "play", 320, 360);
            this.addChild(this.play);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
            this.background.update();
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map