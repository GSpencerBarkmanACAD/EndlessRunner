// G. Spencer Barkman
// Run Like Hell!
// Time Spent: 22 Hours
// Citations: Music - "Boss Fight One" by BouncyRunner
// All visual assets created by G. Spencer Barkman
// All sound effects created by G. Spencer Barkman in JSFXR
// Scream performed by G. Spencer Barkman
// All code, except the loading bar (see https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/)
// written by G. Spencer Barkman
// Creative Tilt: *Technically, I implemented a jump system that changes the velocity of the jump based on 
// how long the jump button is held down for. Dynamic jumping, which required me to learn more about how 
// update() works, allowing me to use time and delta (built in) to mutate velocity. 
// *Visually, this was my first time making ALL the visual assets for a game from the ground up. 
// For someone who is not a very good artist in that sense, I am very proud of the hellscape I have created, 
// both the enemies, landscape, and the secret skeleton mode -- if you get to extreme mode at level 30, 
// the player ("Armand" is what I call him) will have his skin burst off and continue running as a different 
// fully-animated skeleton sprite. Working with animation and making sure all 4 of my models were fully 
// animated was also a new challenge, as making things look "correct" while pixelated and with minimal
// frames to actually create the look was an endeavor, but, especially with the parademons flight,
// I think I did really well! 

'use strict'

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    pixelArt: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 1500
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

//localStorage.clear()

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

const textSpacer = 64

let highScore 
let newHighScore = false 
let cursors