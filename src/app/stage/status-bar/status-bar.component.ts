import { GameService } from './../../services/game.service';
import { Actor } from './../../models/actor.model';
import { EntityService } from './../../services/entity.service';
import { CameraService } from './../../services/camera.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {

  tileSize: number;
  width: number;
  height: number;
  style: {};

  player: Actor;

  constructor(
    private cameraService: CameraService,
    private entityService: EntityService,
    private gameService: GameService) { }

  ngOnInit() {
    this.tileSize = this.gameService.tileSize;
    this.width = this.cameraService.getWidth();
    this.height = this.cameraService.getWidth();
    this.player = this.entityService.getPlayer();
    this.style = {
      width: `${this.tileSize * this.width}px`,
      height: `${this.tileSize * 2}px`,
    }
  }

}
