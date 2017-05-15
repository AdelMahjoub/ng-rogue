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

  onWeaponClick(index: number): void {
    if(!this.player.currentEquipment.weapon) {
      this.player.currentEquipment.weapon = this.player.getWeapons()[index];
      this.player.getWeapons().splice(index, 1);
      this.player.equip(this.player.currentEquipment.weapon);
    } else {
      let currentWeapon = this.player.currentEquipment.weapon;
      let newWeapon = this.player.getWeapons()[index];
      this.player.getWeapons().splice(index, 1);
      this.player.getWeapons().push(currentWeapon);
      this.player.currentEquipment.weapon = newWeapon;
    }
  }

  onArmorClick(index: number): void {
    if(!this.player.currentEquipment.armor) {
      this.player.currentEquipment.armor = this.player.getArmors()[index];
      this.player.getArmors().splice(index, 1);
      this.player.equip(this.player.currentEquipment.armor);
    } else {
      let currentArmor = this.player.currentEquipment.armor;
      let newArmor = this.player.getArmors()[index];
      this.player.getArmors().splice(index, 1);
      this.player.getArmors().push(currentArmor);
      this.player.currentEquipment.armor = newArmor;
    }
  }

  onShieldClick(index: number): void {
    if(!this.player.currentEquipment.shield) {
      this.player.currentEquipment.shield = this.player.getShields()[index];
      this.player.getShields().splice(index, 1);
      this.player.equip(this.player.currentEquipment.shield);
    } else {
      let currentShield = this.player.currentEquipment.shield;
      let newShield = this.player.getShields()[index];
      this.player.getShields().splice(index, 1);
      this.player.getShields().push(currentShield);
      this.player.currentEquipment.shield = newShield;
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
