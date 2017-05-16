import { GameService } from './../../services/game.service';
import { Entity } from './../../models/entity.model';
import { Subscription } from 'rxjs/Subscription';
import { CameraService } from './../../services/camera.service';
import { DungeonService } from './../../services/dungeon.service';
import { EntityService } from './../../services/entity.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stage-fog',
  templateUrl: './stage-fog.component.html',
  styleUrls: ['./stage-fog.component.css']
})
export class StageFogComponent implements OnInit {

  @Input() screenX: number; // position on screen's x-axis
  @Input() screenY: number; // position on screen's y-axis
  @Input() tileSize: number;

  radius = 6;
  style = {}
  opacity: number;

  cameraSubscription: Subscription;
  
  constructor(
    private entityService: EntityService,
    private dungeonService: DungeonService,
    private cameraService: CameraService,
    private gameService: GameService) { }

  ngOnInit() {
    this.updateFog();

    this.cameraSubscription = this.cameraService.cameraUpdated.subscribe(
      (updated: boolean) => {
        this.updateFog();
      }
    )

  }

  updateFog() {
    let offsetX = this.cameraService.getCameraX();
    let offsetY = this.cameraService.getCameraY();
    let x = this.screenX + offsetX; // entity's x-axis position in the dungeon map
    let y = this.screenY + offsetY; // entity's y-axis position in the dungeon map
    let tile = this.dungeonService.getTileAt(x, y);
    let player = this.entityService.getPlayer();

    let vx = tile.getX() - player.getX();
    let vy = tile.getY() - player.getY();
    let magnitude = Math.sqrt(vx * vx + vy * vy);

    if(magnitude <= this.radius) {
      this.opacity = magnitude / this.radius
    } else {
      this.opacity = 1;
    }

    this.style = {
      width: `${this.tileSize}px`,
      height: `${this.tileSize}px`,
      top: `${this.screenY * this.tileSize}px`,
      left: `${this.screenX * this.tileSize}px`,
      opacity: this.opacity
    }
  }

   onHover() {
    let offsetX = this.cameraService.getCameraX();
    let offsetY = this.cameraService.getCameraY();
    let x = this.screenX + offsetX;
    let y = this.screenY + offsetY;
    let entity = this.entityService.getEntityAt(x, y)
    if(entity) {
      const entityInfo = `
        <p>${entity.getName()}</p>
        <p>${entity.getType()}: ${entity.getGenre()}</p>
        <p>Atk : <span>${entity.getAtk()}<span></p>
        <p>Def : <span>${entity.getDef()}<span></p>
        <p>Hp  : <span>${entity.getHp()}<span></p>
        <p>Xp  : <span>${entity.getXp()}<span></p>`;
      this.gameService.info.next(entityInfo);
    }
  }

  onLeave() {
    this.gameService.info.next('');
  }

}
