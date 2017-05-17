import { CameraService } from './../services/camera.service';
import { AudioService } from 'app/services/audio.service';
import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private audioService: AudioService,
    private cameraService: CameraService) { }

  gameStatus = 'LOADING';
  soundEnabled = true;
  fog = true;
  help = false;
  dungeonMap = false;

  tileSize: number;
  width: number;
  style: {};

  ngOnInit() {
     this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
      }
    )
    this.tileSize = this.gameService.tileSize;
    this.width = this.cameraService.getWidth();
    this.style = {
      width: this.tileSize * this.width + 'px',
    }
  }

  onToggleFog() {
    this.audioService.toggleHelp.currentTime = 0;
    this.audioService.toggleHelp.play();
    this.gameService.toggleFog.next();
    this.fog = !this.fog;
  }

  onToggleHelp() {
    this.audioService.toggleHelp.currentTime = 0;
    this.audioService.toggleHelp.play();
    this.gameService.help.next();
    this.help = !this.help;
  }

  onToggleSound() {
    this.audioService.toggleSound(this.soundEnabled);
    this.soundEnabled = !this.soundEnabled;
  }

  onToggleHelpMap() {
    this.gameService.helperMap.next();
    this.dungeonMap = !this.dungeonMap;
  }

  onToggleCredit() {
    this.gameService.gameStatus.next('CREDIT');
    this.audioService.toggleSound(!this.soundEnabled);
  }
  onExit() {
    this.gameService.gameStatus.next('START');
    if(this.dungeonMap) {
      this.gameService.helperMap.next();
      this.dungeonMap = !this.dungeonMap;
    }
  }

}
