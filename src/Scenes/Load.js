class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/"); // set path for assets

        // load tilemap information
        this.load.image("tiles", "monochrome_packed.png");

        // load tilemap as a spritesheet
        this.load.spritesheet("tilesheet", "monochrome_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        this.scene.start("titleScreen"); // immediately go to title screen once loading is done
    }

    update() {} // not used
}