// Online Typescript Editor for free
// Write, Edit and Run your Typescript code using TS Online Compiler

class Solve {
  satu(): void {
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
  }

  dua(): void {
    for (let i = 0; i < 20; i++) {
      if (i % 2 == 0) {
        console.log(i);
      }
      continue;
    }
  }

  tiga(): number {
    let total = 0;
    for (let i = 0; i < 100; i++) {
      total += i;
    }
    return total;
    // console.log(total)
  }

  empat(): number[] {
    const storedNums: number[] = [];
    for (let i = 0; i < 50 + 1; i++) {
      storedNums.push(i);
    }
    return storedNums;
  }

  lima(arr: number[]): number[] {
    const filteredArr: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 5 == 0) {
        filteredArr.push(arr[i]);
      }
    }
    return filteredArr;
  }

  limaAlt(arr: number[]): number[] {
    return arr.filter((num) => num % 5 == 0);
  }

  enam(arr: number[]): number[] {
    let left = 0,
      right = arr.length - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    return arr;
  }

  tujuh(arr: number[], checkNum: number): number {
    let freq: number = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      //check if arr[i] = checkNum > 1
      if (arr[i] === checkNum) {
        freq++;
      }
    }
    return freq;
  }

  delapan(word: string): number {
    let counter = 0;
    const w = word.toLowerCase();
    const vowels: string[] = [`u`, `e`, `i`, `a`, `o`];
    // if there is vowels included word === included(vowels)
    for (let i = 0; i < w.length - 1; i++) {
      if (vowels.includes(w.charAt(i))) {
        counter++;
      }
    }
    return counter;
  }

  sembilan(arr: string[]): number[] {
    // let counter:number[]=[]
    // for(arr.)
    // return counter

    return arr.map((r) => r.length);
  }

  sepuluh(arr: number[]): void {
    const odd: number[] = [],
      even: number[] = [];

    for (let i = 0; i < arr.length; i++) {
      if (i % 2 == 0) {
        even.push(i);
      }
      odd.push(i);
    }
    // console.log({ odd, even });
  }

  //check highest score return name, how to check and iterate array of object?
  sebelas(players: { name: string; score: number }[]): string {
    if (players.length === 0) return "";

    // current top player
    let topScore = players[0];

    for (let player of players) {
      if (player.score > topScore.score) {
        topScore = player;
      }
    }
    return topScore.name;
  }
  duabelas(arr: number[]): number[] {
    const newArr: number[] = [];
    for (let num of arr) {
      newArr.push(num * 2);
    }
    return newArr;
  }

  tigaBelas(players: { name: string; damage: number }[], dmg: number): void {
    for (let r of players) {
      const currHp = dmg - r.damage;
      console.log(`${r.name} attacks! Enemy HP: ${currHp}`);
    }
  }
}

const solve = new Solve();
const display = [
  solve.tiga(),
  solve.empat(),
  solve.lima(solve.empat()),
  solve.enam([1, 2, 3, 4, 5]),
  solve.tujuh([1, 2, 2, 3, 4, 2, 5], 2),
  solve.delapan("wutheringwaves"),
  solve.sembilan(["Yinlin", "Jiyan", "Rover"]),
  solve.sepuluh([1, 2, 3, 4, 5, 6]),
  solve.sebelas([
    { name: "Jiyan", score: 80 },
    { name: "Yinlin", score: 95 },
    { name: "Encore", score: 90 },
  ]),
  solve.duabelas([1, 2, 3]),
];
// console.log(display[10]);

solve.tigaBelas(
  [
    { name: "Jiyan", damage: 20 },
    { name: "Yinlin", damage: 30 },
    { name: "Encore", damage: 25 },
  ],
  100,
);
