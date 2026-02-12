// G. Spencer Barkman
// Run Like Hell!
// Time Spent: 3 Hours
// **Citations**
// **Creative Tilt

'use strict'

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 600
            }
        }
    },
    scene: [ Load, Title, Play ]
}

//localStorage.clear()

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

const textSpacer = 64

let highScore 
let newHighSore = false 
let cursors