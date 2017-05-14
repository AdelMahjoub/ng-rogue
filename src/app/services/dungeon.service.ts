import { Subject } from 'rxjs/Subject';
import { Tile } from './../models/tile.model';
import ROT from 'rot-js';
import { Injectable } from '@angular/core';

@Injectable()
export class DungeonService {

  private width = 100;
  private height = 100;

  private dungeonMap: Tile[][];

  constructor() { }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getTileAt(x: number, y: number): Tile {
    return this.dungeonMap[x][y];
  }

  getMap(): Tile[][] {
    return this.dungeonMap;
  }

  getRandomWalkablePosition(): {x: number, y: number} {
    let x = ~~(Math.random() * this.width);
    let y = ~~(Math.random() * this.height);
    let tile = this.getTileAt(x, y);
    if(tile.isWalkable()) {
      return {x, y}
    }
    return this.getRandomWalkablePosition();
  }

  buildMap() {
    this.dungeonMap = []
    for(let x = 0; x < this.width; x++) {
      this.dungeonMap[x] = [];
      for(let y = 0; y < this.height; y++) {
        this.dungeonMap[x][y] = null;
      }
    }

    const digger = new ROT.Map.Uniform(this.width, this.height);
    digger.create((x: number, y: number, value: number) => {
      let tile = {x, y}
      if(value === 1) {
        tile['className'] = 'wall';
      } else {
        tile['className'] = 'floor';
        tile['walkable'] = true;
      }

      this.dungeonMap[x][y] = new Tile(tile);
    });
    this.removeUnwantedWalls();
  }

  // Only keep walls that are adjacent to ground
  // check if a tile is adjacent to a ground tile
  isAdjacentToGround(x: number, y: number): boolean {
    // out of dungeon boundries
    if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return false;
    }
    for(let w = -1; w < 2; w++) {
      // x out of boundries
      if((x + w) < 0 || (x + w) >= this.width) {
        continue;
      }
      for(let h = - 1; h < 2; h++) {
        // y out of boundries
        if((y + h) < 0 || (y + h) >= this.height) {
            continue;
        }
        if( w !== 0 || h !== 0) {
          let tile = this.getTileAt(x + w, y + h);
          if(tile.isWalkable()) {
              return true;
          }
        }
      }
    }
    return false;
  }
  // destroy walls that are not adjacent to ground
  removeUnwantedWalls() {
    for(let x = 0; x < this.width; x++) {
      for(let y = 0; y < this.height; y++) {
        if(!this.isAdjacentToGround(x, y)) {
          let tile = this.getTileAt(x, y);
          tile.setClassName('null');
        }
      }
    }
  }




}