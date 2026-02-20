class ParaDemon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, demonHeight, demonWidth) {

        super(scene, game.config.width - demonWidth, Phaser.Math.Between(demonHeight/2, game.config.height - demonHeight*1.5), 'test')

        this.parentScene = scene

        this.parentScene.add.existing(this)
        this.parentScene.physics.add.existing(this)
        this.setVelocityX(velocity)
        //this.setImmovable()
        this.body.setAllowGravity(false);

        this.newDemon = true

    }

    update() {

        if(this.newDemon && this.x < centerX) {
            this.parentScene.addParaDemon(this.parent, this.velocity)
            this.newDemon = false
        }

        if (this.x < -this.width) { 
            this.destroy()
        }
    }
}