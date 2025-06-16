class Game{
    attackEnemies(character:string[],enemy:string[]):void{
        for(const c of character){
            for(const e of enemy){
                console.log(`character ${c}, attacking enemy:${e}`)
            }
        }
        
    }
}


const game = new Game()

const chars = ["Jiyan", "Yinlin"];
const enemies = ["Boss A", "Boss B"];

game.attackEnemies(chars,enemies)
