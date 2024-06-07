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
    scene: [Load, Title, Credits]
}

var cursors;
var keyZ;
var keyX;
var keyC;

const SCALE = 3;

const game = new Phaser.Game(config);