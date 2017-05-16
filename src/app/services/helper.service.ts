import { EntityService } from './entity.service';
import { DungeonService } from './dungeon.service';
import { Injectable } from '@angular/core';

interface position {
  x: number;
  y: number;
  visited: boolean;
}

@Injectable()
export class HelperService {

  width: number;
  height: number;

  helpMap: position[][];

  constructor(
    private dungeonService: DungeonService) {
      
      this.width = this.dungeonService.getWidth();
      this.height = this.dungeonService.getHeight();
      this.initHelpMap();
    }

  initHelpMap(): void {
    this.helpMap = [];
    for(let x = 0; x < this.width; x++) {
      this.helpMap[x] = [];
      for(let y = 0; y < this.height; y++) {
        this.helpMap[x][y] = {x, y, visited: false};
      }
    }
  }
}