const { Hardware, getAllWindows, GlobalHotkey } = require("keysender");
const IO = require('./IO');
const MapAnalizer = require('./MapAnalyzer');
const Bot = require('./Bot');
const GameInterface = require('./GameInterface');
const {readFileSync} = require("fs");

// let option = parse(readFileSync("./option.ini", "utf8"));


new GlobalHotkey({
  key: "space", 
  mode: "once",
  action: () => process.exit()
});


/* The bot will activate these buffs when launched and will rebuff
 each buff after the given period of time */
// const playerBuffs = option.buffs

/* The bot will use these skills during attacking
 process with the provided interval */

// const playerSkills = option.skills

/* The speed of the bot determines when it should analyze radar again after
reaching a point of destination, it should be the same as the speed of your character */

// const speed = Number(option.bot.botSpeed);

/* find the name of the window by using getAllWindows function and change this regExp */
const serverName = /ZaspolyVashuMamu/;

/* Find the window with the given tittle and determine delay of the clicks/keys sending */
let gameWindow = getAllWindows().find(({title}) => serverName.test(title));
if(!gameWindow) throw new Error(`The game isn't opened. Open the game first.`);
const { handle } = gameWindow;

const { workwindow, mouse: emulateMouse } = new Hardware(handle)
const { width, height } = workwindow.getView();

workwindow.setForeground();

const gameInterface = new GameInterface({
  gameScreen : workwindow,
  center     : { x: width / 2, y: height / 2 },
  radar      : { x: width - 220, y: 50, width: 210, height: 220 },
  botHp      : { x: 167, y: 47 },
  mobHp      : { end: { x: 876, y: 28 }, start: { x: 1050, y: 28 } },
  width,
  height
})

const io = new IO({ path: 'COM5', baudRate: 115200, emulateMouse });

const mapAnalizer = new MapAnalizer({ gameInterface, ratio: 12 })

const bot = new Bot({ io, gameInterface });

async function main() {
  while(true) {
    const mob = await mapAnalizer.analyze();
    if (mob) await bot.killMob(mob);
  }
}

main()

// class Vec{
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   plus(vec) {
//     return new Vec(this.x + vec.x, this.y + vec.y);
//   }

//   get dist() {
//     return Math.sqrt(Math.pow(Math.abs(this.x), 2) + Math.pow(Math.abs(this.y), 2));
//   }

//   click(repeat = 1) {
//     m.moveTo(this.x, this.y, delay);
//     for(let i = 0; i < repeat; i++) {
//       m.click("left", delay, delay)
//     }
//   }

//   get colorNow() {
//     return w.colorAt(this.x, this.y);
//   }
// }


// function resetUi(center, hp) {
//   /* reset the UI */

//     k.sendKey([`alt`, `l`], delay, 500);

//   /* relocate buffs info-panel */

//   if(option.bot.relocateUiBuffs) {
//     m.moveTo(185, 5);
//     m.toggle(true, "left", delay);
//     m.move(210, 0, delay);
//     m.toggle(false, "left", delay);
//   }

//   /* make bot's and mob's hp wider */

//       hp.botStart.click();
//       sleep(500);
//       m.moveTo(177, 60, delay);
//       m.toggle(true, "left");
//       m.moveTo(177 + 210, 60, delay);
//       m.toggle(false, "left");
//       m.moveTo(center.x + 93, 30, delay);
//       m.toggle(true, "left");
//       m.moveTo(center.x + 93 + 210, 30, delay);
//       m.toggle(false, "left");

//   /* get hp colors */

//       for(let i of Object.keys(hp)) {
//         hp[i].color = hp[i].colorNow;
//       }

//   /* camera optimization */

//       m.moveTo(center.x, center.y, delay);
//       m.toggle(true, "right");
//       let {x, y} = center.plus(new Vec(0, 300));
//       m.moveTo(x, y);
//       m.toggle(false, "right");

//       for(let i = 0; i < 50; i++) {
//           m.scrollWheel(1);
//       }

//   /* enlarge radar */

//       m.moveTo(display.width - 15, 135);
//       for(let i = 0; i < 3; i++) {
//           m.click("left", delay, delay);
//       }

//       k.sendKey(`escape`, delay, delay);
// }



