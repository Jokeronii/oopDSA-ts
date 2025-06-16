class Character {
  constructor(public name: string, public damage: number) {}

  attack(enemyName: string): string {
    return `${this.name} attacks ${enemyName} for ${this.damage}`;
  }
}

class Battle {
  constructor(public characters: Character[], public enemies: string[]) {}

  startBattle(): void {
    // TODO: setiap karakter menyerang semua musuh
    for(const r of this.characters){
        for(const e of this.enemies){
            console.log(r.attack(e))
        }
    }
  }
}

// Contoh:
const team = [
  new Character("Yinlin", 100),
  new Character("Jiyan", 80),
];

const enemies = ["Aero Predator", "Mech Abomination"];

const battle = new Battle(team, enemies);
battle.startBattle();
