class Character {
  constructor(
    public name: string,
    public damage: number,
  ) {}

  attack(enemyName: string): string {
    return `${this.name} attacks ${enemyName} for ${this.damage}`;
  }
}

class Enemy {
  constructor(
    public name: string,
    public hp: number,
  ) {}
}

class Battle {
  constructor(
    public characters: Character[],
    public enemies: Enemy[],
  ) {}

  simulate(): void {
    // TODO: Setiap karakter serang semua musuh, kurangi HP musuh
    // Tampilkan sisa HP masing-masing musuh setelah pertarungan

    for (const r of this.characters) {
      for (const e of this.enemies) {
        const currHP = e.hp - r.damage;
        console.log(`sisa HP ${e.name} :${currHP}`);
      }
    }
  }
}

type CharacterGroup = Character[];

class AllianceBattle {
  constructor(
    public characterGroups: CharacterGroup[],
    public enemies: string[],
  ) {}

  startAllianceBattle(): void {
    // TODO: Tiap grup jalanin loop
    // is it 2d array
    for (let i = 0; i < this.characterGroups.length; i++) {
      //1st team go first
      console.log(`tim ke-${i + 1}`);
      for (let j = 0; j < this.characterGroups[i].length; j++) {
        for (const enemy of this.enemies) {
          console.log(`${this.characterGroups[i][j].name} menyerang ${enemy}`);
        }
      }
    }
  }
}

const group1 = [new Character("Yinlin", 100), new Character("Jiyan", 80)];
const group2 = [new Character("Encore", 90), new Character("Verina", 70)];

const allianceBattle = new AllianceBattle(
  [group1, group2],
  ["World Boss", "Mecha"],
);

allianceBattle.startAllianceBattle();
