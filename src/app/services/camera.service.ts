import { EntityService } from './entity.service';
import { DungeonService } from './dungeon.service';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class CameraService {

  cameraUpdated = new Subject<boolean>();

  private topCornerX = 0;
  private topCornerY = 0;
  private width = 20;
  private height = 15;

  constructor(
    private dungeonService: DungeonService,
    private entityService: EntityService) { }

  getCameraX(): number {
    return this.topCornerX;
  }

  getCameraY(): number {
    return this.topCornerY;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  updatePosition() {
    let player = this.entityService.getPlayer();

    this.topCornerX = Math.max(0, player.getX() - ~~(this.width / 2));
    this.topCornerY = Math.max(0, player.getY() - ~~(this.height / 2));

    this.topCornerX = Math.min(this.topCornerX, this.dungeonService.getWidth() - this.width);
    this.topCornerY = Math.min(this.topCornerY, this.dungeonService.getHeight() - this.height);
  }

}