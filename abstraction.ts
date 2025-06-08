abstract class Karakter {
    protected nama: string;

    constructor(nama: string) {
        this.nama = nama;
    }

    abstract gunakanSkill(): void;
}

interface ISkill {
    gunakanSkill(): void;
}

interface IHeal {
    heal(): void;
}

class Jiyan extends Karakter {
    gunakanSkill() {
        console.log(`${this.nama} menebas musuh dengan angin!`);
    }
}

class Danjin extends Karakter {
    gunakanSkill() {
        console.log(`${this.nama} menghantam musuh dengan kekuatan havoc!`);
    }
}

class Echo {
    public nama: string;
    private cooldown: number;

    constructor(namaEcho: string, cooldown: number = 3) {
        this.nama = namaEcho;
        this.cooldown = cooldown;
    }

    aktifkan() {
        if (this.cooldown <= 0) {
            console.log(`Echo ${this.nama} sedang cooldown!`);
        } else {
            console.log(`Echo ${this.nama} aktif digunakan!`);
            this.cooldown--;
        }
    }

    getStats() {
        console.log(`Echo: ${this.nama}, sisa cooldown: ${this.cooldown}`);
    }
}

class Resonator implements ISkill {
    private nama: string;
    private echo: Echo;

    constructor(nama: string, echo: Echo) {
        this.nama = nama;
        this.echo = echo;
    }

    gunakanSkill() {
        console.log(`${this.nama} menyerang musuh!`);
        this.echo.aktifkan();
    }

    getStats() {
        console.log(`Resonator: ${this.nama}, menggunakan Echo: ${this.echo.nama}`);
    }
}

class Baizhi extends Karakter implements IHeal, ISkill {
    heal() {
        console.log(`${this.nama} menyembuhkan tim!`);
    }

    gunakanSkill() {
        console.log(`${this.nama} menggunakan skill penyembuh!`);
    }
}

class Calcharo extends Karakter implements ISkill {
    gunakanSkill() {
        console.log(`${this.nama} menyerang dengan lightning slash!`);
    }
}

class Enemy {
    private nama: string;
    private hp: number;

    constructor(nama: string, hp: number) {
        this.nama = nama;
        this.hp = hp;
    }

    terkenaDamage(damage: number) {
        this.hp -= damage;
    }

    getHp() {
        const status = this.hp <= 0 ? 'kalah!' : `sisa ${this.hp}%`;
        console.log(`Boss ${this.nama} ${status}`);
    }
}

class Tim {
    protected tim: Resonator[];

    constructor(tim: Resonator[]) {
        this.tim = tim;
    }

    serangBoss(enemy: Enemy) {
        this.tim.forEach((reso) => {
            reso.gunakanSkill();
            enemy.terkenaDamage(100);
        });
        enemy.getHp();
    }

    comboAttack() {
        this.tim.forEach((reso) => {
            reso.gunakanSkill();
        });
    }
}

// ========== Contoh penggunaan ==========
const jiyan = new Jiyan('Jiyan');
const danjin = new Danjin('Danjin');
jiyan.gunakanSkill();
danjin.gunakanSkill();

const echo = new Echo("Inferno Rider");
const verina = new Resonator("Verina", echo);
verina.gunakanSkill();
verina.getStats();
echo.getStats();

const baizhi = new Baizhi('Baizhi');
const calcharo = new Calcharo('Calcharo');

baizhi.gunakanSkill();
baizhi.heal();
calcharo.gunakanSkill();

const tim = new Tim([verina]);
tim.comboAttack();
