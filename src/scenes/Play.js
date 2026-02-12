class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {

        this.demonSpawnDelay = 2500
        this.demonSpeed = -450
        this.demonSpeedMax = -1000
        
        this.level = 0
        this.hardMODElevel = 30
        this.extremeMODElevel = 60
        this.extremeMODE = false
        this.shadowLock = false

    }

    create() {
        this.bgm = this.sound.add('track', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.bgm.play()

        this.player = this.physics.add.sprite(32, centerY, 'test').setOrigin(0.5)
        this.player.setCollideWorldBounds(true)
        this.player.setImmovable
        this.player.destroyed = false
        this.player.setBlendMode('SCREEN')

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (!this.player.destroyed) {
            if(cursors.up.isDown && this.player.body.onFloor()) {
                this.player.setVelocityY(-330)
            }
            this.physics.world.collide(this.player)
        }
    }
}