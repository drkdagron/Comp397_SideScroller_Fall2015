module gameobject
{
	export class Player extends createjs.Sprite{
		
		private grounded:boolean;
		private jump:boolean;
		
		private speed:number;
		private moveLeft:boolean = false;
		private moveRight:boolean = false;
		
		constructor(sheet:createjs.SpriteSheet, frame:string)
		{
			super(sheet, frame);	
			this.setBounds(0,0,66, 92);
			
			window.onkeydown = this.onkeyboardpress;
			window.onkeyup = this.onkeyboardrelease;
		}
		
		private onkeyboardpress(event:KeyboardEvent)
		{
			if (event.keyCode == 37)
			{
				this.moveLeft = true;
				console.log(this.moveLeft);
			}
			else if (event.keyCode == 39)
			{	
				this.moveRight = true;
				console.log(this.moveRight);
			}
		}
		private onkeyboardrelease(event:KeyboardEvent)
		{
			if (event.keyCode == 37)
			{
				this.moveLeft = false;
				console.log(this.moveLeft);
			}
			if (event.keyCode == 39)
			{
				this.moveRight = false;
				console.log(this.moveRight);
			}
		}
		
		public update(worldTiles)
		{
			if (this.moveLeft == true)
			{
				this.x += -1;
			}
			if (this.moveRight == true)
			{
				this.x += 1;
			}
				
			this.y += 4;
			//this.x += 1;
			this.playerWorldCollisionCheck(worldTiles);
			
			
			
			//if (this.moveX != 0)
			//	this.x += this.moveX * this.speed;
		}
		
		public move()
		{
			var xMove = 0;
			if (this.moveLeft)
				xMove = -1;
			if (this.moveRight)
				xMove = 1;
			xMove * 10;
			var newX = this.x + xMove;
			
			this.setPosition(newX, this.y);
		}
		
		public setPosition(x:number, y:number)
		{
			this.x = x;
			this.y = y;
		}
		
		private playerWorldCollisionCheck(world): void {
            
            for (var l = 0; l < world.getNumChildren(); l++)
            {
                if (world.getChildAt(l).name == "collision")
                {
                    var x: number = this.x + this.getBounds().x / 2 - world.getChildAt(l).x + world.getChildAt(l).getBounds().x;
                    var y: number = this.y + this.getBounds().y / 2 - world.getChildAt(l).y + world.getChildAt(l).getBounds().y;
                    
                    if (Math.sqrt(x * x + y * y) < 150)
                    {
                        //console.log("colliding with: " + l);
                        if (this.y + 92 > world.getChildAt(l).y)
                        {
                            this.y = world.getChildAt(l).y - 92;
                            //this.grounded = true;
                        }
                    }
                }
            }
        }
	}
}