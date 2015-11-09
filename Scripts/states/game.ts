module states {
    // GAME CLASS
    export class Game extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private floor:string = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaan..................................................";
        private tileSize: number = 70;
        private startingY: number = canvas.clientHeight - 55;
        
        private world:gameobject.World;
        private player:gameobject.Player;
        
        private rock: gameobject.Rock[] = [];
        private coin: gameobject.Coin[] = [];
        
        private lives: objects.Label;
        private score: objects.Label;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("game state started");
            
            this.world = new gameobject.World(worldSheet, "background");
            this.addChild(this.world);
             
            this.player = new gameobject.Player(playerSheet, "car");
            this.player.setPosition(75, 240);
            this.addChild(this.player);
            
            for (var i =0; i < 7; i++)
            {
                var name:string;
                if (i % 3 == 0)
                {
                    name = "rock1";
                }
                else if ( i % 3 == 1)
                {
                    name = "rock2";
                }
                else if ( i % 3 == 2)
                {
                    name = "rock3";
                }
                //screen is 640 wide so i want to spread out the tiles at even intervals
                this.rock[i] = new gameobject.Rock(enemySheet, name, 640 + ((640 / 7) * i));
                this.addChild(this.rock[i]);
            }
            
            for (var i = 0; i < 3; i++)
            {
                this.coin[i] = new gameobject.Coin(coinSheet, "gold");
                this.coin[i].x = 700 + ((640 / 3) * i);
                this.addChild(this.coin[i]);
            }
            
            this.lives = new objects.Label("Lives: " + this.player.getLives(), "30px Consolas", "#FFF", 120, 20);
            this.addChild(this.lives);
            
            this.score = new objects.Label("Score: " + this.player.getScore(), "30px Consolas", "#FFF", 500, 20);
            this.addChild(this.score);
            
            stage.addChild(this);
        }

        public update(): void {
            this.player.update();
            this.world.update();
            for (var rock = 0; rock < 7; rock++)
            {
                this.rock[rock].update();
                
                if (this.checkRockCollision(this.rock[rock], this.player))
                {
                    this.player.playerHit();
                    this.lives.text = "Lives: " + this.player.getLives();
                    this.rock[rock].reset();
                    if (this.player.getLives() == 0)
                    {
                        score = this.player.getScore();
                        changeState(config.OVER_STATE);
                    }
                }
            }
            for (var coin = 0; coin < 3; coin++)
            {
                this.coin[coin].update();
                if (this.checkCoinCollision(this.coin[coin], this.player))
                {
                    this.player.addScore(100);
                    this.score.text = "Score: " + this.player.getScore();
                    this.coin[coin].setAlive(false);
                }
            }
        }
        
        private checkCoinCollision(c:gameobject.Coin, p:gameobject.Player) : boolean{
            var x:number = c.x - p.x;
            var y:number = c.y - p.y;
            
            var num:number = Math.sqrt(x*x+y*y);
            if (num < 50)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        
        private checkRockCollision(r:gameobject.Rock, p:gameobject.Player) : boolean
        {
            var x:number = r.x - p.x;
            var y:number = r.y - p.y;
            
            var num:number = Math.sqrt(x * x + y * y);
            
            if (num < 68)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
} 