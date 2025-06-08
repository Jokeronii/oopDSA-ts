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
        if(this.cooldown<=0){

        console.log(`echo ${this.nama} cooldown`)
        return
        }
        console.log(`echo ${this.nama} aktif`)
        this.cooldown--
    }


}
class Resonator{
    constructor(private nama:string,protected skill:Skill,private echo:Echo){
        this.nama=nama
        this.skill=skill
        this.echo=echo
    }

    getNama() {
        return this.nama
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

interface Healer{
    healTim():void
}
interface Attacker{
    serangMusuh():void
}

class HealerResonator extends Resonator implements Healer{
    healTim(){
        console.log(`${this.getNama()} menyembuhkan tim!`)
    }
}
class AttackerResonator extends Resonator implements Attacker{
    serangMusuh(){
        console.log(`${this.getNama()} menyerang musuh!`)
    }
}

class Tim {
    private attacker:Attacker[]=[]
    private healer:Healer[]=[]

    tambahAttacker(attacker:Attacker){
        this.attacker.push(attacker)
    }

    tambahHealer(healer:Healer){
        this.healer.push(healer)
    }

    mulaiPertarungan(){
        this.attacker.forEach(attackReso=>attackReso.serangMusuh())
        this.healer.forEach(healReso=>healReso.healTim())
    }
}



const changli = ResonatorFactory.buatChangli()
const verina = ResonatorFactory.buatVerina()
const danjin = ResonatorFactory.buatDanjin()
const echoDanjin = new Echo("Dreamless",3)
const skillDanjin = new Skill('Serene Vigil')
const echoChangli = new Echo("Inferno Rider",3)
const skillChangli = new Skill('Blazing Enlightenment')
const echoVerina = new Echo("Bell Bourne",3)
const skillVerina = new Skill('Heal Blossom')

const verinaHealer = new HealerResonator('Verina',skillVerina,echoVerina)
const changliAttacker = new AttackerResonator('Changli',skillChangli,echoChangli)
const danjinAttacker = new AttackerResonator('Danjin', skillDanjin, echoDanjin)


const tim = new Tim()
tim.tambahAttacker(changliAttacker)
tim.tambahAttacker(danjinAttacker)
tim.tambahHealer(verinaHealer)

tim.mulaiPertarungan()
changli.gunakanSkill()
