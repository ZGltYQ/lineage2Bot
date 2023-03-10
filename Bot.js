module.exports = class Bot {
    constructor({ io, gameInterface }) {
        this.io = io;
        this.gameInterface = gameInterface;
        this.state = "working";
        this.memory = [];
        this.stuckTime = Date.now();
        this.interval = void 0;
    }
  
    // resetBuffs() {
    //     for(let buff of this.ui.buffs) {
    //       buff.active();
    //     }
    // }

    async killMob(dir) {
      this.memory.push(dir);
      let attempts = 0;
      await this.io.moveTo(dir);
      await this.io.click('left');
      
      do {
        await this.io.press('f1');
        attempts++;

        if (attempts === 10) return;
      } while (!this.gameInterface.isMobSelected());
      
      do {
        await this.io.press('f4');
        attempts++;

        if (attempts === 20) {
          const prevMob = this.memory.find(memDir => memDir?.x !== dir?.x && memDir?.y !== dir?.y);
          await this.io.moveTo(prevMob);
          return await this.io.click('left');
        }
      } while (!this.gameInterface.isMobBitted());

      do {
        await this.io.press('f2');
      } while (this.gameInterface.isMobSelected())
      
      await this.io.press('f5');
      await this.io.press('f5');
      await this.io.press('f5');
      await this.io.press('f5');
      await this.io.press('f3');
      await this.io.press('f3');
      await this.io.press('f3');
      return await this.io.press('f3');
    }
  
  
    // check(dir) {
    //   console.log(`Bot state: Checking`);
    //   let {mobEnd} = this.ui;
  
    //   /* We find how much time do we need before the next analyze of the radar,
    //      we don't need it to run 100% of the distance and keep it at 70% so the bot
    //      never stops after reaching the destination */
  
    //   let checkTime = ((dir.dist / dps) * 1000) * 0.70;
  
    //   return new Promise((resolve, reject) => {
    //     let startTime = Date.now();
  
    //       function checking() {
    //         /* We give some time (150ms) for the window with hp to open */
    //         k.sendKey(`f1`, delay, 150);
  
    //         /* We check if there's a window with mob hp*/
    //         if(mobEnd.colorNow == mobEnd.color)
    //           resolve(true);
    //         else if (Date.now() - startTime > checkTime)
    //           resolve(false);
    //         else
    //           setImmediate(checking);
    //       };
  
    //       setImmediate(checking);
    //   });
    // };
  
    // attack() {
    //   console.log(`Bot state: Attacking`);
  
    //   let {mobEnd, mobStart, botEnd, botStart} = this.ui;
  
    //   let skills = [];
    //   for(let skill of Object.keys(playerSkills)) {
    //     skills.push(new Buff(skill, Number(playerSkills[skill]) * 1000));
    //   }
  
  
    //   k.sendKey("f2", delay, delay);
    //   this.stuckTime = Date.now();
  
    //   if(option.bot.botSpoil) {
    //     k.sendKey(option.spoil.spoilKey, delay, delay);
    //   }
  
    //   return new Promise((resolve, reject) => {
    //     let bot = this;
    //     function attacking() {
  
    //       /* We reapply all the skills at the given perion of time */
    //       for(let skill of skills) skill.active();
  
    //       /* We drink potion if our hp isn't full */
    //       if(botEnd.colorNow != botEnd.color)
    //         k.sendKey("f4", delay, delay)
  
    //       /* If the bot is dead we stop the script */
    //       if(botStart.colorNow != botStart.color) {
    //         process.exit();
    //       }
  
    //       if(mobStart.colorNow != mobStart.color) {
    //         /* We wait 250 ms before picking cuz sometimes bot makes
    //         1-2 blows even if the mob is already dead */
    //         sleep(250);
    //         for(let i = 0; i < 8; i++) {
    //           /* 150ms delay after every picking cuz it might take some
    //           time for the bot to run up to the loot lying around */
    //           k.sendKey("f3", delay, 150)
    //         }
  
    //         if(option.bot.botSpoil) {
    //           k.sendKey(option.spoil.sweepKey, delay, 250);
    //         }
  
    //         k.sendKey(`escape`, delay, delay);
    //         /* reset stuckTime */
    //         bot.stuckTime = Date.now();
    //         resolve();
    //       } else if (Date.now() - bot.stuckTime > 20000 && mobEnd.colorNow == mobEnd.color) {
    //         /* if we haven't inflicted any damage in 20 sec, we are probably stuck (or mob is in textures) */
    //         console.log(`Bot state: Stuked in textures + mob`);
    //         k.sendKey(`escape`, delay, delay);;
    //         bot.unstuck(resolve);
    //       } else {
    //         setTimeout(attacking, 100);
    //       }
    //     }
  
    //     setTimeout(attacking, 100);
    //   });
    // };
  
    // async unstuck(resolve) {
    //   /* Unstucking process is just running 3 move functions back where we came from using the memory */
  
    //    console.log(`Bot state: unstucking`);
    //     this.stuckTime = Date.now();
    //     this.state = `stuck`;
    //     for(let i = 0; i < 5; i++) {
    //       let dir = this.memory.pop();
    //       if(!dir) {
    //         throw new Error(`No memory paths available, find a spot with the mobs`)
    //         process.exit();
    //       }
    //       this.move(dir);
    //       sleep((dir.dist / dps) * 1000);
    //     };
    //     this.state = `working`;
    //     if(resolve) resolve();
    // }
  
    // static create() { 
    //   let {width, height} = display;
  
    //   let center = new Vec(width / 2, height / 2);
    //   // m.moveTo(center.x + 90, 28)
  
    //   // throw 'ee'
    //   let radar = { x: width - 220, y: 50, width: 210, height: 220 };
    //   let hp = {
    //             mobStart: new Vec(center.x - 80, 28),
    //             mobEnd: new Vec(center.x + 90, 28),
    //             botStart: new Vec(22, 47),
    //             botMid: new Vec(250, 47),
    //             botEnd: new Vec(325, 47),
    //           };
  
              
    //   resetUi(center, hp);
  
    //   let buffs = [];
    //   for(let buff of Object.keys(playerBuffs)) {
    //     buffs.push(new Buff(buff, Number(playerBuffs[buff]) * 1000));
    //   }
  
    //  let ui = {center, radar, ...hp, buffs};
    //  return new Bot(ui);
    // }
  }