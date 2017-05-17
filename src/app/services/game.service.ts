import { AudioService } from 'app/services/audio.service';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  tileSize = 32;

  START = 'START';
  PLAY = 'PLAY';
  END = 'END';
  WIN = 'WIN';
  CREDIT = 'CREDIT';

  oldSprites = new Image();
  newSprites = new Image();

  audioToLoad = [];
  imagesToLoad = [];

  assetsToLoad: number;
  loadCounter = 0;

  gameStatus = new Subject<string>();
  info = new Subject<string>();
  historyMessage = new Subject<string>();
  toggleFog = new Subject<any>();
  help = new Subject<any>();
  helperMap = new Subject<any>();
  loadedAssets = new Subject<number>();

  constructor(private audioService: AudioService) {

    this.oldSprites.src = './assets/spritesTilesSheet.png';
    this.newSprites.src = './assets/sprites.png';
    this.audioToLoad.push(this.audioService.ingameTracks);
    this.audioToLoad.push(this.audioService.sideTracks);
    this.audioToLoad = this.audioToLoad.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
    this.imagesToLoad.push(this.oldSprites);
    this.imagesToLoad.push(this.newSprites);

    this.assetsToLoad = this.imagesToLoad.length + this.audioToLoad.length;

    this.audioToLoad.forEach((asset: HTMLAudioElement) => {
      asset.addEventListener('loadeddata', () => {
        this.loadCounter++;
        this.loadedAssets.next(this.loadCounter);
        if(this.loadCounter >= this.assetsToLoad) {
          this.gameStatus.next(this.START);
        }
      }, false);
    });

    this.imagesToLoad.forEach((asset: HTMLImageElement) => {
      asset.addEventListener('load', () => {
        this.loadCounter++;
        this.loadedAssets.next(this.loadCounter);
        if(this.loadCounter >= this.assetsToLoad) {
          this.gameStatus.next(this.START);
        }
      });
    });
  }

  preLoadAssets() {
    
  }

  loadHandler() {
    
  }

}