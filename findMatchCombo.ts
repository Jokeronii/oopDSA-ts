class Resonator {
  constructor(
    public nama: string,
    public atk: number,
    public skill: string,
    public echo: Echo,
  ) {}

  // TODO: Buat method tampilkanSkillJikaKuat()
  // Hint: kalau atk > 200, tampilkan skill-nya
  tampilkanSkillJikaKuat() {
    const kuat = this.atk > 200 ? `${this.skill}` : "no effect";
    console.log(kuat);
    console.log(
      `echo cooldown: ${this.echo.isReady() ? "cooldown" : this.echo.nama}`,
    );
  }

  //check bisa kombo by echo
  bisaKombo(): boolean {
    return this.echo.isReady();
  }

  serang() {
    return this.atk;
  }
}

class Echo {
  constructor(
    public nama: string,
    public cooldown: number,
  ) {}

  // TODO: Buat method isReady(): boolean
  // Return true kalau cooldown <= 0
  isReady(): boolean {
    return this.cooldown <= 0;
  }
}

class Tim {
  constructor(private resonator: Resonator[]) {}
  totalAtk() {
    console.log(`total atk party`);
    let total: number = 0;
    this.resonator.forEach((r) => {
      total += r.atk;
    });
    console.log(total);
  }
}

class EchoInventory {
  private daftarEcho: string[] = [];

  // TODO: Buat method tambahEcho(nama: string)
  // - Jika echo belum ada, tambahkan
  // - Jika sudah ada, tampilkan pesan "echo sudah ada"
  // Hint: gunakan includes()

  tambahEcho(nama: string) {
    if (this.daftarEcho.includes(nama)) {
      console.log(`sudah ada`);
    } else {
      this.daftarEcho.push(nama);
      console.log(`belum ada`);
    }
  }
}

class Analyzer {
  // TODO: buat method cariCombo
  cariCombo(tim: Resonator[]): string[] {
    let bisa: string[] = [];
    // filter siapa yang bisa combo
    tim.forEach((resonator) => {
      if (resonator.bisaKombo()) {
        console.log(
          `${resonator.nama} bisa melakukan combo dengan skill ${resonator.skill}`,
        );
        bisa.push(resonator.nama);
      } else {
        console.log(`${resonator.nama} tidak bisa combo (Echo belum siap)`);
      }
    });
    // return array nama-nama nya
    return bisa;
  }

  hitungSkillAktif(tim: Resonator[]): number {
    let total: number = 0;
    for (let resonator of tim) {
      if (resonator.bisaKombo()) {
        total++;
      }
    }
    return total;
  }

  resonatorTerlambat(tim: Resonator[]): string[] {
    let listNama: string[] = [];
    for (let r of tim) {
      if (!r.bisaKombo()) {
        listNama.push(r.nama);
      }
    }
    return listNama;
  }

  skillSupportAktif(tim: Resonator[]): string[] {
    const hasil: string[] = [];
    for (const r of tim) {
      if (r.atk < 200 && r.bisaKombo()) {
        hasil.push(r.nama);
      }
    }
    return hasil;
  }

  echoYangSiap(tim: Resonator[]): string[] {
    return tim.filter((r) => r.echo.isReady()).map((r) => r.echo.nama);
  }

  butuhSupport(tim: Resonator[]): boolean {
    let count = 0;
    for (const r of tim) {
      if (r.atk < 200 && r.echo.isReady()) {
        count++;
      }
    }
    return count >= 2;
  }

  echoTertua(tim: Resonator[]): string {
    const echoes = tim.map((r) => r.echo).filter((echo) => echo.cooldown <= 0);

    if (echoes.length === 0) {
      return "tidak siap";
    }

    let terkecil = echoes[0];

    for (const e of echoes) {
      if (e.cooldown < terkecil.cooldown) {
        terkecil = e;
      }
    }

    return terkecil.nama;
  }

  serangMusuh(tim: Resonator[], musuh: Musuh): void {
    for (const r of tim) {
      let dmg: number;
      if (r.bisaKombo()) {
        dmg = r.serang();
        console.log(dmg);
      } else {
        dmg = 0.5 * r.serang();
        console.log(dmg);
      }

      musuh.terimaDmg(dmg);
    }
  }

  comboAreaAttack(tim: Resonator[], musuhList: Musuh[]): void {
    for (const r of tim) {
      // Cek apakah dia memenuhi syarat
      // Kalau tidak, log dan lanjut ke resonator berikutnya
      if (!(r.echo.isReady() && r.atk > 200)) {
        console.log(`${r.nama} tidak bisa comboarea`);
        continue;
      }
      console.log(`${r.nama} melakukan combo area atk`);
      for (const e of musuhList) {
        const dmg = r.serang();
        e.terimaDmg(dmg);
        console.log(`${e.nama} menerima ${dmg} damage. sisa HP:${e.hp}`);
      }
      // Kalau iya, lakukan loop ke semua musuh
      // Kurangi HP musuh, log siapa yang kena berapa damage
    }
  }


  cariPasanganCombo(tim: Resonator[]): void {
  // Loop semua kombinasi 2 resonator
  for (let i = 0; i < tim.length; i++) {
    for (let j = i + 1; j < tim.length; j++) {
      const r1 = tim[i];
      const r2 = tim[j];

      // TODO: Cek semua syarat:
      // - echo siap
      // - atk selisih <= 100
      // - skill beda
      if(!((r1.bisaKombo() && r2.bisaKombo() ===true) && (Math.abs(r1.serang()-r2.serang())<=100) && (r1.skill!==r2.skill))){
        continue
      }

        console.log(`Pasangan Combo ditemukan : ${r1.nama} dan ${r2.nama}`)
      // Jika lolos semua, tampilkan pasangan
    }
  }
}

}

class Musuh {
  constructor(
    public nama: string,
    public hp: number,
  ) {}

  terimaDmg(dmg: number): void {
    this.hp -= dmg;
  }
}

const r1 = new Resonator("Yinlin", 300, "Slash", new Echo("X", 0));
const r2 = new Resonator("Jiyan", 250, "Heal", new Echo("Y", 0));
const r3 = new Resonator("Verina", 500, "Heal", new Echo("Z", 2));

const analyzer = new Analyzer()
analyzer.cariPasanganCombo([r1,r2,r3])
