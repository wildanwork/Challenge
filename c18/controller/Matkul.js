import matkulModel from "../models/MatkulModel.js";
import MatkulView from "../view/MatkulView.js";
import Userview from "../view/userView.js";
import Table from "cli-table";
import { rl } from "../c18.js";
import { db } from "../c18.js";
import DosenView from "../view/DosenView.js";
import User from "./User.js";

export default class Matkul {
    static menuMatkul() {
        Userview.garis()
        MatkulView.menu()
        Userview.garis()
        var table = new Table({
            head: ['Kode Mata kuliah', 'Nama mata kuliah', 'jumlah sks'],
            colWidths: [20, 40, 15]
        });

        rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
            switch (answer) {
                case '1':
                    matkulModel.daftar(answer, function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].kode_matkul,
                            rows[i].nama_matkul,
                            rows[i].jumlah_sks
                            ])
                        }
                        console.log(table.toString())
                        Matkul.menuMatkul()
                    })
                    break;
                case '2':
                    rl.question('Masukkan kode Matkul: ', (answer) => {
                        matkulModel.cari(answer, function (rows) {
                            if (rows.length < 1) {
                                MatkulView.cariGaada(answer)
                                Matkul.menuMatkul()
                            } else if (answer == rows[0].kode_matkul) {
                                MatkulView.cariAda(rows)
                                Matkul.menuMatkul()
                            }
                        }
                        )
                    })
                    break;
                case '3':
                    Userview.garis()
                    console.log(`                    
Lengkapi data di bawah ini:`)
                    rl.question(`Kode Matkul: `, (answer) => {
                        rl.question(`Nama Matkul: `, (answer1) => {
                            rl.question(`Jumlah SKS: `, (answer2) => {
                                matkulModel.tambah(answer, answer1, answer2)
                                MatkulView.nambah(answer, answer1, answer2)
                                matkulModel.daftar(answer, function (rows) {
                                    for (let i = 0; i < rows.length; i++) {
                                        table.push([rows[i].kode_matkul,
                                        rows[i].nama_matkul,
                                        rows[i].jumlah_sks
                                        ])
                                    }
                                    console.log(table.toString())
                                    Matkul.menuMatkul()
                                })

                            })
                        })

                    })

                    break;
                case '4':
                    matkulModel.daftar(answer, function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].kode_matkul,
                            rows[i].nama_matkul,
                            rows[i].jumlah_sks
                            ])
                        }
                        console.log(table.toString())
                    })
                    setTimeout(() => {

                        rl.question(`Masukkan Kode Mata Kuliah yang akan dihapus: `, (answer) => {
                            
                            matkulModel.hapus(answer)
                            MatkulView.hapusBerhasil(answer)
                            Matkul.menuMatkul()
                        })
                    }, 50);
                    break;
                case '5':
                    User.menu()
                    break;
                default:
                    DosenView.buatDefault()
                    Matkul.menuMatkul()

            }
        })

    }
}