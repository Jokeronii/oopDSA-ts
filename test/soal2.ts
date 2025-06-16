class Character {
  constructor(public name: string, public damage: number) {}

  attack(enemyName: string): string {
    return `${this.name} attacks ${enemyName} for ${this.damage}`;
  }
}

class Enemy {
  constructor(public name: string, public hp: number) {}
}

class Battle {
  constructor(public characters: Character[], public enemies: Enemy[]) {}



  simulate(): void {
    // TODO: Setiap karakter serang semua musuh, kurangi HP musuh
    // Tampilkan sisa HP masing-masing musuh setelah pertarungan

    for(const r of this.characters){
        for(const e of this.enemies){
            const currHP = e.hp - r.damage
            console.log(`sisa HP ${e.name} :${currHP}`)
        }
    }
  }
}

// Contoh:
const team = [
  new Character("Yinlin", 100),
  new Character("Jiyan", 80),
];

const enemies = [
  new Enemy("Aero Predator", 300),
  new Enemy("Mech Abomination", 500),
];

const battle = new Battle(team, enemies);
battle.simulate()
