import { Subscription } from 'rxjs/Subscription';
import { GameService } from './../services/game.service';
import { CameraService } from './../services/camera.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  loadingAssetsSubscription: Subscription;

  assetsToLoad: number;
  assetsLoaded = 0;

  gameStatusSubscription: Subscription;
  gameHelpSubscription: Subscription;
  gameFogSubscription: Subscription;
  gameHelpMapSubscription: Subscription;

  showHelp = false;
  showHelpMap = false;

  public width: number; // game screen width
  public height: number; // game screen height

  public screen: null[][];

  public tileSize = 32; // tile scale
  public style: {};
  public gameStatus = 'LOADING';
  public fog = true;

  constructor(
    private cameraService: CameraService,
    private gameService: GameService) {}

  ngOnInit() {

    this.assetsToLoad = this.gameService.assetsToLoad;

    this.loadingAssetsSubscription = this.gameService.loadedAssets.subscribe(
      (loadCounter: number) => {
        this.assetsLoaded = loadCounter;
      }
    )

    this.width = this.cameraService.getWidth();
    this.height = this.cameraService.getHeight();

    this.initscreen(); // initialize game screen

    // screen css dimension
    this.style = {
      width: `${this.width * this.tileSize}px`,
      height: `${this.height * this.tileSize}px`
    }

    this.gameStatusSubscription = this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
      }
    )

    this.gameFogSubscription = this.gameService.toggleFog.subscribe(
      () => {
        this.fog = !this.fog
      }
    )

    this.gameHelpSubscription = this.gameService.help.subscribe(
      () => {
        this.showHelp = !this.showHelp;
      }
    )

    this.gameHelpMapSubscription = this.gameService.helperMap.subscribe(
      () => {
        this.showHelpMap = !this.showHelpMap;
      }
    )

  }

  ngOnDestroy() {
    this.gameStatusSubscription.unsubscribe();
    this.gameHelpSubscription.unsubscribe();
    this.gameFogSubscription.unsubscribe();
    this.loadingAssetsSubscription.unsubscribe();
  }

  initscreen(): void {
    this.screen = [];
    for(let x = 0; x < this.width; x++) {
      this.screen[x] = [];
      for(let y = 0; y < this.height; y++) {
        this.screen[x][y] = null;
      }
    }
  }

  returnToStartScreen() {
    this.gameService.gameStatus.next('START')
  }

}
