import kontrakView from "../view/KontrakView.js";
import Table from "cli-table";
import sqlite3 from "sqlite3";
import KontrakModel from "../models/KontrakModel.js";
import { rl } from "../main.js";
import Userview from "../view/userView.js";
import User from "./User.js";
import DosenView from "../view/DosenView.js";

export default class Kontrak {
    static menu() {
        kontrakView.menu()
        var table = new Table({
            head: ['Id kontrak', 'Nim', 'kode matkul', 'id dosen pengampu', 'nilai'],
            colWidths: [15, 15, 25, 15, 10]
        });

        rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
            switch (answer) {
                case '1':
                    KontrakModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].id,
                            rows[i].nim,
                            rows[i].kode_matkul,
                            rows[i].id_dosen_pengampu,
                            rows[i].nilai
                            ])
                        }
                        console.log(table.toString())
                        Kontrak.menu()
                    })
                    break;
                case '2':
                    rl.question('Masukkan id kontrak : ', (answer) => {
                        KontrakModel.cari(answer, function (rows) {
                            if (rows.length < 1) {
                                Kontrak.menu()
                                kontrakView.cariGaada(answer)
                            } else if (answer == rows[0].id) {
                                kontrakView.cariAda(rows)
                                Kontrak.menu()
                            }
                        })
                    })

                    break;
                case '3':
                    Userview.garis()
                    KontrakModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].id,
                            rows[i].nim,
                            rows[i].kode_matkul,
                            rows[i].id_dosen_pengampu,
                            rows[i].nilai
                            ])
                        }
                        console.log(table.toString())
                    })

                    setTimeout(() => {
                        console.log(`                   
Lengkapi data di bawah ini:`)
                        rl.question(`Id kontrak : `, (answer) => {
                            rl.question(`Nim: `, (answer1) => {
                                rl.question(`Kode Matkul  : `, (answer2) => {
                                    rl.question(`ID Dosen Pengampu : `, (answer3) => {
                                        rl.question(`Nilai : `, (answer4) => {


                                            KontrakModel.tambah(answer, answer1, answer2, answer3, answer4)

                                            KontrakModel.daftar(function (rows) {
                                                for (let i = 0; i < rows.length; i++) {
                                                    table.push([rows[i].id,
                                                    rows[i].nim,
                                                    rows[i].kode_matkul,
                                                    rows[i].id_dosen_pengampu,
                                                    rows[i].nilai
                                                    ])
                                                }
                                                console.log(table.toString())
                                                Kontrak.menu()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }, 50);
                    break;
                case '4':
                    KontrakModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].id,
                            rows[i].nim,
                            rows[i].kode_matkul,
                            rows[i].id_dosen_pengampu,
                            rows[i].nilai
                            ])
                        }
                        console.log(table.toString())
                    })
                    setTimeout(() => {
                        Userview.garis()
                        rl.question(`Masukkan ID kontrak yang akan dihapus: `, (answer) => {
                            KontrakModel.hapus(answer)
                            kontrakView.hapusBerhasil(answer)

                            KontrakModel.daftar(function (rows) {
                                for (let i = 0; i < rows.length; i++) {
                                    table.push([rows[i].id,
                                    rows[i].nim,
                                    rows[i].kode_matkul,
                                    rows[i].id_dosen_pengampu,
                                    rows[i].nilai
                                    ])
                                }
                                console.log(table.toString())
                                Kontrak.menu()
                            })
                        })
                    }, 150);




                    break;
                case '5':
                   User.menu()
                    break;
                default:
                   DosenView.buatDefault()

            }
        })

    }
}