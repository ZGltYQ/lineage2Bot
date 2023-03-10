module.exports = class GameInterface {
    constructor({ center, radar, botHp, mobHp, gameScreen, width, height }) {
        this.center = center;
        this.radar = radar;
        this.botHp = botHp;
        this.mobHp = mobHp;
        this.gameScreen = gameScreen;
        this.height = height;
        this.width = width;
    }

    isMobSelected() {
        const rgb = this.gameScreen.colorAt(this.mobHp?.end?.x, this.mobHp?.end?.y, "array");

        // console.log(rgb)

        return rgb[0] > 100;
    }

    isMobBitted() {
        const rgb = this.gameScreen.colorAt(this.mobHp?.start?.x, this.mobHp?.start?.y, "array");

        console.log(rgb)

        return rgb[0] < 50;
    }
    // get center () {
    //     return this.center
    // }

    // get radar () {
    //     return this.radar
    // }

    // get botHp () {
    //     return this.botHp
    // }

    // get mobHp () {
    //     return this.mobHp
    // }
}