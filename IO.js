const { SerialPort } = require("serialport");


module.exports = class IO {
    constructor({ path, baudRate, emulateMouse }) {
        this.serialPort = new SerialPort({ path, baudRate });
        this.emulateMouse = emulateMouse;
    }

    click(button) {
        const buttons = {
            left: () => this.serialPort.write('CLICK_LEFT'),
            right: () => this.serialPort.write('CLICK_RIGHT')
        }

        return new Promise(resolve => setTimeout(() => resolve(buttons[button]()), 1000))
    }

    press(button) {
        const buttons = {
            f1: () => this.serialPort.write('PRESS_F1'),
            f2: () => this.serialPort.write('PRESS_F2'),
            f3: () => this.serialPort.write('PRESS_F3'),
            f4: () => this.serialPort.write('PRESS_F4'),
            f5: () => this.serialPort.write('PRESS_F5')
        }

        return new Promise(resolve => setTimeout(() => resolve(buttons[button]()), 1000))
    }

    moveTo({ x, y } = { x: 0, y: 0 }) {
        return this.emulateMouse.humanMoveTo(x, y, 50)
    }
}

