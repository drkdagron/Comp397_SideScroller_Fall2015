module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        private world: createjs.Container;

        private player:createjs.Sprite;
        //private playerMove:boolean;

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
            
            this.player = new createjs.Sprite(playerSheet, "p1_front");
            this.player.name = "player";
            this.player.x = 50;
            this.player.y = 240;
            this.player.setBounds(0,0,66, 92);
            this.addChild(this.player);
            
            stage.addChild(this);
        }


        public update(): void {
            //if (playerMove)
            //{
            this.player.y += 4;
            this.playerWorldCollisionCheck();
           // }
        }
                
             
        private playerWorldCollisionCheck(): void {
            
            for (var l = 0; l < this.world.getNumChildren(); l++)
            {
                if (this.world.getChildAt(l).name == "collision")
                {
                    //find player x, and y centered and the tile centered and check if its at a certain range 
                    if (this.player.y + 92 > this.world.getChildAt(l).y)
                    {
                        console.log("collision on y, fixing");
                        this.player.y = this.world.getChildAt(l).y - 92;
                    }
                }
            }
        }
        
        private getWorldPiece(val:string):createjs.Sprite {
            
            if (val == ".")
            {
                console.log("Returning one");
                var tmp: createjs.Sprite = new createjs.Sprite(worldSheet, "grassMid");
                tmp.name = "collision";
                return tmp;
            } 
            else if (val == "a")
            {
                console.log("returing full ground");
                return new createjs.Sprite(worldSheet, "grassCenter");
            }
        }
    }


} 