class Credits extends Phaser.Scene {
    constructor() {
        super("credits");

        this.my = {text: {}};
    }

    preload() {}

    create() {
        let my = this.my;

        my.text.credits = this.add.bitmapText(0, 0, "mainFont", "CREATED_BY", 48).setOrigin(0);
        my.text.credits = this.add.bitmapText(48, 48, "mainFont", "AKIRA_SHEMANSKY", 48).setOrigin(0);

        my.text.credits = this.add.bitmapText(0, 144, "mainFont", "ART_ASSETS_FROM", 48).setOrigin(0);
        my.text.credits = this.add.bitmapText(48, 192, "mainFont", "KENNY_ASSETS", 48).setOrigin(0);

        my.text.credits = this.add.bitmapText(0, 288, "mainFont", "FOR_CMPM_120", 48).setOrigin(0);

        // key input
        keyZ = this.input.keyboard.addKey('Z');
        keyX = this.input.keyboard.addKey('X');
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyZ) || Phaser.Input.Keyboard.JustDown(keyX)) {
            this.scene.start("titleScreen");
        }
    }
}