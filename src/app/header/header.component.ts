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
    private audioService: AudioService) { }

  gameStatus: string;
  soundEnabled = true;
  fog = true;
  help = false;
  dungeonMap = false;

  ngOnInit() {
     this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
      }
    )
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
    this.gameService.historyMessage.next(`
      <p style="color: lightblue">${this.soundEnabled ? 'sound enabled' : 'sound disabled'}</p>
    `)
  }

  onToggleHelpMap() {
    this.gameService.helperMap.next();
    this.dungeonMap = !this.dungeonMap;
  }

}
