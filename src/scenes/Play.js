class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {

        this.demonSpawnDelay = 2500
        this.demonSpeed = -450
        this.demonSpeedMax = -1000

        this.jumpVelocity = 600;     //initial velocity
        this.hold_max = 500;     //hold time
        this.accel = 900;        //accelerator
        this.shortener = 0.5;    //cut short jump

        this.isJumping = false;
        this.holdTime = 0;
        
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

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time, delta) {
        if (!this.player.destroyed) {

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
        }
    }
}