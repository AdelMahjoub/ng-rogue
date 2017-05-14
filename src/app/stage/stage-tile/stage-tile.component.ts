import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EntityService } from './../../services/entity.service';
import { CameraService } from './../../services/camera.service';
import { Tile } from './../../models/tile.model';
import { DungeonService } from './../../services/dungeon.service';


@Component({
  selector: 'app-stage-tile',
  templateUrl: './stage-tile.component.html',
  styleUrls: ['./stage-tile.component.css']
})
export class StageTileComponent implements OnInit, OnDestroy {

  public cameraSubscription: Subscription;

  @Input() screenX: number; // position on screen's x-axis
  @Input() screenY: number; // position on screen's y-axis
  @Input() tileSize: number;

  private offsetX: number; // camera's top corner x-axis position 
  private offsetY: number; // camera's top corner y-axis position

  public tile: Tile;
  public style: {};

  constructor(
    private dungeonService: DungeonService,
    private cameraService: CameraService) { }

  ngOnInit() {

    // css position
    this.style = {
      width: `${this.tileSize}px`,
      height: `${this.tileSize}px`,
      top: `${this.screenY * this.tileSize}px`,
      left: `${this.screenX * this.tileSize}px`
    }
    this.updateTile();

    this.cameraSubscription = this.cameraService.cameraUpdated.subscribe(
      (updated: boolean) => {
        if(updated) {
          this.updateTile();
        }
      }
    )
  }

  ngOnDestroy() {
    this.cameraSubscription.unsubscribe();
  }

  updateTile() {
    this.offsetX = this.cameraService.getCameraX();
    this.offsetY = this.cameraService.getCameraY();
    let x = this.screenX + this.offsetX; // tile's x-axis position in the dungeon map
    let y = this.screenY + this.offsetY; // tile's y-axis position in the dungeon map
    this.tile = this.dungeonService.getTileAt(x,y);
  }

}
