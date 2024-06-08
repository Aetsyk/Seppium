class Generator extends Phaser.Scene {
    constructor() {
        super("generator");
    }

    init(data) {
        this.gameData = data;

        this.floorWidth = baseFloorWidth + this.gameData.floorLevel;
        this.floorHeight = baseFloorHeight + this.gameData.floorLevel;
    }

    create() {
        // make floor structure
        for(let y = 0; y < this.floorHeight; y++) {
            this.gameData.floor.push([]);

            for(let x = 0; x < this.floorWidth; x++) {
                this.gameData.floor[y].push({
                    coords: [x, y],
                    room: "",
                    doors: [],
                    objs: []
                });
            }
        }

        // set entrance and exit
        this.gameData.entrance[0] = Phaser.Math.Between(0, this.floorWidth-1);
        this.gameData.entrance[1] = Phaser.Math.Between(0, this.floorHeight-1);

        this.gameData.exit[0] = Phaser.Math.Between(0, this.floorWidth-1);
        this.gameData.exit[1] = Phaser.Math.Between(0, this.floorHeight-1);

        if(this.gameData.entrance[0] == this.gameData.exit[0] && this.gameData.entrance[1] == this.gameData.exit[1]) {
            this.gameData.exit[0] += 2;
            this.gameData.exit[1] += 2;

            if(this.gameData.exit[0] >= this.floorWidth) this.gameData.exit[0] -= this.floorWidth;
            if(this.gameData.exit[1] >= this.floorHeight) this.gameData.exit[1] -= this.floorHeight;
        }

        console.log(this.gameData);
    }

    update() {}
}