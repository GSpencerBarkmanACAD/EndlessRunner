class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        }) 

        this.load.path = './assets/'
        
        this.load.image('test', 'test.png')

        this.load.spritesheet('player', 'Armand.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('skelly', 'skelly.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('demon', 'Demon.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('paraDemon', 'ParaDemon.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.image('clouds', 'clouds.png')
        this.load.image('sky', 'sky.png')
        this.load.image('far', 'far.png')
        this.load.image('close', 'close.png')
        this.load.image('flame', 'flame.png')
        this.load.image('smoke', 'smoke.png')

        this.load.audio('death', ['death.wav'])
        this.load.audio('jump', ['jump.wav'])
        this.load.audio('levelUp', ['levelUP.wav'])
        this.load.audio('scream', ['scream.wav'])
        this.load.audio('skinned', ['skinoff.wav'])

        this.load.audio('track', ['backgroundmusic.mp3'])

    }

    create() {
        this.scene.start('titleScene')
    }
}
