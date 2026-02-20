class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {

        this.demonSpawnDelay = 2500
        this.paraDemonSpawnDelay = 15000
        this.demonSpeed = -400
        this.demonSpeedMax = -1000

        this.paraDemonSpeed = -500
        this.pdSpeedMax = -1250

        this.demonHeight = 32
        this.demonWidth = 32

        this.jumpVelocity = 1000;     //initial velocity
        this.hold_max = 500;     //hold time
        this.accel = 100;        //accelerator
        this.shortener = 0.50;    //cut short jump

        this.isJumping = false;
        this.holdTime = 0;
        
        this.level = 0
        this.hardMODElevel = 30
        this.extremeMODElevel = 60
        this.extremeMODE = false

    }

    create() {

        this.bgm = this.sound.add('track', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.bgm.play()

        this.sky = this.add.tileSprite(0, 0, 960, 640, 'sky').setOrigin(0, 0)
        this.far = this.add.tileSprite(0, 0, 960, 640, 'far').setOrigin(0, 0)

        let line = new Phaser.Geom.Line(0, game.config.height, game.config.width, game.config.height)  
        this.lineEmitter = this.add.particles(0, 0, 'smoke', {
            speedY: {min: -40, max: -80},
            gravityY: -30,
            lifespan: 3000,
            alpha: {
                start: 0.5,
                end: 0
            },
            emitZone: { 
                type: 'random', 
                source: line, 
                quantity: 10 
            },
            blendMode: 'NORMAL'
        })

        this.clouds = this.add.tileSprite(0, 0, 960, 640, 'clouds').setOrigin(0, 0)
        this.close = this.add.tileSprite(0, 0, 960, 640, 'close').setOrigin(0, 0)

        this.player = this.physics.add.sprite(124, 640, 'player').setOrigin(0.5)

        this.anims.create({
            key: 'run',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 4
            })
        })

        this.player.play('run')

        this.anims.create({
            key: 'demonRun',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('demon', {
                start: 0,
                end: 3
            })
        })

        this.anims.create({
            key: 'demonRun',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('demon', {
                start: 0,
                end: 3
            })
        })
        
        this.player.scaleX = 2
        this.player.scaleY = 2
        this.player.setCollideWorldBounds(true)
        this.player.setImmovable
        this.player.destroyed = false
        this.player.setBlendMode('SCREEN')

        this.demonGroup = this.add.group({
            runChildUpdate: true
        })

        this.paraDemonGroup = this.add.group({
            runChildUpdate: true
        })

        this.time.delayedCall(this.demonSpawnDelay, () => {
            this.addDemon()
        })

        this.time.delayedCall(this.paraDemonSpawnDelay, () => {
            this.addParaDemon()
        })

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    addDemon() {
        let speedVariance = Phaser.Math.Between(0, 25)
        let demon = new Demon(this, this.demonSpeed - speedVariance, this.demonHeight, this.demonWidth)
        this.demonGroup.add(demon)
    }

    addParaDemon() {
        let speedVariance = Phaser.Math.Between(0, 50)
        let paraDemon = new ParaDemon(this, this.paraDemonSpeed - speedVariance, this.demonHeight, this.demonWidth)
        this.paraDemonGroup.add(paraDemon)
    }

    update(time, delta) {

        if (!this.player.destroyed) {

            this.sky.tilePositionX += 1

            this.clouds.tilePositionX += 2
            this.close.tilePositionX += 1

            const up = this.cursors.up;

            // jump starts
            if (Phaser.Input.Keyboard.JustDown(up) && this.player.body.onFloor()) {
                this.player.setVelocityY(-this.jumpVelocity);
                this.isJumping = true;
                this.holdTime = 0;

            }

            // add height while holding until can't be held any longer
            if (this.isJumping && up.isDown && this.holdTime < this.hold_max && this.player.body.velocity.y < 0) {
                this.player.setVelocityY(this.player.body.velocity.y - this.accel * delta / 1000);
                this.holdTime += delta;
            }

            // JustUp triggers when UP is released
            if (Phaser.Input.Keyboard.JustUp(up) && this.player.body.velocity.y < 0) {
                this.player.setVelocityY(this.player.body.velocity.y * this.shortener);
                this.isJumping = false;
            }

            if (this.player.body.onFloor()) {
                this.isJumping = false;
            }

            this.physics.world.collide(this.player, this.demonGroup, this.playerCollision, null, this)
            this.physics.world.collide(this.player, this.paraDemonGroup, this.playerCollision, null, this)
        }
    }

    levelBump() {
        this.level++

        if (this.level % 5 == 0) {
            //sounds to signal speed up

            if (this.demonSpeed >= this.demonSpeedMax) {
                this.demonSpeed -= 25
                this.bgm.rate += 0.01
            }

            if (this.paraDemonSpeed >= this.pdSpeedMax) {
                this.paraDemonSpeed -= 30
            }
        }

        if (this.level == this.hardMODElevel) {

        }

        if (this.level == this.extremeMODElevel) {

        }
    }

    playerCollision() {
        this.player.destroyed = true
        this.difficultyTimer.destroy()
        // *** this.sound.play('death', {volume: 0.25})
        this.cameras.main.shake(2500, 0.0075)

        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000
        })

        let pBounds = this.player.getBounds()
        let deathEmitter = this.add.particles(0, 0, 'flame', {
            tint: { min: 0xff6600, max: 0xffcc00 },
            alpha: {start: 1, end: 0},
            scale: {start: 0.75, end: 0},
            speed: {min: -50, max: 50},
            lifespan: 2000,
            blendMode: 'ADD',
            emitZone: {
                source: new Phaser.Geom.Rectangle(pBounds.x, pBounds.y, pBounds.width, pBounds.height),
                type: 'edge',
                quantity: 10
            }
        })

        deathEmitter.explode(100)

        this.player.destroy()

        this.time.delayedCall(2000, () => {this.scene.start('gameOverScene', { level: this.level})})
    }
}