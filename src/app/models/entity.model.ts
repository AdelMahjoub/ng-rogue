import { Tile } from './tile.model';

export class Entity extends Tile {
  
  public hp: number; // current hit points, entity is destroyd when hp reach 0
  public hpMax: number; // maximum hit points, current hit points cannot exceed max hit points
  public atk: number; // current attack strengh, damage dealt
  public def: number; // current defense, damage absorbtion
  public lvl: number; // current lvl, entity growth
  public xp: number; // current experience points
  public toNextLvl: number; // experience needed to reach the next level
  public destructible: boolean; // entity can be destroyed or not
  public type: string; // generic type
  public genre: string; // specific type
  public name: string;

  constructor(props) {
    super(props);

    this.hpMax = props['hpMax'] || 0;
    this.hp = props['hp'] || this.hpMax;
    this.atk = props['atk'] || 0;
    this.def = props['def'] || 0;
    this.lvl = props['lvl'] || 1;
    this.xp = props['xp'] || 0;
    this.toNextLvl = props['toNextLvl'] || 0;
    this.destructible = props['destructible'] || false;
    this.type = props['type'] || 'entity';
    this.genre = props['genre'] || 'unknown';
    this.name = props['name'] || 'unknown';
  }

  getHp(): number {
    return this.hp;
  }

  getHpMax(): number {
    return this.hpMax;
  }

  getAtk(): number {
    return this.atk;
  }

  getDef(): number {
    return this.def;
  }

  getLvl(): number {
    return this.lvl;
  }

  getXp(): number {
    return this.xp;
  }

  getType(): string {
    return this.type;
  }

  getGenre(): string {
    return this.genre;
  }

  getName(): string {
    return this.name;
  }

  getToNextLvl(): number {
    return this.toNextLvl;
  }

  increaseXp(xp: number): void {
    this.xp += xp;
  }

  updateToNextLvl(multiple: number): void {
    this.toNextLvl *= multiple;
  }

  updateLvl(n: number): void {
    this.lvl += n;
  }

  updateAtk(gain: number): void {
    this.atk += gain;
  }

  updateDef(gain: number): void {
    this.def += gain;
  }

  updateHpMax(gain: number): void {
    this.hpMax += gain;
  }

  updateHp(gain: number): void {
    this.hp += gain;
    this.hp = Math.min(this.hp, this.hpMax);
  }

}