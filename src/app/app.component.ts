import { AudioService } from 'app/services/audio.service';
import { Subscription } from 'rxjs/Subscription';
import { GameService } from './services/game.service';
import { template } from './models/template.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { DungeonService } from './services/dungeon.service';
import { EntityService } from './services/entity.service';
import { CameraService } from './services/camera.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  gameStatus = 'LOADING';
  gameStatusSubscription: Subscription;
  keyboardListenerInit = false;

  constructor(
    private dungeonService: DungeonService,
    private entityService: EntityService,
    private cameraService: CameraService,
    private gameService: GameService,
    private audioService: AudioService) {}

  ngOnInit() {

    this.gameStatusSubscription = this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
        if(status === 'PLAY') {

          this.audioService.stopSideTracks();
          this.audioService.stopTrackList();
          this.audioService.startScreen.loop = false;
          this.audioService.ingame1.play();

          this.newGame();

          this.gameService.historyMessage.next('');

          this.audioService.enterDungeon.currentTime = 0;
          this.audioService.enterDungeon.play();

        } else if(status === 'END') {
          this.audioService.stopTrackList();
          this.audioService.stopSideTracks();
          this.audioService.gameOver.play();
        } else if(status === 'CREDIT' || status === 'WIN') {
          this.audioService.stopTrackList();
          this.audioService.stopSideTracks();
          this.audioService.credit.play();
        } else if(status === 'START') {
          this.audioService.stopTrackList();
          this.audioService.stopSideTracks();
          
          this.audioService.startScreen.currentTime = 0;
          this.audioService.startScreen.loop = true;
          this.audioService.startScreen.play();
          if(!this.keyboardListenerInit) {
            window.addEventListener('keydown', this.handleKeyDown.bind(this));
            this.keyboardListenerInit = true;
          }
        }
      }
    )
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',this.handleKeyDown);
    this.keyboardListenerInit = false;
    this.gameStatusSubscription.unsubscribe();
  }

  newGame(): void {
    this.dungeonService.buildMap();
    this.entityService.init();
    this.entityService.addPlayer();
    this.cameraService.initPosition();

    Object.keys(template).forEach(key => {
      let population = template[key]['population'];
      let type = template[key]['type'];
      switch(type) {
        case 'actor':
          for(let i = 0; i < population; i++) {
            this.entityService.addActor(template[key]);
          }
        break;
        case 'item':
          for(let i = 0; i < population; i++) {
            this.entityService.addItem(template[key]);
          }
        break;
      }
    })
  }

  handleKeyDown(e: KeyboardEvent): void {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
      case 'z':
      case 'Z':
      case 'K':
      case 'k':
        if(this.gameStatus === 'PLAY') {
          this.entityService.tryMovePlayer(0, -1);
          this.cameraService.updatePosition();
          this.cameraService.cameraUpdated.next(true);
        }
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
      case 'J':
      case 'j':
        if(this.gameStatus === 'PLAY') {
          this.entityService.tryMovePlayer(0, 1);
          this.cameraService.updatePosition();
          this.cameraService.cameraUpdated.next(true);
        }
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'q':
      case 'Q':
      case 'h':
      case 'H':
        if(this.gameStatus === 'PLAY') {
          this.entityService.tryMovePlayer(-1, 0);
          this.cameraService.updatePosition();
          this.cameraService.cameraUpdated.next(true);
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
      case 'L':
      case 'l':
        if(this.gameStatus === 'PLAY') {
          this.entityService.tryMovePlayer(1, 0);
          this.cameraService.updatePosition();
          this.cameraService.cameraUpdated.next(true);
        }
        break;
      case 'p':
      case 'P':
        if(this.gameStatus === 'PLAY') {
          this.entityService.getPlayer().drinkPotion(this.audioService.potion);
        }
        break;
      case 'f':
      case 'F':
        this.gameService.toggleFog.next();
        break;
      case 'Enter':
        if(this.gameStatus === 'WIN') {
          this.gameService.gameStatus.next(this.gameService.CREDIT);
        } else if (this.gameStatus === 'END'){
          this.gameService.gameStatus.next(this.gameService.PLAY);
        } else if(this.gameStatus === 'START') {
          this.gameService.gameStatus.next(this.gameService.PLAY);
        }
        break;
    }
  }

}
