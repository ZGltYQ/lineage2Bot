const pixels = require("image-pixels");

module.exports = class MapAnalizer {
    constructor({ ui, ratio }) {
        this.ui = ui
        this.ratio = ratio;
    }

    relDir(x, y) {
        /* relative to the main screen coordinates */
        x *= this.ratio;
        y *= this.ratio;
      
        let { width, height } = display;
      
        /* we limit the area to make the analyzing more precise (by making it more often because of limitation) */
        let maxX = Math.floor(width * 0.30);
        let maxY = Math.floor(height * 0.30);
      
        if(x < -maxX) x = -maxX;
        else if (x > maxX) x = maxX;
      
        if(y < -maxY) y = -maxY;
        else if(y > maxY) y = maxY;
      
        return new Vec(x - 18, y + 32)
    }

    async analyze() {
        let { radar } = this.ui;

        let mobs = [];
        let height = Math.floor(radar.height / 2);
        let width = Math.floor(radar.width / 2);

        // console.log({ radar, mobs, data: w.capture(radar).data })

        // new Jimp({ data: w.capture(radar).data, height: radar.height, width: radar.width }, (err, image) => {
        //   console.log({ image })
        //   image.write('radar.png')
        // });

        let { data: rgb } = await pixels(w.capture(radar).data, { width: radar.width, height: radar.height });

        for (let y = -height, i = 0; y < height; y++) {
            for (let x = -width; x < width; x++, i += 4) {
                if((rgb[i] - rgb[i + 1] > 100) && (rgb[i] - rgb[i + 2] > 100)) {
                    mobs.push(new Vec(x, y));
                }
            }
        }

        if(mobs.length < 1) return null;

        const closestMob = mobs.reduce((a, b) => {
            if(a.dist < b.dist) return a
            else return b
        });

        return closestMob;
    };
}