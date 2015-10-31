module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        private world: createjs.Container;

        private player:createjs.Sprite;

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
            this.addChild(this.player);
            
            stage.addChild(this);
        }


        public update(): void {
            //this.player.y += 9.8;
            this.player.y += this.playerWorldCollisionCheck();
        }
        
        private colliding(s1:createjs.Sprite, s2) : number
        {
            if (s1.x < s2.x + s2.getBounds().width && s1.x > s2.x)
                console.log("collision on projected X axis");
            if (s1.x + s1.getBounds().x < s2.x + s2.getBounds().width && s1.x + s1.getBounds().x > s2.x)
                console.log("collision on projected X axis");
                                        
            return 0;
        }
        
        private playerWorldCollisionCheck(): number {
            
            for (var l = 0; l < this.world.getNumChildren(); l++)
            {
                if (this.world.getChildAt(l).name == "collision")
                {
                    var x:number = this.world.getChildAt(l).x - this.player.x;
                    var y:number = this.world.getChildAt(l).y - this.player.y;
                    if (Math.sqrt(x * x + y * y) < 400)
                    {
                        console.log("collision check with: " + l);
                        console.log(this.colliding(this.player, this.world.getChildAt(l)));
                    }
                }
            }
            
            return 0;
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