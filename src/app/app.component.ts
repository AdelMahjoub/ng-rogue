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

  gameStatus = 'START';
  gameStatusSubscription: Subscription;

  constructor(
    private dungeonService: DungeonService,
    private entityService: EntityService,
    private cameraService: CameraService,
    private gameService: GameService) {}

  ngOnInit() {
    
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.gameStatusSubscription = this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
        if(status === 'PLAY') {
          this.newGame();
        }
      }
    )
  }

  ngOnDestroy() {
    window.removeEventListener('keydown',this.handleKeyDown);
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

    // for(let i = 0; i < this.goblins; i++) {
    //   this.entityService.addActor(template.goblin);
    // }

    // this.entityService.addActor(template.giantSnake);

    // for(let i = 0; i < this.potions; i++) {
    //   this.entityService.addItem(template.healthPotion);
    // }

    // this.entityService.addItem(template.leatherArmor);
    // this.entityService.addItem(template.longSword);
    // this.entityService.addItem(template.warriorShield);
  }

  handleKeyDown(e: KeyboardEvent): void {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
      case 'z':
      case 'Z':
        this.entityService.tryMovePlayer(0, -1);
        this.cameraService.updatePosition();
        this.cameraService.cameraUpdated.next(true);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        this.entityService.tryMovePlayer(0, 1);
        this.cameraService.updatePosition();
        this.cameraService.cameraUpdated.next(true);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
      case 'q':
      case 'Q':
        this.entityService.tryMovePlayer(-1, 0);
        this.cameraService.updatePosition();
        this.cameraService.cameraUpdated.next(true);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        this.entityService.tryMovePlayer(1, 0);
        this.cameraService.updatePosition();
        this.cameraService.cameraUpdated.next(true);
        break;
      case 'p':
      case 'P':
        this.entityService.getPlayer().drinkPotion();
        break;
      case 'f':
      case 'F':
        this.gameService.toggleFog.next();
        break;
      case 'Enter':
        this.gameService.gameStatus.next(this.gameService.PLAY);
        break;
    }
  }

}
