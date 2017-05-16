import { GameService } from './../../services/game.service';
import { Subscription } from 'rxjs/Subscription';
import { CameraService } from './../../services/camera.service';
import { EntityService } from './../../services/entity.service';
import { HelperService } from './../../services/helper.service';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-help-map',
  templateUrl: './help-map.component.html',
  styleUrls: ['./help-map.component.css']
})
export class HelpMapComponent implements OnInit, OnDestroy {

  cameraSubscription: Subscription;
  playerPositionSubscription: Subscription;
  gameStatusSubscription: Subscription;

  constructor(
    private gameService: GameService,
    private helperService: HelperService,
    private entityService: EntityService,
    private cameraService: CameraService) { }

  @ViewChild('canvasMap') canvas: ElementRef;

  ctx: CanvasRenderingContext2D;

  width: number;
  height: number;

  zoomLevel = 2.5;

  canvasWidth: number;
  canvasHeight: number;

  @Input() tileSize: number;

  worldMap: any;
  style: {}

  gameStatus: string;

  ngOnInit() {

    this.width = this.helperService.width;
    this.height = this.helperService.height;

    this.canvasWidth = this.width * this.zoomLevel;
    this.canvasHeight = this.height * this.zoomLevel;

    this.worldMap = this.helperService.helpMap;

    let screenWidth = this.tileSize * this.cameraService.getWidth();
    let screenHeight = this.tileSize * this.cameraService.getHeight();

    this.style = {
      position: 'absolute',
      top: (screenHeight - this.canvasHeight) / 2 + 'px',
      left: (screenWidth - this.canvasWidth) / 2 + 'px',
      opacity: .6
    };

    (<HTMLCanvasElement>this.canvas.nativeElement).width = this.canvasWidth;
    (<HTMLCanvasElement>this.canvas.nativeElement).height = this.canvasHeight;
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');

    this.renderBackground();

    if(this.gameStatus === 'PLAY') {
      let playerX = this.entityService.getPlayer().getX();
      let playerY = this.entityService.getPlayer().getY();
      this.worldMap[playerX][playerY].visited = true;
      this.updateWorldMap(playerX, playerY);
    }

    this.cameraSubscription = this.cameraService.cameraUpdated.subscribe(
      () => {
        let playerX = this.entityService.getPlayer().getX();
        let playerY = this.entityService.getPlayer().getY();
        this.worldMap[playerX][playerY].visited = true;
        this.updateWorldMap(playerX, playerY);
      }
    );

    this.gameStatusSubscription = this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
        this.reset();
      }
    );
  }

  renderBackground() {
    this.ctx.beginPath();
      this.ctx.save();
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.ctx.restore();
    this.ctx.closePath();
  }

  updateWorldMap(playerX: number, playerY: number) {
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        if(this.worldMap[x][y].visited && x === playerX && y === playerY) {
           this.drawPosition(x, y, 'gold');
        } else if(this.worldMap[x][y].visited && (x !== playerX || y !== playerY)) {
          this.drawPosition(x, y, 'green');
        }
        let entity = this.entityService.getEntityAt(x, y);
        if(entity && entity.getGenre() !== 'player') {
          if(entity.getType() === 'item') {
            this.drawPosition(x, y, 'lightblue');
          } else {
            this.drawPosition(x, y, 'red');
          }
        }
      }
    }
  }

  drawPosition(x: number, y: number, color: string) {
    this.ctx.beginPath();
      this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.zoomLevel, y * this.zoomLevel, this.zoomLevel, this.zoomLevel);
      this.ctx.restore();
    this.ctx.closePath();
  }

  reset() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.helperService.initHelpMap();
    this.worldMap = this.helperService.helpMap;
    this.renderBackground();
  }

  ngOnDestroy() {
    this.cameraSubscription.unsubscribe();
    this.playerPositionSubscription.unsubscribe();
    this.gameStatusSubscription.unsubscribe();
  }




}
