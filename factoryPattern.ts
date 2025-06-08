class Skill{
    constructor(protected nama:string){
        this.nama=nama
    }
    gunakan(){
        console.log(`menggunakan skill: ${this.nama}`)
    }
}
class Echo{
    constructor(private nama:string,private cooldown:number =3){
        this.nama=nama
        this.cooldown=cooldown
    }
    aktifkan(){
        this.cooldown<=0?'dalam cooldown, sisa cooldown: ${this.cooldown}':`sisa cooldown: ${this.cooldown}`
        this.cooldown--
        console.log(`echo aktif: ${this.nama}`)
    }


}
class Resonator{
    constructor(private nama:string,protected skill:Skill,private echo:Echo){
        this.nama=nama
        this.skill=skill
        this.echo=echo
    }
    gunakanSkill(){
        console.log(`===${this.nama} menyerang===`)
        
        this.skill.gunakan()
        this.echo.aktifkan()
    }
}

class ResonatorFactory{
    static buatChangli(){
        return new Resonator('Changli',new Skill('True Sight'),new Echo('Inferno Rider',3))
    }
    
    static buatVerina(){
        return new Resonator('Verina',new Skill('Heal Blossom'),new Echo('Bell Bourne',3))
    }
}


const changli = ResonatorFactory.buatChangli()
const verina = ResonatorFactory.buatVerina()

changli.gunakanSkill()
verina.gunakanSkill()
