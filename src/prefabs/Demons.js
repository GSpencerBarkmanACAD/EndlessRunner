class Demon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, demonHeight, demonWidth) {

        let scaler = Phaser.Math.Between(2, 4)

        super(scene, 0, 0, 'demon')

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        this.body.setAllowGravity(false);

        

        this.scaleY = scaler
        this.scaleX = scaler

        this.play('demonRun')

        this.setOrigin(0.5, 1)
        this.setPosition(game.config.width, game.config.height)

        this.newDemon = true

    }

    update() {

        if(this.newDemon && this.x < centerX) {

            this.newDemon = false
            
            if (Math.random() < 0.6) {
                this.parentScene.addDemon(this.parent, this.velocity)
            } else {
                this.parentScene.time.delayedCall(3000, () => {
                    this.parentScene.addDemon(this.parent, this.velocity)
                });
            }  
        }

        if (this.x < -this.width) { 
            this.destroy()
        }
    }
}