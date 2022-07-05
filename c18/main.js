import sqlite3 from "sqlite3";
export const db = new sqlite3.Database('university.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});
// console.log(db)
import * as readline from 'node:readline'
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
import Table from "cli-table";
import { table } from "node:console";
import Userview from "./view/userView.js";
import UserModels from "./models/UserModels.js";
import MahasiswaView from "./view/MahasiswaView.js";
import MahasiswaModel from "./models/MahasiswaModel.js";
import mahasiswa from "./controller/mahasiswa.js";
import JurusanView from "./view/JurusanView.js";
import jurusan from "./controller/jurusan.js";
import DosenView from "./view/DosenView.js";
import dosen from "./controller/dosen.js";
import Matkul from "./controller/Matkul.js";
import Kontrak from "./controller/kontrak.js";
login()

function login() {
    Userview.kopLogin()
    setTimeout(() => {
        rl.question('Username : ', (answer) => {
            rl.question('password: ', (answer2) => {
                UserModels.login(answer, function (rows) {


                    if (rows.length < 1) {
                        Userview.usernameSalah(answer)
                        login()
                    } else if (answer == rows[0].username && answer2 == rows[0].password) {
                        Userview.usernameBenar(rows)
                        menu()

                    } else {
                        Userview.passwordSalah()
                        login()

                    }

                })


            })



        })
    }, 150);

}
function menuMahasiswa() {
    MahasiswaView.menu()

    mahasiswa.menuMahasiswa()

}

function menuJurusan() {
    JurusanView.menu()
    jurusan.menuJurusan()
}

function menuDosen() {
    dosen.menuDosen()
}

function menuMatkul() {
    Matkul.menuMatkul()
}

function menuKontrak() {
    Kontrak.menu()
}

function menu() {
    Userview.menu()
    rl.question(`masukkan salah satu no. dari opsi di atas: `, (answer) => {
        switch (answer) {
            case '1':
                menuMahasiswa()
                break;
            case '2':
                menuJurusan()
                break;
            case '3':
                menuDosen()
                break;
            case '4':
                menuMatkul()
                break;
            case '5':
                menuKontrak()
                break;
            case '6':
                login()
                break;
            default:
                console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                menu()

        }
    })
}