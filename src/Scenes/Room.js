class Room extends Phaser.Scene {
    constructor() {
        super("room");

        this.my = {sprite: {}, text: {}};
    }

    init(data) {
        this.gameData = data;
        this.currentRoom = this.gameData.floor[this.gameData.room[1]][this.gameData.room[0]].room;
    }

    create() {
        let my = this.my;
        this.map = this.add.tilemap("dungeonRooms"); // tilemap game object

        this.tileset = this.map.addTilesetImage("MainTileset", "tiles"); // adds tileset to map

        // draw room on map according to current room in gameData
        this.roomLayer = this.map.createLayer("Room_"+this.currentRoom, this.tileset, 0, 0);

        // set wall collision
        /* this.roomLayer.setCollisionByProperty({
            collides: true
        }); */

        // create doors
        this.doors = [];
        if (this.gameData.floor[this.gameData.room[1]][this.gameData.room[0]].doors.n) {
            this.doors = this.doors.concat(this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "doorN",
                key: "tilesheet",
                frame: 443
            }));
        }
        if (this.gameData.floor[this.gameData.room[1]][this.gameData.room[0]].doors.s) {
            this.doors = this.doors.concat(this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "doorS",
                key: "tilesheet",
                frame: 443
            }));
        }
        if (this.gameData.floor[this.gameData.room[1]][this.gameData.room[0]].doors.e) {
            this.doors = this.doors.concat(this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "doorE",
                key: "tilesheet",
                frame: 443
            }));
        }
        if (this.gameData.floor[this.gameData.room[1]][this.gameData.room[0]].doors.w) {
            this.doors = this.doors.concat(this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "doorW",
                key: "tilesheet",
                frame: 443
            }));
        }

        // create entrance/exit
        this.exit = [];
        if (this.gameData.entrance[0] == this.gameData.room[0] && this.gameData.entrance[1] == this.gameData.room[1]) {
            this.entrance = this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "staircase",
                key: "tilesheet",
                frame: 296
            });
        } else if (this.gameData.exit[0] == this.gameData.room[0] && this.gameData.exit[1] == this.gameData.room[1]) {
            this.exit = this.exit.concat(this.map.createFromObjects("Room_"+this.currentRoom+"_objs", {
                name: "staircase",
                key: "tilesheet",
                frame: 297
            }));
            this.physics.world.enable(this.exit, Phaser.Physics.Arcade.STATIC_BODY);
        }

        this.physics.world.enable(this.doors, Phaser.Physics.Arcade.STATIC_BODY);
        this.doorGroup = this.add.group(this.doors);

        // set up player avatar
        if (this.gameData.startPosition == "center") {
            my.sprite.player = this.physics.add.sprite(game.config.width/6, game.config.height/6, "tilesheet", 25);
        } else if (this.gameData.startPosition == "n") {
            my.sprite.player = this.physics.add.sprite(game.config.width/6, (game.config.height/6)-48, "tilesheet", 25);
        } else if (this.gameData.startPosition == "s") {
            my.sprite.player = this.physics.add.sprite(game.config.width/6, (game.config.height/6)+48, "tilesheet", 25);
        } else if (this.gameData.startPosition == "e") {
            my.sprite.player = this.physics.add.sprite((game.config.width/6)+80, game.config.height/6, "tilesheet", 25);
        } else if (this.gameData.startPosition == "w") {
            my.sprite.player = this.physics.add.sprite((game.config.width/6)-80, game.config.height/6, "tilesheet", 25);
        }
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.roomLayer);

        // Door Functionality
        this.physics.add.collider(my.sprite.player, this.doorGroup, (obj1, obj2) => {
            if (obj2.x < 64) {
                this.gameData.room = [this.gameData.room[0]-1, this.gameData.room[1]];
                this.gameData.startPosition = "e";
            }
            if (obj2.x > 256) {
                this.gameData.room = [this.gameData.room[0]+1, this.gameData.room[1]];
                this.gameData.startPosition = "w";
            }
            if (obj2.y < 64) {
                this.gameData.room = [this.gameData.room[0], this.gameData.room[1]-1];
                this.gameData.startPosition = "s";
            }
            if (obj2.y > 192) {
                this.gameData.room = [this.gameData.room[0], this.gameData.room[1]+1];
                this.gameData.startPosition = "n";
            }
            console.log(this.gameData.room);
            this.scene.restart(this.gameData);
        });

        // Exit Functionality
        if (this.exit) this.physics.add.collider(my.sprite.player, this.exit[0], (obj1, obj2) => {
            this.gameData.floorLevel++;
            console.log("Now entering level " + this.gameData.floorLevel);
            this.scene.start("generator", this.gameData);
        });

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

        // player movement
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

        if(Phaser.Input.Keyboard.JustDown(keyC) || Phaser.Input.Keyboard.JustDown(keyX)) { // to title screen
            this.scene.start("titleScreen");
        }
    }
}