const { Hardware, getAllWindows, GlobalHotkey } = require("keysender");

const serverName = /ZaspolyVashuMamu/;

let gameWindow = getAllWindows().find(({title}) => serverName.test(title));
if(!gameWindow) throw new Error(`The game isn't opened. Open the game first.`);
const { handle } = gameWindow;

const { workwindow, mouse } = new Hardware(handle)

workwindow.setForeground();

new GlobalHotkey({
    key: "space", 
    mode: "once",
    action: () => {
      let pos = mouse.getPos();
      console.log('coords:', pos)
      console.log('color:', workwindow.colorAt(pos.x, pos.y, "array"))
    }
  });