export const template = {
  player: {
    className: 'player',
    type: 'actor',
    genre: 'player',
    name: 'You',
    hpMax: 50,
    atk: 3,
    def: 1,
    xp: 0,
    toNextLvl: 50,
    destructible: true
  },
  goblin: {
    population: 20,
    className: 'goblin',
    type: 'actor',
    genre: 'foe',
    name: 'Goblin',
    hpMax: 20,
    atk: 4,
    def: 3,
    xp: 10,
    destructible: true
  },
  giantSnake: {
    population: 5,
    className: 'giant-snake',
    type: 'actor',
    genre: 'foe',
    name: 'Giant Snake',
    hpMax: 50,
    xp: 100,
    atk: 6,
    def: 4,
    destructible: true
  },
  healthPotion: {
    population: 20,
    className: 'health-potion',
    type: 'item',
    genre: 'potion',
    name: 'Health Potion',
    hp: 20,
    walkable: true
  },
  longSword: {
    population: 2,
    className: 'long-sword',
    type: 'item',
    genre: 'weapon',
    name: 'Long Sword',
    atk: 2,
    walkable: true
  },
  leatherArmor: {
    population: 2,
    className: 'leather-armor',
    type: 'item',
    genre: 'armor',
    name: 'Leather Armor',
    def: 2,
    walkable: true
  },
  warriorShield: {
    population: 2,
    className: 'warrior-shield',
    type: 'item',
    genre: 'shield',
    name: 'Warrior Shield',
    def: 2,
    walkable: true
  },
  damascusSword: {
    population: 1,
    className: 'damascus-sword',
    type: 'item',
    genre: 'weapon',
    name: 'Damascus Sword',
    atk: 5,
    walkable: true
  },
  woodenStick: {
    population: 3,
    className: 'wooden-stick',
    type: 'item',
    genre: 'weapon',
    name: 'Wooden Stick',
    atk: 1,
    walkable: true
  },
  gladiatorAxe: {
    population: 1,
    className: 'gladiator-axe',
    type: 'item',
    genre: 'weapon',
    name: 'Gladiator Axe',
    atk: 4,
    walkable: true
  },
  spiquedMace: {
    population: 1,
    className: 'spiqued-mace',
    type: 'item',
    genre: 'weapon',
    name: 'Spiqued Mace',
    atk: 3,
    walkable: true
  },
  dragonArmor: {
    population: 1,
    className: 'dragon-armor',
    type: 'item',
    genre: 'armor',
    name: 'Dragon Armor',
    def: 5,
    walkable: true
  },
  wornCloth: {
    population: 3,
    className: 'worn-cloth',
    type: 'item',
    genre: 'armor',
    name: 'Worn Cloth',
    def: 1,
    walkable: true
  },
  gladiatorPlate: {
    population: 1,
    className: 'gladiator-plate',
    type: 'item',
    genre: 'armor',
    name: 'Gladiator Plate',
    def: 4,
    walkable: true
  },
  templarChainmail: {
    population: 1,
    className: 'templar-chainmail',
    type: 'item',
    genre: 'armor',
    name: 'Templar Chainmail',
    def: 3,
    walkable: true
  },
  dragonShield: {
    population: 1,
    className: 'dragon-shield',
    type: 'item',
    genre: 'shield',
    name: 'Dragon Shield',
    def: 5,
    walkable: true
  },
  woodenShield: {
    population: 3,
    className: 'wooden-shield',
    type: 'item',
    genre: 'shield',
    name: 'Wooden Shield',
    def: 1,
    walkable: true
  },
  gladiatorShield: {
    population: 1,
    className: 'gladiator-shield',
    type: 'item',
    genre: 'shield',
    name: 'Gladiator Shield',
    def: 4,
    walkable: true
  },
  templarShield: {
    population: 1,
    className: 'templar-shield',
    type: 'item',
    genre: 'shield',
    name: 'Templar Shield',
    def: 3,
    walkable: true
  },
  rat: {
    population: 20,
    className: 'rat',
    type: 'actor',
    genre: 'foe',
    name: 'Giant Rat',
    hpMax: 10,
    atk: 2,
    def: 0,
    xp: 3,
    destructible: true
  },
  goblinChieftain: {
    population: 10,
    className: 'goblin-chieftain',
    type: 'actor',
    genre: 'foe',
    name: 'Goblin Chieftain',
    hpMax: 40,
    atk: 4,
    def: 3,
    xp: 20,
    destructible: true
  },
  skeleton: {
    population: 10,
    className: 'skeleton',
    type: 'actor',
    genre: 'foe',
    name: 'Skeleton',
    hpMax: 20,
    atk: 3,
    def: 2,
    xp: 20,
    destructible: true
  },
  dragon: {
    population: 1,
    className: 'dragon',
    type: 'actor',
    genre: 'boss',
    name: 'Dragon Lord',
    hpMax: 200,
    atk: 10,
    def: 8,
    xp: 1000,
    destructible: true
  },
}