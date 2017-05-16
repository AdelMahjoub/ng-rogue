import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  attack = new Audio('../assets/sfx/attack.mp3');
  enterDungeon = new Audio('../assets/sfx/enter-dungeon.mp3');
  lvlUp = new Audio('../assets/sfx/lvl-up.mp3');
  pickArmor = new Audio('../assets/sfx/pick-armor.mp3');
  pickShield = new Audio('../assets/sfx/pick-shield.mp3');
  pickWeapon = new Audio('../assets/sfx/pick-weapon.mp3');
  potion = new Audio('../assets/sfx/potion.mp3');
  toggleHelp = new Audio('../assets/sfx/toggle-help.mp3');


  constructor() {
    this.attack.volume = 0.5;
    this.enterDungeon.volume = 0.5; 
    this.lvlUp.volume = 0.5; 
    this.pickArmor.volume = 0.5;
    this.pickShield.volume = 0.5;
    this.pickWeapon.volume = 0.5;
    this.potion.volume = 0.5;
    this.toggleHelp.volume = 0.5;
  }

  toggleSound(enabled: boolean) {
    if(enabled) {
      this.attack.volume = 0.0;
      this.enterDungeon.volume = 0.0; 
      this.lvlUp.volume = 0.0; 
      this.pickArmor.volume = 0.0;
      this.pickShield.volume = 0.0;
      this.pickWeapon.volume = 0.0;
      this.potion.volume = 0.0;
      this.toggleHelp.volume = 0.0;
    } else {
      this.attack.volume = 0.5;
      this.enterDungeon.volume = 0.5; 
      this.lvlUp.volume = 0.5; 
      this.pickArmor.volume = 0.5;
      this.pickShield.volume = 0.5;
      this.pickWeapon.volume = 0.5;
      this.potion.volume = 0.5;
      this.toggleHelp.volume = 0.5;
    }
  }
}