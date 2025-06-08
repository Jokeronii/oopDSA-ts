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
        this.skill.gunakan()
        this.echo.aktifkan()
        console.log(`resonator ${this.nama} cast skill`)
    }
}

const healSkill = new Skill('Heal Blossom');
const bellEcho = new Echo('Bell Bourne');

const verina = new Resonator('Verina',healSkill,bellEcho)
verina.gunakanSkill()
