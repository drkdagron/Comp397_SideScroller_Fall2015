module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

        private title: objects.Label;
        private howTo: objects.Label;

        private background: gameobject.World;
        
        private play: gameobject.UiButton;

        // CONSTRUCTOR
        constructor() {
            super();
        }

        // PUBLIC METHODS
        public start(): void {
            console.log("menu state started");
            
            this.background = new gameobject.World(worldSheet, "background");
            this.addChild(this.background);
            
            this.title = new objects.Label("Off-Roader XTREME!" , "40px Consolas", "#333", 320, 80);
            this.addChild(this.title);
            
            this.howTo = new objects.Label("Use the mouse to guide the car \n\n" + 
                                            "through the rocky route! \n\n\n\n" +
                                            "Collect coins for points!",
                                             "24px Consolas",
                                            "#333", 320, 220);
            this.addChild(this.howTo);
            
            this.play = new gameobject.UiButton(uiSheet, "play", 320, 360);
            this.play.on("click", this.startGame, this);
            this.addChild(this.play);
            
            stage.addChild(this);
        }

        private startGame() : void 
        {
            changeState(config.PLAY_STATE);
        }

        public update(): void {
            this.background.update();
        }
    }


}