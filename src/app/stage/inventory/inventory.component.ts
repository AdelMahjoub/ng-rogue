import { template } from './../../models/template.model';
import { Subscription } from 'rxjs/Subscription';
import { Item } from './../../models/item.model';
import { GameService } from './../../services/game.service';
import { CameraService } from './../../services/camera.service';
import { Actor } from './../../models/actor.model';
import { EntityService } from './../../services/entity.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  height: number;
  width: number;
  tileSize: number;
  player: Actor;

  gameInfoSubscription: Subscription;

  @ViewChild('info') itemInfo: ElementRef;

  constructor(
    private entityService: EntityService,
    private cameraService: CameraService,
    private gameService: GameService) { }

  ngOnInit() {
    this.width = this.cameraService.getWidth();
    this.height = this.cameraService.getHeight();
    this.tileSize = this.gameService.tileSize;
    this.player = this.entityService.getPlayer();

    this.gameInfoSubscription = this.gameService.info.subscribe(
      (info: string) => {
        this.itemInfo.nativeElement.innerHTML = info;
      }
    )
  }

  ngOnDestroy() {
    this.gameInfoSubscription.unsubscribe();
  }

  onWeaponClick(weapon: Item): void {
    if(!this.player.currentEquipment.weapon) {
      this.player.currentEquipment.weapon = weapon;
      this.player.weapons.splice(this.player.weapons.indexOf(weapon), 1);
      this.player.equip(weapon);
    } else {
      let currentWeapon = this.player.currentEquipment.weapon;
      this.player.weapons.splice(this.player.weapons.indexOf(weapon), 1);
      this.player.weapons.push(currentWeapon);
      this.player.unEquip(currentWeapon);
      this.player.currentEquipment.weapon = weapon;
      this.player.equip(weapon);
    }
  }

  onArmorClick(armor: Item): void {
    if(!this.player.currentEquipment.armor) {
      this.player.currentEquipment.armor = armor;
      this.player.armors.splice(this.player.armors.indexOf(armor), 1);
      this.player.equip(armor);
    } else {
      let currentArmor = this.player.currentEquipment.armor;
      this.player.armors.splice(this.player.armors.indexOf(armor), 1);
      this.player.armors.push(currentArmor);
      this.player.unEquip(currentArmor)
      this.player.currentEquipment.armor = armor;
      this.player.equip(armor);
    }
  }

  onShieldClick(shield: Item): void {
    if(!this.player.currentEquipment.shield) {
      this.player.currentEquipment.shield = shield;
      this.player.shields.splice(this.player.shields.indexOf(shield), 1);
      this.player.equip(shield);
    } else {
      let currentShield = this.player.currentEquipment.shield;
      this.player.shields.splice(this.player.shields.indexOf(shield), 1);
      this.player.shields.push(currentShield);
      this.player.unEquip(currentShield)
      this.player.currentEquipment.shield = shield;
      this.player.equip(shield);
    }
  }

  onHover(item: Item) {
    const itemSpec = `
      <h3>${item.getName()}</h3>
      <h4>${item.getType()}: ${item.getGenre()}</h4>
      <p>Attack bonus: <span>${item.getAtk()}<span></p>
      <p>Defense bonus: <span>${item.getDef()}<span></p>
      <p>Hp bonus: <span>${item.getHp()}<span></p>`;
      
    this.itemInfo.nativeElement.innerHTML = itemSpec;
  }

  onLeave() {
    (<HTMLElement>this.itemInfo.nativeElement).innerHTML = '';
  }

  onDiscardItem(e: Event, item: Item, bag: Item[]) {
    e.preventDefault()
    bag.splice(bag.indexOf(item), 1);
    this.player.potions.push(new Item(template.healthPotion));
    item = null;
  }

}
