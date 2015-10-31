module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;

        private world: createjs.Container;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("game state started");
            this.world = new createjs.Container();
            for (var i = 0; i < this.floor.length; i++)
            {
                if (this.floor[i] != "n")
                {
                    var tmp = this.getWorldPiece(this.floor[i]);
                    tmp.x = (i % 51) * 70;
                    tmp.y = this.startingY;
                    this.world.addChild(tmp);
                }
                else
                {
                    console.log("moving y up");
                    this.startingY -= this.tileSize;
                    console.log("startingY now: " + this.startingY);
                }
            }
            this.addChild(this.world);
            
            stage.addChild(this);
        }


        public update(): void {
            
        }
        
        private getWorldPiece(val:string):createjs.Sprite {
            
            if (val == ".")
            {
                console.log("Returning one");
                return new createjs.Sprite(worldSheet, "grassMid");
            } 
            else if (val == "a")
            {
                console.log("returing full ground");
                return new createjs.Sprite(worldSheet, "grassCenter");
            }
        }
    }


} 