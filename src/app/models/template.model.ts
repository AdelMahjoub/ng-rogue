export const template = {
  player: {
    className: 'player',
    type: 'actor',
    genre: 'player',
    name: 'You',
    hpMax: 40,
    atk: 2,
    def: 1,
    xp: 0,
    toNextLvl: 50,
    destructible: true
  },
  goblin: {
    className: 'goblin',
    type: 'actor',
    genre: 'foe',
    name: 'goblin',
    hpMax: 15,
    atk: 2,
    def: 1,
    xp: 10,
    destructible: true
  },
  youngDragon: {
    className: 'young-dragon',
    type: 'actor',
    genre: 'boss',
    name: 'Young Dragon',
    hpMax: 50,
    hp: 50,
    xp: 100,
    atk: 10,
    def: 5,
    destructible: true
  },
  healthPotion: {
    className: 'health-potion',
    type: 'item',
    genre: 'potion',
    name: 'Small Health Potion',
    hp: 20,
    walkable: true
  },
  longSword: {
    className: 'long-sword',
    type: 'item',
    genre: 'weapon',
    name: 'Long Sword',
    atk: 1,
    walkable: true
  },
  leatherArmor: {
    className: 'leather-armor',
    type: 'item',
    genre: 'armor',
    name: 'Leather Armor',
    def: 1,
    walkable: true
  },
  warriorShield: {
    className: 'warrior-shield',
    type: 'item',
    genre: 'shield',
    name: 'Warrior Shield',
    def: 1,
    walkable: true
  }
}