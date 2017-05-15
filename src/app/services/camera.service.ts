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

  innerTopBoundry(): number {
    return ~~(this.topCornerY + this.height * 0.2);
  }

  innerBottomBoundry(): number {
    return ~~(this.topCornerY + this.height * 0.8);
  }

  innerLeftBoundry(): number {
    return ~~(this.topCornerX + this.width * 0.2);
  }

  innerRightBoundry(): number {
    return ~~(this.topCornerX + this.width * 0.8);
  }

  initPosition(): void {
    let player = this.entityService.getPlayer();

    this.topCornerX = Math.max(0, Math.min(player.getX() - ~~(this.width / 2), this.dungeonService.getWidth() - this.width));
    this.topCornerY = Math.max(0, Math.min(player.getY() - ~~(this.height / 2), this.dungeonService.getHeight() - this.height));

  }

  updatePosition(): void {
    let player = this.entityService.getPlayer();
    
    let playerX = player.getX();
    let playerY = player.getY();

    if(playerX < this.innerLeftBoundry()) {
      this.topCornerX = ~~(playerX - this.width * 0.2);
    }

    if(playerX > this.innerRightBoundry()) {
      this.topCornerX = ~~(playerX - this.width * 0.8);
    }

    if(playerY < this.innerTopBoundry()) {
      this.topCornerY = ~~(playerY - this.height * 0.2);
    }

    if(playerY > this.innerBottomBoundry()) {
      this.topCornerY = ~~(playerY - this.height * 0.8);
    }

    this.topCornerX = Math.max(0, Math.min(this.topCornerX, this.dungeonService.getWidth() - this.width));
    this.topCornerY = Math.max(0, Math.min(this.topCornerY, this.dungeonService.getHeight() - this.height));

  }

}