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
    private gameService: GameService) { }

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
    if(this.player.getWeapons().length === this.player.maxEquipment) {
      console.log('weapons bag is full');
    } else {
      let currentWeapon = weapon;
      this.player.currentEquipment.weapon = null;
      this.player.unEquip(weapon);
      this.player.weapons.push(weapon);
    }
  }

  onArmorSlotClick(armor: Item): void {
    if(this.player.getArmors().length === this.player.maxEquipment) {
      console.log('armors bag is full');
    } else {
      let currentArmor = armor;
      this.player.currentEquipment.armor = null;
      this.player.unEquip(armor);
      this.player.armors.push(armor);
    }
  }

  onShieldSlotClick(shield: Item): void {
    if(this.player.getShields().length === this.player.maxEquipment) {
      console.log('shields bag is full');
    } else {
      let currentShield = shield;
      this.player.currentEquipment.shield = null;
      this.player.unEquip(shield);
      this.player.shields.push(shield);
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
    this.player.drinkPotion();
  }

}
