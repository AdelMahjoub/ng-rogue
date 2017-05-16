import { AudioService } from 'app/services/audio.service';
import { template } from './../../models/template.model';
import { Item } from './../../models/item.model';
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
    private gameService: GameService,
    private audioService: AudioService) { }

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

  onWeaponSlotClick(weapon: Item): void {
    if(weapon) {
      if(this.player.getWeapons().length === this.player.maxEquipment) {
        this.gameService.historyMessage.next(`
          <p style="color: red;">Weapons bag is full.</p>
        `);
      } else {
        this.audioService.pickWeapon.currentTime = 0;
        this.audioService.pickWeapon.play();
        let currentWeapon = weapon;
        this.player.currentEquipment.weapon = null;
        this.player.unEquip(weapon);
        this.player.weapons.push(weapon);
      }
    }
  }

  onArmorSlotClick(armor: Item): void {
    if(armor) {
      if(this.player.getArmors().length === this.player.maxEquipment) {
        this.gameService.historyMessage.next(`
          <p style="color: red;">Armors bag is full.</p>
        `);
      } else {
        this.audioService.pickArmor.currentTime = 0;
        this.audioService.pickArmor.play();
        let currentArmor = armor;
        this.player.currentEquipment.armor = null;
        this.player.unEquip(armor);
        this.player.armors.push(armor);
      }
    }
  }

  onShieldSlotClick(shield: Item): void {
    if(shield) {
      if(this.player.getShields().length === this.player.maxEquipment) {
        this.gameService.historyMessage.next(`
          <p style="color: red;">Shields bag is full.</p>
        `);
      } else {
        this.audioService.pickShield.currentTime = 0;
        this.audioService.pickShield.play();
        let currentShield = shield;
        this.player.currentEquipment.shield = null;
        this.player.unEquip(shield);
        this.player.shields.push(shield);
      }
    }
  }

  onDiscardEquipment(e: Event, item: Item): void {
    e.preventDefault();
    if(item) {
      this.player.unEquip(item);
      Object.keys(this.player.currentEquipment).forEach(key => {
        if(this.player.currentEquipment[key] === item) {
          this.player.currentEquipment[key] = null;
        }
      })
      item = null;
      this.player.potions.push(new Item(template.healthPotion));
    }
  }

  onPotionClick() {
    this.player.drinkPotion(this.audioService.potion);
  }

  onHover(item: Item) {
    if(item) {
      const itemSpec = `
      <h3>${item.getName()}</h3>
      <h4>${item.getType()}: ${item.getGenre()}</h4>
      <p>Attack bonus: <span>${item.getAtk()}<span></p>
      <p>Defense bonus: <span>${item.getDef()}<span></p>
      <p>Hp bonus: <span>${item.getHp()}<span></p>`;
      
      this.gameService.info.next(itemSpec);
    }
  }

  onLeave() {
     this.gameService.info.next('');
  }

}
