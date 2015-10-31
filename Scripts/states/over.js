var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // OVER CLASS
    var Over = (function (_super) {
        __extends(Over, _super);
        // PRIVATE INSTANCE VARIABLES
        // CONSTRUCTOR
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Over.prototype.start = function () {
            console.log("over state started");
            stage.addChild(this);
        };
        Over.prototype.update = function () {
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map