
import JurusanModel from "../models/JurusanModel.js";
import JurusanView from "../view/JurusanView.js";
import Userview from "../view/userView.js";
import User from "./User.js";
import Table from "cli-table";
import { rl } from "../main.js";

export default class jurusan {
    static menuJurusan() {
        Userview.garis()
        JurusanView.menu()
        
        var table = new Table({
            head: ['Nama Jurusan', 'Kode Jurusan'],
            colWidths: [35, 20]
        });

        rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
            switch (answer) {
                case '1':
                    JurusanModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nama_jurusan,
                            rows[i].kode_jurusan
                            ])
                        }
                        console.log(table.toString())
                        jurusan.menuJurusan()
                    })
                    break;
                case '2':
                    rl.question('Masukkan kode jurusan: ', (answer) => {
                        JurusanModel.search(answer, function (rows) {
                            if (rows.length == 0) {
                                JurusanView.daftarGaada(answer)
                                jurusan.menuJurusan()
                            } else if (answer == rows[0].kode_jurusan) {
                                JurusanView.daftarAda(rows)
                                jurusan.menuJurusan()
                               
                            }
                        })
                    })

                    break;
                case '3':
                    Userview.garis()
                    console.log(`
Lengkapi data di bawah ini:`)
                    rl.question(`Kode Jurusan: `, (answer) => {
                        rl.question(`Nama Jurusan: `, (answer1) => {


                        JurusanModel.tambah(answer, answer1)
                        JurusanModel.daftar(function (rows) {
                            for (let i = 0; i < rows.length; i++) {
                                table.push([rows[i].nama_jurusan,
                                rows[i].kode_jurusan
                                ])
                            }
                            console.log(table.toString())
                            jurusan.menuJurusan()
                        })
                        JurusanView.tambahBerhasil(answer1)
                        
                           
                        })
                        
                    })
                    
                    
                   
                    break;
                case '4':
                    Userview.garis()
                    JurusanModel.daftar(function (rows) {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nama_jurusan,
                            rows[i].kode_jurusan
                            ])
                        }
                        console.log(table.toString())})

                   setTimeout(() => {
                    rl.question(`Masukkan Kode Jurusan yang akan dihapus: `, (answer) => {
                       
                        JurusanModel.remove(answer)
                        console.log(`Jurusan dengan Kode  "${answer}" telah dihapus`)
                        Userview.garis()
                        jurusan.menuJurusan()
                    })
                   }, 50); 
                   
                  
                    break;
                case '5':
                   User.menu()
                    break;
                default:
                Userview.garis()   
                JurusanView.buatDefault()
                jurusan.menuJurusan()

            }
        })

    }
}