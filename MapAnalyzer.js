const pixels = require("image-pixels");
const Jimp = require('jimp');

module.exports = class MapAnalizer {
    constructor({ gameInterface, ratio }) {
        this.gameInterface = gameInterface;
        this.ratio = ratio;
        this.mobs = [];
    }

    #dist(coordinates) {
        return Math.sqrt(Math.pow(Math.abs(coordinates.x), 2) + Math.pow(Math.abs(coordinates.y), 2));
    }

    #relDir({ x, y }) {
        /* relative to the main screen coordinates */
        x *= this.ratio;
        y *= this.ratio;
      
        let { width, height, center } = this.gameInterface;
      
        /* we limit the area to make the analyzing more precise (by making it more often because of limitation) */
        let maxX = Math.floor(width * 0.30);
        let maxY = Math.floor(height * 0.30);
      
        if(x < -maxX) x = -maxX;
        else if (x > maxX) x = maxX;
      
        if(y < -maxY) y = -maxY;
        else if(y > maxY) y = maxY;
      
        return { x: x + center.x, y: y + center.y }
    }

    async analyze() {
        try {
            let { radar } = this.gameInterface;

            let mobs = [];
            let height = Math.floor(radar.height / 2);
            let width = Math.floor(radar.width / 2);
    
            let { data: rgb } = await pixels(this.gameInterface.gameScreen.capture(radar)?.data, { width: radar.width, height: radar.height });
    
            for (let y = -height, i = 0; y < height; y++) {
                for (let x = -width; x < width; x++, i += 4) {
                    if ((rgb[i] - rgb[i + 1] > 100) && (rgb[i] - rgb[i + 2] > 100)) {
                        mobs.push({ x, y });
                    }
                }
            }
    
            if(mobs.length < 1) return null;
    
            const closestMob = this.#relDir(mobs.reduce((a, b) => {
                if(this.#dist(a) < this.#dist(b)) return a
                else return b
            }))


            this.mobs.push(closestMob)
    
            return closestMob;
        } catch(err) {
            return this.mobs.shift()
        }
    };
}