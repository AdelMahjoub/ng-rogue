import { AudioService } from 'app/services/audio.service';
import { GameService } from './game.service';
import { Item } from './../models/item.model';
import { Subject } from 'rxjs/Subject';
import { template } from './../models/template.model';
import { Actor } from './../models/actor.model';
import { Entity } from './../models/entity.model';
import { DungeonService } from './dungeon.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EntityService {

  private width: number;
  private height: number;

  private player: Actor;

  private entityMap: Entity[][];

  constructor(
    private dungeonService: DungeonService,
    private gameService: GameService,
    private audioService: AudioService) {
    this.width = this.dungeonService.getWidth();
    this.height = this.dungeonService.getHeight();
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getMap(): Entity[][] {
    return this.entityMap;
  }

  getPlayer(): Actor {
    return this.player;
  }

  getEntityAt(x: number, y: number): Entity {
    return this.entityMap[x][y];
  }

  getEmptyPosition(): {x: number; y: number} {
    let position = this.dungeonService.getRandomWalkablePosition();
    let x = position.x;
    let y = position.y;
    if(this.getEntityAt(x, y)) {
      return this.getEmptyPosition();
    }
    return position;
  }

  init(): void {
    this.entityMap = [];
    for(let x = 0; x < this.width; x++) {
      this.entityMap[x] = [];
      for(let y = 0; y < this.height; y++) {
        this.entityMap[x][y] = null;
      }
    }
  }

  addPlayer(): void {
    let position = this.getEmptyPosition();
    let x = position.x;
    let y = position.y;
    this.player = new Actor(template.player);
    this.player.setX(x);
    this.player.setY(y);
    this.entityMap[x][y] = this.player;
  }

  addActor(template: {}): void {
    let position = this.getEmptyPosition();
    let x = position.x;
    let y = position.y;
    let actor = new Actor(template);
    actor.setX(x);
    actor.setY(y);
    this.entityMap[x][y] = actor;
  }

  addItem(template: {}): void {
    let position = this.getEmptyPosition();
    let x = position.x;
    let y = position.y;
    let item = new Item(template);
    item.setX(x);
    item.setY(y);
    this.entityMap[x][y] = item;
  }

  removeEntity(entity: Entity): void {
    let x = entity.getX();
    let y = entity.getY();
    this.entityMap[x][y] = null;
  }

  tryMovePlayer(dx: number, dy: number): void {
    let newX = this.player.getX() + dx;
    let newY = this.player.getY() + dy;

    let targetTile = this.dungeonService.getTileAt(newX, newY);
    let targetEntity = this.getEntityAt(newX, newY);

    if(!targetEntity) {
      if(targetTile.isWalkable()) {
        this.updatePlayerPosition(newX, newY);
      }
    } else {
      switch(targetEntity.getType()) {
        case 'item':
          this.player.loot(targetEntity, this.gameService.historyMessage);
          switch(targetEntity.getGenre()) {
            case 'potion': 
              this.removeEntity(targetEntity);
              this.gameService.historyMessage.next(`
                <p style="color: green;">You picked a ${targetEntity.getName()}</p>
              `);
              this.audioService.potion.currentTime = 0;
              this.audioService.potion.play();
              this.updatePlayerPosition(newX, newY);
              break;
            case 'weapon':
              if(!this.player.weaponsFull) {
                this.gameService.historyMessage.next(`
                  <p style="color: green;">You picked a ${targetEntity.getName()}</p>
                `);
                this.removeEntity(targetEntity);
                this.audioService.pickWeapon.currentTime = 0;
                this.audioService.pickWeapon.play();
                this.updatePlayerPosition(newX, newY);
              } else {
                this.switchEntityPositions(targetEntity, newX, newY);
              }
              break;
            case 'armor':
              if(!this.player.armorsFull) {
                this.gameService.historyMessage.next(`
                  <p style="color: green;">You picked a ${targetEntity.getName()}</p>
                `);
                this.removeEntity(targetEntity);
                this.audioService.pickArmor.currentTime = 0;
                this.audioService.pickArmor.play();
                this.updatePlayerPosition(newX, newY);
              } else {
                this.switchEntityPositions(targetEntity, newX, newY);
              }
              break;
            case 'shield':
              if(!this.player.shieldsFull) {
                this.gameService.historyMessage.next(`
                  <p style="color: green;">You picked a ${targetEntity.getName()}</p>
                `);
                this.removeEntity(targetEntity);
                this.audioService.pickShield.currentTime = 0;
                this.audioService.pickShield.play();
                this.updatePlayerPosition(newX, newY);
              } else {
                this.switchEntityPositions(targetEntity, newX, newY);
              }
              break;
          }
          break;
        case 'actor':
          this.player.dealDamage(<Actor>targetEntity, this.gameService.historyMessage);
          this.audioService.attack.currentTime = 0;
          this.audioService.attack.play();
          if(targetEntity.getHp() <= 0) {
            this.player.tryLvlUp(<Actor>targetEntity, this.audioService.lvlUp, this.gameService.historyMessage);
            this.removeEntity(targetEntity);
            this.updatePlayerPosition(newX, newY);
            if(targetEntity.getGenre() === 'boss') {
              this.gameService.gameStatus.next(this.gameService.WIN);
            }
          } else {
            (<Actor>targetEntity).dealDamage(this.player, this.gameService.historyMessage);
            if(this.player.getHp() <= 0) {
              this.gameService.gameStatus.next(this.gameService.END);
            }
          }
          break;
      }
    }
  }

  updatePlayerPosition(newX: number, newY: number): void {
    let previousX = this.player.getX();
    let previousY = this.player.getY();
    this.entityMap[previousX][previousY] = null;
    this.player.setX(newX);
    this.player.setY(newY);
    this.entityMap[newX][newY] = this.player;
  }

  switchEntityPositions(entity: Entity, newX: number, newY: number): void {
    let previousX = this.player.getX();
    let previousY = this.player.getY();
    this.entityMap[previousX][previousY] = entity;
    this.player.setX(newX);
    this.player.setY(newY);
    this.entityMap[newX][newY] = this.player;
  }


}