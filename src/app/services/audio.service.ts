import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  // Special effects
  attack = new Audio('./assets/sfx/attack.mp3');
  enterDungeon = new Audio('./assets/sfx/enter-dungeon.mp3');
  lvlUp = new Audio('./assets/sfx/lvl-up.mp3');
  pickArmor = new Audio('./assets/sfx/pick-armor.mp3');
  pickShield = new Audio('./assets/sfx/pick-shield.mp3');
  pickWeapon = new Audio('./assets/sfx/pick-weapon.mp3');
  potion = new Audio('./assets/sfx/potion.mp3');
  toggleHelp = new Audio('./assets/sfx/toggle-help.mp3');

  sfx = [
    this.attack, 
    this.enterDungeon, 
    this.lvlUp,
    this.pickArmor, 
    this.pickShield, 
    this.pickWeapon,
    this.potion,
    this.toggleHelp
  ]


  //Sound tracks
  startScreen = new Audio('./assets/tracks/fcuk-6-drive.mp3');
  ingame1 = new Audio('./assets/tracks/q-28.mp3');
  ingame3 = new Audio('./assets/tracks/the_wasp_nest.mp3');

  credit = new Audio('./assets/tracks/another-mixdown.wav');
  gameOver = new Audio('./assets/tracks/pitchBlack_10.mp3');

  sideTracks = [
    this.credit,
    this.gameOver
  ];

  ingameTracks = [
    this.ingame1,
    this.startScreen,
    this.ingame3
  ];

  currentTrack = 0;

  constructor() {
    this.initTrackList();
    this.initSfx();
    this.initSideTracks();
  }

  initTrackList() {
    this.ingameTracks.forEach(track => {
      track.currentTime = 0;
      track.volume = 0.2;
      track.addEventListener('ended',this.playTrackList.bind(this));
    });
  }

  playTrackList() {
    this.ingameTracks[this.currentTrack].currentTime = 0;
    this.ingameTracks[this.currentTrack].pause();
    this.currentTrack++;
    if(this.currentTrack === this.ingameTracks.length - 1) {
      this.currentTrack = 0;
    }
    this.ingameTracks[this.currentTrack].currentTime = 0;
    this.ingameTracks[this.currentTrack].play();
  }

  stopTrackList() {
    this.ingameTracks.forEach(track => {
      track.currentTime = 0;
      track.pause();
      track.removeEventListener('ended',this.playTrackList);
    });
  }

  initSideTracks() {
    this.sideTracks.forEach(track => {
      track.currentTime = 0;
      track.volume = 0.2;
    });
  }

  stopSideTracks() {
    this.sideTracks.forEach(track => {
      track.currentTime = 0;
      track.pause();
      track.volume = 0.2;
    });
  }

  initSfx() {
    this.sfx.forEach(effect => {
      effect.currentTime = 0;
      effect.volume = 0.3;
    });
  }

  toggleSound(enabled: boolean) {
    if(enabled) {
    
      this.sfx.forEach(effect => {
        effect.volume = 0.0;
      }); 

      this.ingameTracks.forEach(track => {
        track.volume = 0.0;
      });

      this.sideTracks.forEach(track => {
        track.volume = 0.0;
      });

    } else {

      this.sfx.forEach(effect => {
        effect.volume = 0.3;
      }); 

      this.ingameTracks.forEach(track => {
        track.volume = 0.2;
      });

      this.sideTracks.forEach(track => {
        track.volume = 0.2;
      });
    }
  }
}