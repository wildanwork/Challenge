import DosenView from "../view/DosenView.js";
import Userview from "../view/userView.js";
import { db } from "../main.js";
import { rl } from "../main.js";
import DosenModel from "../models/DosenModel.js";
import Table from "cli-table";
import User from "./User.js";
export default class dosen {
    static menuDosen() {
        Userview.garis()
        DosenView.menuDosen()
        Userview.garis()

        var table = new Table({
            head: ['nid', 'Nama Dosen'],
            colWidths: [20, 35]
        });

        rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
            switch (answer) {
                case '1':
                    DosenModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nid,
                            rows[i].name
                            ])
                        }
                        console.log(table.toString())
                        dosen.menuDosen()

                    })


                    break;
                case '2':
                    rl.question('Masukkan nomor induk dosen: ', (answer) => {
                        DosenModel.cari(answer, function (rows) {
                            if (rows.length == 0) {
                                console.log(` Dosen dengan nim '${answer}' tidak ada! `)
                                dosen.menuDosen()
                            } else {
                                Userview.garis()
                                DosenView.cari(rows)
                                dosen.menuDosen()
                            }
                        })

                    })

                    break;
                case '3':
                    Userview.garis()
                    console.log(`                  
Lengkapi data di bawah ini:`)
                    rl.question(`NID: `, (answer) => {
                        rl.question(`Nama Dosen: `, (answer1) => {
                            DosenModel.tambah(answer, answer1)
                            DosenView.tambahBerhasil(answer, answer1)
                            DosenModel.daftar(function (rows) {
                                var table = new Table({
                                    head: ['NID', 'Nama Dosen'],
                                    colWidths: [10, 35]
                                });
                                for (let i = 0; i < rows.length; i++) {
                                    table.push([rows[i].nid,
                                    rows[i].name,
                                    ])
                                }
                                console.log(table.toString())
                                dosen.menuDosen()
                            })
                        })
                    })
                    break;
                case '4':
                    DosenModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nid,
                            rows[i].name
                            ])
                        }
                        console.log(table.toString())


                    })
                    Userview.garis()
                    setTimeout(() => {
                        rl.question(`Masukkan id dosen yang akan dihapus: `, (answer) => {
                            DosenModel.hapus(answer)
                            DosenView.hapusBerhasil(answer)

                            dosen.menuDosen()
                        }, 50);


                    })


                    break;
                case '5':
                    User.menu()
                    break;
                default:
                    DosenView.buatDefault()
                    dosen.menuDosen()

            }
        })

    }
}