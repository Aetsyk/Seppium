class Room extends Phaser.Scene {
    constructor() {
        super("room");

        this.my = {sprite: {}, text: {}};
    }

    init(data) {
        this.gameData = data;
    }

    create() {}

    update() {}
}