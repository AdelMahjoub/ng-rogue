import { Item } from './item.model';
import { Entity } from './entity.model';

export class Actor extends Entity {

  public atkBonus = 0;
  public defBonus = 0;
  public potions: Item[] = [];
  public weapons: Item[] = [];
  public armors: Item[] = [];
  public shields: Item[] = [];
  public maxEquipment = 5;
  public armorsFull = false;
  public shieldsFull = false;
  public weaponsFull = false;
  
  public currentEquipment = {
    weapon: null,
    armor: null,
    shield: null
  }

  constructor(props) {
    super(props);
  }

  getTotalAtk(): number {
    return this.atk + this.atkBonus;
  }

  getTotalDef(): number {
    return this.def + this.defBonus;
  }

  getWeapons(): Item[] {
    return this.weapons;
  }

  getArmors(): Item[] {
    return this.armors;
  }

  getShields(): Item[] {
    return this.shields;
  }

  loot(item: Item, callback): void {
    switch(item.getGenre()) {
      case 'potion':
        this.potions.push(item);
        break;
      case 'weapon':
        if(this.weapons.length < this.maxEquipment) {
          this.weapons.push(item);
        } else {
          this.weaponsFull = true;
          callback.next(`
            <p style="color: red;">Weapons bag is full.</p>
          `);
        }
        break;
      case 'armor':
        if(this.armors.length < this.maxEquipment) {
          this.armors.push(item);
        } else {
          this.armorsFull = true;
          callback.next(`
            <p style="color: red;">Armors bag is full.</p>
          `)
        }
        break;
      case 'shield':
        if(this.shields.length < this.maxEquipment) {
          this.shields.push(item);
        } else {
          this.shieldsFull = true;
          callback.next(`
            <p style="color: red;">Shields bag is full.</p>
          `)
        }
        break;
    }
  }

  dealDamage(target: Actor, messageCallback): void {
    let damageToDeal = this.getTotalAtk();
    let damageAbsorbtion = target.getTotalDef();
    let damageDealt = Math.max(1, damageToDeal - damageAbsorbtion);
    
    target.updateHp(-damageDealt);

    switch(this.getGenre()) {
      case 'player':
        messageCallback.next(`
          <p style="color: green;">${this.getName()} attacked <span style="color: orange;">${target.getName()}</span></p>
          <p> and dealt <em style="color: red;">${damageDealt}</em> damage</p>    
        `);
        break;
      default:
        messageCallback.next(`
          <p style="color: orange;">${this.getName()} attacked <span style="color: green;">${target.getName()}</span></p>
          <p> and dealt <em style="color: red;">${damageDealt}</em> damage</p>    
        `);
    }
   
  }

  tryLvlUp(target: Actor, sound: HTMLAudioElement, messageCallback): void {
    this.increaseXp(target.getXp());
    while(this.getXp() >= this.getToNextLvl()) {
      let lvlGain = ~~(this.getXp() / this.getToNextLvl());
      this.updateLvl(lvlGain);
      this.lvlUp();
      sound.currentTime = 0;
      sound.play();
      messageCallback.next(`
        <p style="color: gold;">LVL UP !</p>
      `)
      this.updateToNextLvl(2);
    }
  }

  lvlUp() {
    this.updateAtk(1);
    this.updateHpMax(2);
    this.updateDef(1);
  }

  drinkPotion(sound: HTMLAudioElement) {
    if(this.potions.length > 0 && this.hp < this.hpMax) {
      let potion = this.potions[0]
      this.updateHp(potion.getHp());
      this.potions.splice(0, 1);
      potion = null;
      sound.currentTime = 0;
      sound.play();
    }
  }

  equip(equipment: Item): void {
    switch(equipment.getGenre()) {
      case 'weapon':
        this.atkBonus += equipment.getAtk();
        break;
      case 'armor':
        this.defBonus += equipment.getDef();
        break;
      case 'shield':
        this.defBonus += equipment.getDef();
        break; 
    }
  }


  unEquip(equipment: Item): void {
    switch(equipment.getGenre()) {
      case 'weapon':
        this.atkBonus -= equipment.getAtk();
        break;
      case 'armor':
        this.defBonus -= equipment.getDef();
        break;
      case 'shield':
        this.defBonus -= equipment.getDef();
        break; 
    }
  }

}