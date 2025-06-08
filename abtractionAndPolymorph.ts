class Skill {
  constructor(public nama: string) {
    this.nama = nama;
  }
  gunakan() {
    console.log(`menggunakan skill: ${this.nama}`);
  }
}
class Echo {
  constructor(
    public nama: string,
    private cooldown: number = 3,
  ) {
    this.nama = nama;
    this.cooldown = cooldown;
  }
  aktifkan() {
    if (this.cooldown <= 0) {
      console.log(`echo ${this.nama} cooldown`);
      return;
    }
    console.log(`echo ${this.nama} aktif`);
    this.cooldown--;
  }
}
class Resonator {
  constructor(
    private nama: string,
    protected skill: Skill,
    private echo: Echo,
  ) {
    this.nama = nama;
    this.skill = skill;
    this.echo = echo;
  }

  getNama() {
    return this.nama;
  }

  gunakanSkill() {
    console.log(`===${this.nama} menyerang===`);

    this.skill.gunakan();
    this.echo.aktifkan();
  }

  gantiSkill(skillBaru: Skill) {
    const skillLama = this.skill.nama;
    this.skill = skillBaru;
    console.log(`skil:${skillLama} diganti ke skill:${this.skill.nama}`);
  }

  gantiEcho(echoBaru: Echo) {
    const echoLama = this.echo.nama;
    this.echo = echoBaru;
    console.log(`echo:${echoLama} diganti ke echo:${this.echo.nama}`);
  }
}

//class musuh
abstract class Musuh {
  constructor(
    protected nama: string,
    private hp: number,
    private atk: number,
  ) {}

  abstract serang(): void;
  abstract getNama():void
}

//harusnya pake interface atau override super methodnya??
//boss inhherit musuh
class Boss extends Musuh {
  serang() {
    return(`serangan besar + efek area.`);
  }
  getNama(){
    return this.nama
  }
}
//elite inhherit musuh
class Elite extends Musuh {
  serang() {
    return(`serangan cepat dua kali.`);
  }
  getNama(){
    return this.nama
  }
}
//minion inhherit musuh
class Minion extends Musuh {
  serang() {
    return (`serangan kecil biasa.`);
  }
  getNama(){
    return this.nama
  }
}

//gatau bener apa ga, apakah ini polymorph
//polymorph musuh tacetdiscord ,bisa isi boss, elite, minion
class ArenaPertempuran {
  constructor(private musuh: Musuh[] = []) {}

  // tambahMusuh(musuh:Musuh){
  //     this.musuh.push(musuh)
  // }

  mulaiGelombang(musuhList: Musuh[]) {
    this.musuh = [...musuhList];
    console.log(`=== mulai menyerang ===`)
    this.musuh.forEach(
        musuh=>{
            console.log(`${musuh.getNama() } melakukan ${musuh.serang()}`)
        }
    )
  }

  getMusuhList(){
    console.log(`=== musuh list ===`)
    this.musuh.forEach(
        musuh=>{
            console.log(`musuh: ${musuh.getNama()}`)
        }
    )
  }
}

class MusuhFactory {
  static buatBoss() {
    return new Boss("Scar", 1000, 100);
  }
  static buatElite() {
    return new Elite("Dreamless", 1000, 100);
  }
  static buatMinion() {
    return new Minion("Gulpuff", 1000, 100);
  }
}

class ResonatorFactory {
  static buatChangli() {
    return new Resonator(
      "Changli",
      new Skill("True Sight"),
      new Echo("Inferno Rider", 3),
    );
  }

  static buatVerina() {
    return new Resonator(
      "Verina",
      new Skill("Heal Blossom"),
      new Echo("Bell Bourne", 3),
    );
  }
  static buatDanjin() {
    return new Resonator(
      "Danjin",
      new Skill("Havoc"),
      new Echo("Crownless", 3),
    );
  }
}

interface Healer {
  healTim(): void;
}
interface Attacker {
  serangMusuh(): void;
}

class HealerResonator extends Resonator implements Healer {
  healTim() {
    console.log(`${this.getNama()} menyembuhkan tim!`);
  }
}
class AttackerResonator extends Resonator implements Attacker {
  serangMusuh() {
    console.log(`${this.getNama()} menyerang musuh!`);
  }
}

//interface polymorph
interface Skillable {
  gunakanSkill(): void;
}
//class polymorph Resonator

class SupportResonator extends Resonator implements Skillable {
  gunakanSkill() {
    console.log(`Resonator ${this.getNama()} menggunakan heal`);
  }
}
class DPSResonator extends Resonator implements Skillable {
  gunakanSkill() {
    console.log(`Resonator ${this.getNama()} menggunakan skill DPS`);
  }
}
class BufferResonator extends Resonator implements Skillable {
  gunakanSkill() {
    console.log(`Resonator ${this.getNama()} menggunakan skill Buff`);
  }
}

class Tim {
  private attacker: Attacker[] = [];
  private healer: Healer[] = [];
  private skillable: Skillable[] = [];

  tambahAttacker(attacker: Attacker) {
    this.attacker.push(attacker);
  }

  tambahHealer(healer: Healer) {
    this.healer.push(healer);
  }

  tambahSkillable(reso: Skillable) {
    this.skillable.push(reso);
  }

  mulaiPertarungan() {
    this.attacker.forEach((attackReso) => attackReso.serangMusuh());
    this.healer.forEach((healReso) => healReso.healTim());
  }

  timGunakanSkill() {
    console.log(`=== Tim menggunakan Skill mereka ===`);
    this.skillable.forEach((reso) => {
      reso.gunakanSkill();
    });
  }
  getSkillableTim() {
    console.log("=== Daftar Skillable Resonator ===");
    this.skillable.forEach((reso) => {
      if ("getNama" in reso && typeof reso.getNama === "function") {
        console.log(`- ${reso.getNama()}`);
      } else {
        console.log("- (Unknown Resonator)");
      }
    });
  }
}


const boss = MusuhFactory.buatBoss()
const elite = MusuhFactory.buatElite()
const minion = MusuhFactory.buatMinion()

const tacetdiscord = new ArenaPertempuran()
tacetdiscord.mulaiGelombang([boss,elite,minion])
tacetdiscord.getMusuhList()

const changli = ResonatorFactory.buatChangli();
const verina = ResonatorFactory.buatVerina();
const danjin = ResonatorFactory.buatDanjin();
const echoDanjin = new Echo("Dreamless", 3);
const skillDanjin = new Skill("Serene Vigil");
const echoChangli = new Echo("Inferno Rider", 3);
const skillChangli = new Skill("Blazing Enlightenment");
const echoVerina = new Echo("Bell Bourne", 3);
const skillVerina = new Skill("Heal Blossom");

const verinaHealer = new SupportResonator("Verina", skillVerina, echoVerina);
const changliAttacker = new DPSResonator("Changli", skillChangli, echoChangli);
const danjinBuffer = new BufferResonator("Danjin", skillDanjin, echoDanjin);

//create tim
const tim = new Tim();
// tim.tambahSkillable(verinaHealer);
// tim.tambahSkillable(changliAttacker);
// tim.tambahSkillable(danjinBuffer);
// tim.getSkillableTim();
// tim.timGunakanSkill();
