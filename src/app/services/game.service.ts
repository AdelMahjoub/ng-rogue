import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

  tileSize = 32;

  START = 'START';
  PLAY = 'PLAY';
  END = 'END';
  WIN = 'WIN';

  gameStatus = new Subject<string>();
  info = new Subject<string>();
  historyMessage = new Subject<string>();
  toggleFog = new Subject<any>();
  help = new Subject<any>();
  helperMap = new Subject<any>();

  constructor() { 
    
  }

}