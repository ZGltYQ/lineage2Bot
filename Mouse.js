const { SerialPort } = require("serialport");


module.exports = class Mouse {
    constructor({ path, baudRate }) {
        this.serialPort = new SerialPort({ path, baudRate });
    }

    click(button) {
        const buttons = {
            left: () => this.serialPort.write('CLICK_LEFT'),
            right: () => this.serialPort.write('CLICK_RIGHT')
        }

        return buttons[button]();
    }
}

