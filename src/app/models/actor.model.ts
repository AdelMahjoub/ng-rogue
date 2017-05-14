import { Item } from './item.model';
import { Entity } from './entity.model';

export class Actor extends Entity {

  protected atkBonus = 0;
  protected defBonus = 0;
  protected potions: Item[] = [];
  protected weapons: Item[] = [];
  protected armors: Item[] = [];
  protected shields: Item[] = [];
  protected maxEquipment = 5;
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

  loot(item: Item): void {
    switch(item.getGenre()) {
      case 'potion':
        this.potions.push(item);
        break;
      case 'weapon':
        if(this.weapons.length < this.maxEquipment) {
          this.weapons.push(item);
        } else {
          this.weaponsFull = true;
        }
        break;
      case 'armor':
        if(this.armors.length < this.maxEquipment) {
          this.armors.push(item);
        } else {
          this.armorsFull = true;
        }
        break;
      case 'shield':
        if(this.shields.length < this.maxEquipment) {
          this.shields.push(item);
        } else {
          this.shieldsFull = true;
        }
        break;
    }
  }

  dealDamage(target: Actor): void {
    let damageToDeal = this.getTotalAtk();
    let damageAbsorbtion = target.getTotalDef();
    let damageDealt = Math.max(1, damageToDeal - damageAbsorbtion);
    target.updateHp(-damageDealt);
  }

  tryLvlUp(target: Actor): void {
    this.increaseXp(target.getXp());
    while(this.getXp() >= this.getToNextLvl()) {
      let lvlGain = ~~(this.getXp() / this.getToNextLvl());
      this.updateLvl(lvlGain);
      this.lvlUp();
      this.updateToNextLvl(2);
    }
  }

  lvlUp() {
    this.updateAtk(1);
    this.updateHpMax(2);
    this.updateDef(1);
  }

  drinkPotion() {
    if(this.potions.length > 0) {
      let potion = this.potions[0]
      this.updateHp(potion.getHp());
      this.potions.splice(0, 1);
      potion = null;
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

}