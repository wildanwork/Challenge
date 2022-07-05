import MahasiswaModel from "../models/MahasiswaModel.js";
import MahasiswaView from "../view/MahasiswaView.js";
import Userview from "../view/userView.js";
import { rl } from "../c18.js";
import { db } from "../c18.js";
import sqlite3 from "sqlite3";
import Table from "cli-table";
import User from "./User.js";

export default class mahasiswa {
    static menuMahasiswa() {
        MahasiswaView.menu()

        rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
            switch (answer) {
                case '1':
                    MahasiswaModel.daftarMahasiswa(function (rows) {
                        var table = new Table({
                            head: ['Nama', 'NIM', 'Jurusan'],
                            colWidths: [35, 35, 20]
                        });
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].name,
                            rows[i].nim,
                            rows[i].jurusan
                            ])
                        }
                        console.log(table.toString())
                        mahasiswa.menuMahasiswa()


                    })

                    break;
                case '2':
                    rl.question('Masukkan NIM: ', (answer) => {
                        MahasiswaModel.cariMahasiswa(answer, function (rows) {
                            if (rows.length < 1) {
                                MahasiswaView.cariGaAda(answer)
                                mahasiswa.menuMahasiswa()
                            } else if (answer == rows[0].nim) {
                                MahasiswaView.cariAda(rows)
                                mahasiswa.menuMahasiswa()
                            }

                        })
                    })

                

                    break;
                case '3':
                    Userview.garis()
                    MahasiswaView.nambah()
                    rl.question(`NIM : `, (answer) => {
                        rl.question(`Nama: `, (answer1) => {
                            rl.question(`Address : `, (answer2) => {
                                rl.question(`Kode_Jurusan: `, (answer3) => {
                                    rl.question(`umur: `, (answer4) => {
                                        MahasiswaModel.tambahMahasiswa(answer, answer1, answer2, answer3, answer4)
                                        MahasiswaModel.daftarMahasiswa(function (rows) {
                                            var table = new Table({
                                                head: ['Nama', 'NIM', 'Jurusan'],
                                                colWidths: [35, 35, 20]
                                            });
                                            for (let i = 0; i < rows.length; i++) {
                                                table.push([rows[i].name,
                                                rows[i].nim,
                                                rows[i].jurusan
                                                ])
                                            }
                                            console.log(table.toString())
                                            mahasiswa.menuMahasiswa()
                    
                    
                                        })

                                    })
                                })

                            })
                        })
                    })
                    MahasiswaModel.daftarMahasiswa(function (rows) {
                        var table = new Table({
                            head: ['Nama', 'NIM', 'Jurusan'],
                            colWidths: [35, 35, 20]
                        });
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].name,
                            rows[i].nim,
                            rows[i].jurusan
                            ])
                        }
                    })


                    break;
                case '4':
      Userview.garis()
                    rl.question(`Masukkan NIM mahasiswa yang akan dihapus: `, (answer) => {
                        MahasiswaModel.hapusMahasiswa(answer)
                            MahasiswaView.hapus(answer)
                            MahasiswaModel.daftarMahasiswa(function (rows) {
                                var table = new Table({
                                    head: ['Nama', 'NIM', 'Jurusan'],
                                    colWidths: [35, 35, 20]
                                });
                                for (let i = 0; i < rows.length; i++) {
                                    table.push([rows[i].name,
                                    rows[i].nim,
                                    rows[i].jurusan
                                    ])
                                }
                                console.log(table.toString())
                                mahasiswa.menuMahasiswa()
                    })
                })
                    break;
                case '5':
                    Userview.menu()
                    User.menu()
                    break;
                default:
                    console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                    MahasiswaView.menuMahasiswa()
            }
        }
        )
    }
}