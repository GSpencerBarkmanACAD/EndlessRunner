class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    init(data) {
        this.level = data.level
    }

    create() {

        if(localStorage.getItem('hiscore') != null ) {
            let storedScore = parseInt(localStorage.getItem('hiscore'))


            if(this.level > storedScore) {
                localStorage.setItem('hiscore', this.level.toString())
                highScore = this.level
                newHighScore = true
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'))
                newHighScore = false
            }
        } else {
            highScore = this.level
            localStorage.setItem('hiscore', highScore.toString())
            newHighScore = true
        }

        if(newHighScore) {
            this.add.text(centerX, centerY - textSpacer, 'New Hi-Score!', {
                fontSize: '32px'
            }).setOrigin(0.5)
        }

        this.add.text(centerX, centerY, `This Escape Attempt Lasted: ${this.level}s`, {
            fontSize: '40px'
        }).setOrigin(0.5)
        this.add.text(centerX, centerY + textSpacer, `This Browser's Best: ${highScore}s`, {
            fontSize: '32px'
        }).setOrigin(0.5)
        this.add.text(centerX, centerY + textSpacer * 2, `Press UP ARROW to Try Again`, {
            fontSize: '36px'
        }).setOrigin(0.5)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }
}