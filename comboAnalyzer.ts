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
  bisaKombo():boolean{
    return this.echo.isReady()
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

class ComboAnalyzer {
  // TODO: buat method cariCombo
  cariCombo(tim: Resonator[]): string[] {
    let bisa:string[]=[]
    // filter siapa yang bisa combo
    tim.forEach(
        (resonator)=>{
            if(resonator.bisaKombo()){
                console.log(`${resonator.nama} bisa melakukan combo dengan skill ${resonator.skill}`);
                bisa.push(resonator.nama)
            }else{
                console.log(`${resonator.nama} tidak bisa combo (Echo belum siap)`);

            }
        }
    )
    // return array nama-nama nya
    return bisa
  }
}


const echoes: string[] = [`crownless`, `dreamless`, `gulpuff`];

const echoInventory = new EchoInventory();
// echoInventory.tambahEcho(`crownless`);
// echoInventory.tambahEcho(`dreamless`);
// echoInventory.tambahEcho(`crownless`);

const echo1 = new Echo("crownless", 2);
const echo2 = new Echo("dreamless", 0);
const echo3 = new Echo("gulpuff", 1);
const changli = new Resonator("Changli", 400, "true sight", echo1);
const danjin = new Resonator("Danjin", 400, "havoc", echo2);
const verina = new Resonator("Verina", 100, "heal blossom", echo3);

const combo = new ComboAnalyzer()
combo.cariCombo([changli,danjin,verina])
