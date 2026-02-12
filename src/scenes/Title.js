class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        let run = this.add.text(centerX, centerY - 164, 'RUN', {
            fontSize: '64px',
            color: '#FF0000'
        }).setOrigin(0.5).setDepth(10)

        let like = this.add.text(centerX, centerY - 96, 'LIKE', {
            fontSize: '96px',
            color: '#FF0000'
        }).setOrigin(0.5).setDepth(10)

        let hell = this.add.text(centerX, centerY, 'HELL!', {
            fontSize: '128px',
            color: '#FF0000'
        }).setOrigin(0.5).setDepth(10)

        this.add.text(centerX, centerY + 1.3*textSpacer, 'Use the UP ARROW to evade Demons!', {
            fontSize: '32px',
            color: '#FFA500'
        }).setOrigin(0.5).setDepth(10)

        this.add.text(centerX, centerY + 3*textSpacer, 'Press UP ARROW to Start', {
            fontSize: '48px',
            color: '#FFA500'
        }).setOrigin(0.5).setDepth(10)

        this.add.text(centerX, centerY + 4*textSpacer, 'G. Spencer Barkman 2026', {
            fontSize: '24px',
            color: '#A9A9A9'
        }).setOrigin(0.5).setDepth(10)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene')
        }
    }
}