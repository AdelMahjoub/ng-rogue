import { AudioService } from './../../services/audio.service';
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
  combatMessageSubscription: Subscription;

  @ViewChild('info') itemInfo: ElementRef;
  @ViewChild('combatLog') combatLog: ElementRef;


  constructor(
    private entityService: EntityService,
    private cameraService: CameraService,
    private gameService: GameService,
    private audioService: AudioService) { }

  ngOnInit() {
    this.width = this.cameraService.getWidth();
    this.height = this.cameraService.getHeight();
    this.tileSize = this.gameService.tileSize;
    this.player = this.entityService.getPlayer();

    this.gameInfoSubscription = this.gameService.info.subscribe(
      (info: string) => {
        (<HTMLElement>this.itemInfo.nativeElement).innerHTML = info;
      }
    )

    this.combatMessageSubscription = this.gameService.historyMessage.subscribe(
      (message: string) => {
        let div = document.createElement('div');
        div.style.paddingLeft = '2px';
        div.innerHTML = message;
        (<HTMLElement>this.combatLog.nativeElement).insertBefore(div, (<HTMLElement>this.combatLog.nativeElement).childNodes[0])
      }
    )
  }

  ngOnDestroy() {
    this.gameInfoSubscription.unsubscribe();
  }

  onWeaponClick(weapon: Item): void {
    this.audioService.pickWeapon.currentTime = 0;
    this.audioService.pickWeapon.play();
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
    this.audioService.pickArmor.currentTime = 0;
    this.audioService.pickArmor.play();
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
    this.audioService.pickShield.currentTime = 0;
    this.audioService.pickShield.play();
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
      <p>${item.getName()}</p>
      <p>${item.getType()}: ${item.getGenre()}</p>
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
