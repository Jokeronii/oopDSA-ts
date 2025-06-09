// === Skill ===
class Skill {
  constructor(public nama: string) {}
  gunakan() {
    return `menggunakan skill: ${this.nama}`;
  }
}

// === Echo ===
class Echo {
  constructor(public nama: string, private cooldown: number = 3) {}

  aktifkan() {
    if (this.cooldown <= 0) {
      console.log(`echo ${this.nama} cooldown`);
      return;
    }
    console.log(`echo ${this.nama} aktif`);
    this.cooldown--;
  }
}

// === Resonator ===
class Resonator {
  constructor(
    private nama: string,
    private skill: Skill,
    private echo: Echo,
    private hp: number,
    private atk: number
  ) {}

  getNama() {
    return this.nama;
  }

  getHp() {
    return this.hp;
  }

  serang(musuh: Musuh) {
    console.log(`\n=== ${this.nama} menyerang ===`);
    console.log(`${this.skill.gunakan()} dengan ATK: ${this.atk}`);
    musuh.terimaSerangan(this.atk);
    this.echo.aktifkan();
  }

  terimaSerangan(damage: number) {
    this.hp -= damage;
    console.log(`${this.nama} terkena ${damage} damage. HP sisa: ${this.hp<=0?'0':this.hp}`);
  }

  isKalah(): boolean {
    return this.hp <= 0;
  }
}

// === Musuh (abstract) ===
abstract class Musuh {
  constructor(
    protected nama: string,
    protected hp: number,
    protected atk: number
  ) {}

  getNama() {
    return this.nama;
  }

  getHp() {
    return this.hp;
  }

  abstract serang(target: Resonator): void;

  terimaSerangan(damage: number) {
    this.hp -= damage;
    console.log(`${this.nama} terkena ${damage} damage. HP sisa: ${this.hp<=0?'0':this.hp}`);
  }

  isKalah(): boolean {
    return this.hp <= 0;
  }
}

// === Boss ===
class Boss extends Musuh {
  serang(target: Resonator) {
    console.log(`\n=== ${this.nama} menyerang dengan serangan besar! ===`);
    target.terimaSerangan(this.atk);
  }
}

// === Pertarungan 1v1 ===
class Pertarungan1v1 {
  constructor(private reso: Resonator, private musuh: Musuh) {}

  mulai() {
    console.log(`\n🎮 ${this.reso.getNama()} VS ${this.musuh.getNama()}!`);

    while (!this.reso.isKalah() && !this.musuh.isKalah()) {
      this.reso.serang(this.musuh);
      if (this.musuh.isKalah()) break;

      this.musuh.serang(this.reso);
    }

    const pemenang = this.reso.isKalah()
      ? this.musuh.getNama()
      : this.reso.getNama();
    console.log(`\n🏆 Pertarungan selesai! Pemenang: ${pemenang}`);
  }
}

// === Factory ===
class ResonatorFactory {
  static buatChangli() {
    return new Resonator(
      "Changli",
      new Skill("True Sight"),
      new Echo("Inferno Rider"),
      1000,
      300
    );
  }
}

class MusuhFactory {
  static buatBoss() {
    return new Boss("Scar", 1000, 200);
  }
}

// === Eksekusi ===
const changli = ResonatorFactory.buatChangli();
const boss = MusuhFactory.buatBoss();

const duel = new Pertarungan1v1(changli, boss);
duel.mulai();
