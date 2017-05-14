import { GameService } from './../../services/game.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Entity } from './../../models/entity.model';
import { CameraService } from './../../services/camera.service';
import { EntityService } from './../../services/entity.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stage-entity-tile',
  templateUrl: './stage-entity-tile.component.html',
  styleUrls: ['./stage-entity-tile.component.css']
})
export class StageEntityTileComponent implements OnInit, OnDestroy {

 public cameraSubscription: Subscription;

  @Input() screenX: number; // position on screen's x-axis
  @Input() screenY: number; // position on screen's y-axis
  @Input() tileSize: number;

  private offsetX: number; // camera's top corner x-axis position 
  private offsetY: number; // camera's top corner y-axis position

  public entity: Entity;
  public style: {};

  constructor(
    private entityService: EntityService,
    private cameraService: CameraService,
    private gameService: GameService) { }

  ngOnInit() {

    // css position
    this.style = {
      width: `${this.tileSize}px`,
      height: `${this.tileSize}px`,
      top: `${this.screenY * this.tileSize}px`,
      left: `${this.screenX * this.tileSize}px`
    }

    this.updateEntity();

    this.cameraSubscription = this.cameraService.cameraUpdated.subscribe(
      (updated: boolean) => {
        if(updated) {
          this.updateEntity();
        }
      }
    )
  }

  ngOnDestroy() {
    this.cameraSubscription.unsubscribe();
  }

  updateEntity() {
    this.offsetX = this.cameraService.getCameraX();
    this.offsetY = this.cameraService.getCameraY();
    let x = this.screenX + this.offsetX; // entity's x-axis position in the dungeon map
    let y = this.screenY + this.offsetY; // entity's y-axis position in the dungeon map
    this.entity = this.entityService.getEntityAt(x, y);
  }

  onHover(entity: Entity) {
    const entityInfo = `
      <h3>${entity.getName()}</h3>
      <h4>${entity.getType()}: ${entity.getGenre()}</h4>
      <p>Lvl : <span>${entity.getLvl()}<span></p>
      <p>Atk : <span>${entity.getAtk()}<span></p>
      <p>Def : <span>${entity.getDef()}<span></p>
      <p>Hp  : <span>${entity.getHp()}<span></p>
      <p>Xp  : <span>${entity.getXp()}<span></p>`;
    this.gameService.info.next(entityInfo);
  }

  onLeave() {
    this.gameService.info.next('');
  }

}
