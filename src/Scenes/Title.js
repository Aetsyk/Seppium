class Title extends Phaser.Scene {
    constructor() {
        super("titleScreen");

        this.my = {sprite: {}, text: {}};
    }

    preload() {}

    create() {
        let my = this.my;

        my.text.title = this.add.bitmapText(480, 240, "mainFont", "SEPPIUM", 48).setOrigin(0.5, 0);

        my.text.start = this.add.bitmapText(240, 480, "mainFont", "Z_-_START", 48).setOrigin(0);
        my.text.tutorial = this.add.bitmapText(240, 528, "mainFont", "X_-_TUTORIAL", 48).setOrigin(0);
        my.text.credits = this.add.bitmapText(240, 576, "mainFont", "C_-_CREDITS", 48).setOrigin(0);

        // key input
        keyZ = this.input.keyboard.addKey('Z');
        keyX = this.input.keyboard.addKey('X');
        keyC = this.input.keyboard.addKey('C');
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyZ)) { // start game
            // start game
        }
        if(Phaser.Input.Keyboard.JustDown(keyX)) { // to tutorial
            // tutorial
        }
        if(Phaser.Input.Keyboard.JustDown(keyC)) { // to credits
            this.scene.start("credits");
        }
    }
}