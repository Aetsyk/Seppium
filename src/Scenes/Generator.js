class Generator extends Phaser.Scene {
    constructor() {
        super("generator");
    }

    init(data) {
        this.gameData = data;

        this.floorWidth = baseFloorWidth + this.gameData.floorLevel;
        this.floorHeight = baseFloorHeight + this.gameData.floorLevel;

        this.path;
        this.gameData.floor = []; // reset floor plan
        this.floorMirror = []; // blank mirror of floor size used for pathfinding
    }

    create() {
        // make floor structure
        for(let y = 0; y < this.floorHeight; y++) {
            this.gameData.floor.push([]);
            this.floorMirror.push([]);

            for(let x = 0; x < this.floorWidth; x++) {
                this.gameData.floor[y].push({
                    coords: [x, y],
                    room: "",
                    doors: {n: true, s: true, e: true, w: true},
                    objs: {}
                });
                this.floorMirror[y].push(0); // mirror is same size as floor plan, but only contains 0
            }
        }

        // set entrance and exit
        this.gameData.entrance[0] = Phaser.Math.Between(0, this.floorWidth-1);
        this.gameData.entrance[1] = Phaser.Math.Between(0, this.floorHeight-1);

        this.gameData.exit[0] = Phaser.Math.Between(0, this.floorWidth-1);
        this.gameData.exit[1] = Phaser.Math.Between(0, this.floorHeight-1);

        // move exit if it overlaps with entrance
        if(this.gameData.entrance[0] == this.gameData.exit[0] && this.gameData.entrance[1] == this.gameData.exit[1]) {
            this.gameData.exit[0] += 2;
            this.gameData.exit[1] += 2;

            if(this.gameData.exit[0] >= this.floorWidth) this.gameData.exit[0] -= this.floorWidth;
            if(this.gameData.exit[1] >= this.floorHeight) this.gameData.exit[1] -= this.floorHeight;
        }

        // Initialize EasyStar pathfinder
        this.finder = new EasyStar.js();

        // use mirror for finding path
        this.finder.setGrid(this.floorMirror);
        this.finder.setAcceptableTiles(0); // works with the all-0 mirror

        // find path from entrance to exit
        this.finder.findPath(this.gameData.entrance[0], this.gameData.entrance[1], this.gameData.exit[0], this.gameData.exit[1], (path) => {
            if (path === null) {
                console.warn("Path was not found. Retrying...");
                this.scene.restart();
            } else {
                console.log(path);
                this.path = path;
            }
        });
        this.finder.calculate();

        // generate rooms
        for(let y = 0; y < this.floorHeight; y++) {
            for(let x = 0; x < this.floorWidth; x++) {
                // decide room type
                this.gameData.floor[y][x].room = roomList[Phaser.Math.Between(0, roomList.length-1)];
                console.log(x,y);

                /* // decide if room should have north door
                if (y = 0) {
                    this.gameData.floor[y][x].doors.n = false;
                }

                // decide if room should have south door
                if (y = this.floorHeight-1) {
                    this.gameData.floor[y][x].doors.s = false;
                }

                // decide if room should have east door
                if (x = this.floorWidth-1) {
                    this.gameData.floor[y][x].doors.e = false;
                }

                // decide if room should have west door
                if (x = 0) {
                    this.gameData.floor[y][x].doors.w = false;
                } */
            }
        }

        console.log(this.gameData);
    }

    update() {}
}