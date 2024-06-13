// Akira Shemansky
// Created: June 2024
// Phaser: 3.70.0
//
// Seppium
//
// Roguelike RPG
// 
// Art assets from Kenny Assets:
// https://kenney.nl/assets/

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 0
            }
        }
    },
    fps: {
        forceSetTimeOut: true,
        target: 30
    },
    width: 960,
    height: 720,
    scene: [Load, Title, Credits, Generator, Room]
}

// data structure for the game
const gameDataTemplate = {
    player: {},
    floor: [],
    floorLevel: 1,
    room: "",
    startPosition: "center",
    entrance: [-1, -1],
    exit: [-1, -1]
}
const roomList = ["Box1", "Box2", "Box3"];
const baseFloorWidth = 4;
const baseFloorHeight = 4;

var cursors;
var keyZ;
var keyX;
var keyC;

const SCALE = 3;

const game = new Phaser.Game(config);