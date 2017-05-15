import { GameService } from './../services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private gameService: GameService) { }

  gameStatus: string;

  ngOnInit() {
     this.gameService.gameStatus.subscribe(
      (status: string) => {
        this.gameStatus = status;
      }
    )
  }

  onToggleFog() {
    this.gameService.toggleFog.next();
  }

  onToggleHelp() {
    this.gameService.help.next();
  }

  onToggleSound() {

  }

}
