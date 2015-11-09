module gameobject {
	export class Coin extends createjs.Sprite {
		
		private scoreVal:number;
		
		private moveSpeed: number = 5;
		
		private alive: boolean = true;
		private aliveTimer: number = 400;
		private timer: number = 0;
		
		constructor(sheet:createjs.SpriteSheet, tile:string)
		{
			super(sheet, tile);
			this.regX = 20;
			this.regY = 20;
		}
		
		private reset()
		{
			this.x = 700;
			this.y = Math.random() * 480 + 1;
			if (this.y < 40)
			{
				this.y = 40;
			}
			else if (this.y > 440)
			{
				this.y = 440;
			}
		}
		
		public setAlive(al:boolean):void
		{
			this.alive = al;
			this.x = -100;
			this.y = -100;
		}
		
		public update()
		{
			if (this.alive == true)
			{
				this.x -= this.moveSpeed;
				this.rotation += 0.5;
				
				if (this.x < -50)
				{
					this.reset();
				}
			}
			else if (this.alive == false)
			{
				console.log("coin dead");
				this.timer += 1;
				if (this.timer > this.aliveTimer)
				{
					this.reset();
					this.alive = true;
					this.timer = 0;
				}
			}
		}
	}
}