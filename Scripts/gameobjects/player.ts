module gameobject
{
	export class Player extends createjs.Sprite{	
		private speed:number;
		private defaultTurnRate:number = 3.5;
		private lives: number = 3;
		
		private score:number = 0;
		
		constructor(sheet:createjs.SpriteSheet, frame:string)
		{
			super(sheet, frame);	
			this.setBounds(0,0,37, 70);
			this.regX = 37 /2;
			this.regY = 70 / 2;
		}
		
		private faceMouse()
		{
			var x: number = stage.mouseX;
			var y: number = stage.mouseY;
			
			var edgeX = x - this.x;
			var edgeY = y - this.y;
			
			var rotateValue = (Math.atan2(edgeY, edgeX) * (180/Math.PI)) + 90;
			
			if (x > this.x)
			{
				var ratio = 90;
				var turn = rotateValue;
				if (turn > ratio)
				{
					turn -= ratio;
				}
				else
				{
					turn = -(-ratio + turn);
				}
				turn /= 30;
				//console.log("TURN RATIO: " + turn);
				
				this.moveCar(turn);
				
				if (rotateValue < 60)
				{
					rotateValue = 60;
				}
				else if (rotateValue > 120)
				{
					rotateValue = 120;
				}
				
				if (rotateValue < 0)
				{
					rotateValue = 0 + 90;	
				}
				
				this.rotation = rotateValue;
			}
			else
			{
				this.rotation = 90;
			}
		}
		
		private moveCar(turnRate)
		{
			if (stage.mouseY > this.y)
			{
				this.y += this.defaultTurnRate * turnRate;
			}
			if (stage.mouseY < this.y)
			{
				this.y -= this.defaultTurnRate * turnRate;
			}
		}
		
		public addScore(add:number) : void
		{
			this.score += add;
		}
		
		public setScore(num:number) : void
		{
			this.score = num;
		}
		
		public getScore(): number
		{
			return this.score;
		}
		
		public playerHit(): void
		{
			this.lives--;
		}
		
		public getLives():number
		{
			return this.lives;
		}
		
		public update()
		{				
			this.faceMouse();
		}
		
		public setPosition(x:number, y:number)
		{
			this.x = x;
			this.y = y;
		}
	}
}