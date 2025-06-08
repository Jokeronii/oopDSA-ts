class Skill{
    constructor(public nama:string){
        this.nama=nama
    }
    gunakan(){
        console.log(`menggunakan skill: ${this.nama}`)
    }
}
class Echo{
    constructor(public nama:string,private cooldown:number =3){
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

    gantiSkill(skillBaru: Skill){
        const skillLama= this.skill.nama
        this.skill=skillBaru
        console.log(`skil:${skillLama} diganti ke skill:${this.skill.nama}`)
    }

    gantiEcho(echoBaru: Echo){
        
        const echoLama= this.echo.nama
        this.echo=echoBaru
        console.log(`echo:${echoLama} diganti ke echo:${this.echo.nama}`)
    }
}

class ResonatorFactory{
    static buatChangli(){
        return new Resonator('Changli',new Skill('True Sight'),new Echo('Inferno Rider',3))
    }
    
    static buatVerina(){
        return new Resonator('Verina',new Skill('Heal Blossom'),new Echo('Bell Bourne',3))
    }
    static buatDanjin(){
        return new Resonator('Danjin',new Skill('Havoc'),new Echo('Crownless',3))
    }
}


const changli = ResonatorFactory.buatChangli()
const verina = ResonatorFactory.buatVerina()
const danjin = ResonatorFactory.buatDanjin()
const echoBaru = new Echo("Dreamless",3)
const skillBaru = new Skill('Blazing Enlightenment')

changli.gunakanSkill()
// verina.gunakanSkill()
danjin.gunakanSkill()
danjin.gantiEcho(echoBaru)
danjin.gunakanSkill()
changli.gantiSkill(skillBaru)
changli.gunakanSkill()
