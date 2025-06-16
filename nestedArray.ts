class Game {
  attackEnemies(character: string[], enemy: string[]): void {
    for (const c of character) {
      for (const e of enemy) {
        console.log(`character ${c}, attacking enemy:${e}`);
      }
    }
  }

  cetakSemuaDamage(teams: { name: string; damage: number }[][]): void {
    // TODO: pakai nested loop di sini
    for(let i =0;i<teams.length;i++){
        let sumDmg = 0
        for(let j = 0;j<teams[i].length;j++){
            sumDmg += teams[i][j].damage
            // console.log(`${teams[i][j].name} dealt ${teams[i][j].damage} damage`)
        }
        console.log(`teams ke-${i} total dmg:${sumDmg}`)
    }
  }

  cetakDamageTim(teams: { name: string; damage: number }[][]): void {
    // TODO: pakai nested loop di sini
    for(let i =0;i<teams.length;i++){
        console.log(`teams ke-${i}`)
        for(let j = 0;j<teams[i].length;j++){

            console.log(`${teams[i][j].name} dealt ${teams[i][j].damage} damage`)
        }
    }
  }

  damageTeam(teams: number[][]): void {
    for (let i = 0; i < teams.length; i++) {
      let total = 0;
      for (let j = 0; j < teams[i].length; j++) {
        total += teams[i][j];
      }
    console.log(`Team ${i + 1} total damage: ${total}`);
    }
  }

  checkParty(party:string[][]){
    for (let i =0;i<party.length;i++){
        console.log(`party ke-${i}`)
        for (let j =0;j<party[i].length;j++){
            console.log(`- ${party[i][j]}`)
        }

    }
  }
}

class Character {
  constructor(
    public name: string,
    public hp: number,
    public atk: number,
  ) {}

  attack(enemy: Enemy): void {
    const finalDamage = enemy.hp - this.atk;
    console.log(`${this.name} attacks ${enemy.name} for ${finalDamage} damage`);
  }
}
class Enemy {
  constructor(
    public name: string,
    public hp: number,
    public atk: number,
  ) {}
}

const teams = [
  [
    { name: "Jiyan", damage: 100 },
    { name: "Yinlin", damage: 80 },
  ],
  [
    { name: "Encore", damage: 90 },
    { name: "Verina", damage: 70 },
  ],
];

const damageTeams = [[1200, 1350], [1100, 1400, 1250], [1500]];
const party = [
  ["Yinlin", "Jiyan"],
  ["Encore", "Verina", "Taoqi"],
  ["Rover"]
];


const game = new Game();

// game.damageTeam(damageTeams);
// game.checkParty(party)
game.cetakSemuaDamage(teams)
