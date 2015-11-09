module states {
    // MENU CLASS
    export class Menu extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES

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
            
            this.play = new gameobject.UiButton(uiSheet, "play", 320, 360);
            this.addChild(this.play);
            
            stage.addChild(this);
        }


        public update(): void {
            this.background.update();
        }
    }


}