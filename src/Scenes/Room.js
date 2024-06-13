class Room extends Phaser.Scene {
    constructor() {
        super("room");

        this.my = {sprite: {}, text: {}};
    }

    init(data) {
        this.gameData = data;
    }

    create() {
        let my = this.my;
        this.map = this.add.tilemap("dungeonRooms"); // tilemap game object

        this.tileset = this.map.addTilesetImage("MainTileset", "tiles"); // adds tileset to map

        // draw room on map according to current room in gameData
        this.roomLayer = this.map.createLayer("Room_"+this.gameData.room, this.tileset, 0, 0);

        // set wall collision
        this.roomLayer.setCollisionByProperty({
            collides: true
        });

        // create doors
        this.doors = this.map.createFromObjects("Room_"+this.gameData.room+"_objs", [
            {
                name: "doorN",
                key: "tilesheet",
                frame: 443
            },
            {
                name: "doorS",
                key: "tilesheet",
                frame: 443
            },
            {
                name: "doorE",
                key: "tilesheet",
                frame: 443
            },
            {
                name: "doorW",
                key: "tilesheet",
                frame: 443
            }
        ]);

        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(game.config.width/6, game.config.height/6, "tilesheet", 25);
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.roomLayer);

        // key input
        cursors = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey('Z');
        keyX = this.input.keyboard.addKey('X');
        keyC = this.input.keyboard.addKey('C');

        // camera
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(SCALE);
    }

    update() {
        let my = this.my;

        if(cursors.left.isDown) {
            my.sprite.player.setVelocityX(-50);
        } else if(cursors.right.isDown) {
            my.sprite.player.setVelocityX(50);
        } else {
            my.sprite.player.setVelocityX(0);
        }

        if(cursors.up.isDown) {
            my.sprite.player.setVelocityY(-50);
        } else if(cursors.down.isDown) {
            my.sprite.player.setVelocityY(50);
        } else {
            my.sprite.player.setVelocityY(0);
        }
    }
}