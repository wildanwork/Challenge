import sqlite3 from "sqlite3";
const db = new sqlite3.Database('university.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
});
// console.log(db)
import * as readline from 'node:readline'
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
import Table from "cli-table";
import { table } from "node:console";
login()

function login() {
    console.log(`============================================================
Welcome to Institut Teknologi Bandung
Jl Ganesha no. 10
============================================================
`)
    rl.question('Username : ', (answer) => {
        console.log(`============================================================`)
        rl.question('password: ', (answer2) => {
            const sql = "SELECT * FROM users where username = ?";

            db.all(sql, [answer], (err, rows) => {
                if (err) throw err;
                else {
                    if (rows.length < 1) {
                        console.log(` user dengan username '${answer}' tidak ada! `)
                        login()
                    } else if (answer == rows[0].username && answer2 == rows[0].password) {
                        console.log(`Welcome ${rows[0].username}, your acces level is : ${rows[0].level}`, )
                        menu()

                    } else {

                        console.log(`
============================================================
                        
Username atau password anda salah silahkan periksa kembali!
`)
                        login()

                    }
                }

            })



        })
    })
}

function menuMahasiswa() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar mahasiswa
[2] cari mahasiswa
[3] tambah mahasiswa
[4] hapus mahasiswa
[5] kembali
============================================================`)


    rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
        switch (answer) {
            case '1':
                db.all("select * from mahasiswa", (err, rows) => {
                    if (err) throw err;
                    else {
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
                        menuMahasiswa()
                    }
                })

                break;
            case '2':
                rl.question('Masukkan NIM: ', (answer) => {
                    var sql2 = `select * from mahasiswa
                      join jurusan on 
                      mahasiswa.jurusan = jurusan.kode_jurusan where nim = ?`;

                    db.all(sql2, [answer], (err, rows) => {
                        if (err) throw err;

                        else {
                            if (rows.length < 1) {
                                console.log(` mahasiswa dengan nim '${answer}' tidak ada! `)
                                menuMahasiswa()
                            } else if (answer == rows[0].nim) {
                                console.log(`
============================================================
Student details
============================================================
nim     : ${rows[0].nim}
nama    : ${rows[0].name}
alamat  : ${rows[0].address}
jurusan : ${rows[0].nama_jurusan}
`)
                                menuMahasiswa()
                            }
                        }
                    })
                })


                break;
            case '3':
                console.log(`
============================================================                    
Lengkapi data di bawah ini:`)
                rl.question(`NIM : `, (answer) => {
                    rl.question(`Nama: `, (answer1) => {
                        rl.question(`Address : `, (answer2) => {
                            rl.question(`Kode_Jurusan: `, (answer3) => {
                                rl.question(`umur: `, (answer4) => {


                                    var sqlTambah = "Insert into mahasiswa (nim,name,address,jurusan,umur) values(?,?,?,?,?)";
                                    db.run(sqlTambah, [answer, answer1, answer2, answer3, answer4], (err, rows) => {
                                        if (err) throw err;
                                        else {
                                            db.all("select * from mahasiswa", (err, rows) => {
                                                if (err) throw err;
                                                else {
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
                                                    menuMahasiswa()
                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
                break;
            case '4':
                console.log(`
============================================================                    
`)
                rl.question(`Masukkan NIM mahasiswa yang akan dihapus: `, (answer) => {
                    let sqlHapus = "Delete from mahasiswa where nim = ?"
                    db.run(sqlHapus, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            console.log(`Mahasiswa dengan nim "${answer}" telah dihapus
============================================================                    
`)
                            db.all("select * from mahasiswa", (err, rows) => {
                                if (err) throw err;
                                else {
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
                                    menuMahasiswa()
                                }
                            })
                        }
                    })
                })

                break;
            case '5':
                menu()
                break;
            default:
                console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                menuMahasiswa()
        }
    })

}

function menuJurusan() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar jurusan
[2] cari jurusan
[3] tambah jurusan
[4] hapus jurusan
[5] kembali
============================================================`)
    var table = new Table({
        head: ['Nama Jurusan', 'Kode Jurusan'],
        colWidths: [35, 20]
    });

    rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
        switch (answer) {
            case '1':
                db.all("select * from jurusan", (err, rows) => {
                    if (err) throw err;
                    else {
                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nama_jurusan,
                                rows[i].kode_jurusan
                            ])
                        }
                        console.log(table.toString())
                        menuJurusan()
                    }
                })

                break;
            case '2':
                rl.question('Masukkan kode jurusan: ', (answer) => {
                    let sql3 = `select mahasiswa.jurusan ,jurusan.nama_jurusan, 
                    count (distinct mahasiswa.name) as jumlah_mahasiswa 
                    from mahasiswa
                    join jurusan
                    on mahasiswa.jurusan = jurusan.kode_jurusan
                    join kontrak
                    on mahasiswa.nim = kontrak.nim
                      where kode_jurusan = ?`;

                    db.all(sql3, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            if (rows.length < 1) {
                                console.log(` mahasiswa dengan nim '${answer}' tidak ada! `)
                                menuJurusan()
                            } else if (answer == rows[0].jurusan) {
                                console.log(`
============================================================
Major details
============================================================
kode jurusan     : ${rows[0].jurusan}
nama jurusan     : ${rows[0].nama_jurusan}
Jumlah mahasiswa : ${rows[0].jumlah_mahasiswa}
`)
                                menuJurusan()
                            }
                        }
                    })
                })

                break;
            case '3':
                console.log(`
============================================================                    
Lengkapi data di bawah ini:`)
                rl.question(`Kode Jurusan: `, (answer) => {
                    rl.question(`Nama Jurusan: `, (answer1) => {


                        var sqlTambah = "Insert into jurusan (kode_jurusan,nama_jurusan) values(?,?)";
                        db.run(sqlTambah, [answer, answer1], (err, rows) => {
                            if (err) throw err;
                            else {
                                db.all("select * from jurusan", (err, rows) => {
                                    if (err) throw err;
                                    else {
                                        var table = new Table({
                                            head: ['kode_jurusan', 'Nama Jurusan'],
                                            colWidths: [20, 35]
                                        });
                                        for (let i = 0; i < rows.length; i++) {
                                            table.push([rows[i].kode_jurusan,
                                                rows[i].nama_jurusan,
                                            ])
                                        }
                                        console.log(table.toString())
                                        menuJurusan()
                                    }
                                })
                            }
                        })



                    })
                })

                break;
            case '4':
                console.log(`
============================================================                    
                `)
                rl.question(`Masukkan Kode Jurusan yang akan dihapus: `, (answer) => {
                    let sqlHapus = "Delete from jurusan where kode_jurusan = ?"
                    db.run(sqlHapus, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            console.log(`Jurusan dengan Kode  "${answer}" telah dihapus
============================================================                    
                `)
                            db.all("select * from jurusan", (err, rows) => {
                                if (err) throw err;
                                else {
                                    var table = new Table({
                                        head: ['Kode Jurusan', 'Nama Jurusan'],
                                        colWidths: [35, 35]
                                    });
                                    for (let i = 0; i < rows.length; i++) {
                                        table.push([rows[i].kode_jurusan,
                                            rows[i].nama_jurusan,
                                        ])
                                    }
                                    console.log(table.toString())
                                    menuJurusan()
                                }
                            })
                        }
                    })
                })
                break;
            case '5':
                menu()
                break;
            default:
                console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                menuJurusan()

        }
    })

}

function menuDosen() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar dosen
[2] cari dosen
[3] tambah dosen
[4] hapus dosen
[5] kembali
============================================================`)
    var table = new Table({
        head: ['nid', 'Nama Dosen'],
        colWidths: [20, 35]
    });

    rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
        switch (answer) {
            case '1':
                db.all("select * from dosen", (err, rows) => {
                    if (err) throw err;
                    else {

                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].nid,
                                rows[i].name
                            ])
                        }
                        console.log(table.toString())
                        menuDosen()
                    }
                })

                break;
            case '2':
                rl.question('Masukkan nomor induk dosen: ', (answer) => {
                    let sql3 = `select dosen.nid ,dosen.name, 
                    count (distinct kontrak.nim) as jumlah_mahasiswa 
                    from dosen
                    join kontrak
                    on dosen.nid = kontrak.id_dosen_pengampu
                      where nid = ?`;

                    db.all(sql3, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            if (rows.length < 1) {
                                console.log(` mahasiswa dengan nim '${answer}' tidak ada! `)
                                menuDosen()
                            } else if (answer == rows[0].nid) {
                                console.log(`
============================================================
Lecturer details
============================================================
Nomor induk dosen    : ${rows[0].nid}
nama dosen           : ${rows[0].name}
jumlah mahasiswa     : ${rows[0].jumlah_mahasiswa}

`)
                                menuDosen()
                            }
                        }
                    })
                })

                break;
            case '3':
                console.log(`
============================================================                    
Lengkapi data di bawah ini:`)
                rl.question(`NID: `, (answer) => {
                    rl.question(`Nama Dosen: `, (answer1) => {
                        var sqlTambah = "Insert into dosen (nid,name) values(?,?)";
                        db.run(sqlTambah, [answer, answer1], (err, rows) => {
                            if (err) throw err;
                            else {
                                db.all("select * from dosen", (err, rows) => {
                                    if (err) throw err;
                                    else {
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
                                        menuDosen()
                                    }
                                })
                            }
                        })



                    })
                })
                break;
            case '4':
                console.log(`
============================================================                    
                                                `)
                rl.question(`Masukkan id dosen yang akan dihapus: `, (answer) => {
                    let sqlHapus = "Delete from dosen where nid = ?"
                    db.run(sqlHapus, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            console.log(`Dosen dengan ID  "${answer}" telah dihapus
============================================================                    
                                                `)
                            db.all("select * from dosen", (err, rows) => {
                                if (err) throw err;
                                else {
                                    var table = new Table({
                                        head: ['ID Dosen', 'Nama Dosen'],
                                        colWidths: [35, 35]
                                    });
                                    for (let i = 0; i < rows.length; i++) {
                                        table.push([rows[i].nid,
                                            rows[i].name,
                                        ])
                                    }
                                    console.log(table.toString())
                                    menuDosen()
                                }
                            })
                        }
                    })
                })
                break;
            case '5':
                menu()
                break;
            default:
                console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                menuDosen()

        }
    })

}

function menuMatkul() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar mata kuliah
[2] cari mata kuliah
[3] tambah mata kuliah
[4] hapus mata kuliah
[5] kembali
============================================================`)
    var table = new Table({
        head: ['Kode Mata kuliah', 'Nama mata kuliah', 'jumlah sks'],
        colWidths: [20, 40, 15]
    });

    rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
        switch (answer) {
            case '1':
                db.all("select * from matakuliah", (err, rows) => {
                    if (err) throw err;
                    else {

                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].kode_matkul,
                                rows[i].nama_matkul,
                                rows[i].jumlah_sks
                            ])
                        }
                        console.log(table.toString())
                        menuMatkul()
                    }
                })

                break;
            case '2':
                rl.question('Masukkan kode Matkul: ', (answer) => {
                    let sql3 = `select matakuliah.kode_matkul ,matakuliah.nama_matkul,
                    matakuliah.jumlah_sks, 
                    count (distinct kontrak.nim) as jumlah_mahasiswa 
                    from matakuliah
                    join kontrak
                    on matakuliah.kode_matkul = kontrak.kode_matkul
                      where matakuliah.kode_matkul = ?`;

                    db.all(sql3, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            if (rows.length < 1) {
                                console.log(` mata kuliah dengan kode '${answer}' tidak ada! `)
                                menuMatkul()
                            } else if (answer == rows[0].kode_matkul) {
                                console.log(`
============================================================
Subject details
============================================================
Kode matakuliah        : ${rows[0].kode_matkul}
nama matakuliah        : ${rows[0].nama_matkul}
jumlah mahasiswa       : ${rows[0].jumlah_mahasiswa}

`)
                                menuMatkul()
                            }
                        }
                    })
                })
                break;
            case '3':
                console.log(`
============================================================                    
Lengkapi data di bawah ini:`)
                rl.question(`Kode Matkul: `, (answer) => {
                    rl.question(`Nama Matkul: `, (answer1) => {
                        rl.question(`Jumlah SKS: `, (answer2) => {
                            var sqlTambah = "Insert into matakuliah (kode_matkul,nama_matkul,jumlah_sks) values(?,?,?)";
                            db.run(sqlTambah, [answer, answer1, answer2], (err, rows) => {
                                if (err) throw err;
                                else {
                                    db.all("select * from matakuliah", (err, rows) => {
                                        if (err) throw err;
                                        else {
                                            var table = new Table({
                                                head: ['Kode Matkul', 'Nama Matkul', 'Jumlah sks'],
                                                colWidths: [20, 35, 20]
                                            });
                                            for (let i = 0; i < rows.length; i++) {
                                                table.push([rows[i].kode_matkul,
                                                    rows[i].nama_matkul,
                                                    rows[i].jumlah_sks
                                                ])
                                            }
                                            console.log(table.toString())
                                            menuMatkul()
                                        }
                                    })
                                }
                            })
                        })


                    })
                })
                break;
            case '4':
                console.log(`
============================================================                    
                                                    `)
                rl.question(`Masukkan Kode Mata Kuliah yang akan dihapus: `, (answer) => {
                    let sqlHapus = "Delete from matakuliah where kode_matkul = ?"
                    db.run(sqlHapus, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            console.log(`Mata kuliah dengan Kode  "${answer}" telah dihapus
============================================================                    
                                                    `)
                            db.all("select * from matakuliah", (err, rows) => {
                                if (err) throw err;
                                else {
                                    var table = new Table({
                                        head: ['Kode Matkul', 'Nama Matkul'],
                                        colWidths: [35, 35]
                                    });
                                    for (let i = 0; i < rows.length; i++) {
                                        table.push([rows[i].kode_matkul,
                                            rows[i].nama_matkul,
                                        ])
                                    }
                                    console.log(table.toString())
                                    menuMatkul()
                                }
                            })
                        }
                    })
                })
                break;
            case '5':
                menu()
                break;
            default:
                console.log(`
============================================================                
input tidak dikenali mohon masukkan input yang lain!`)
                menuMatkul()

        }
    })

}

function menuKontrak() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar kontrak
[2] cari kontrak
[3] tambah kontrak
[4] hapus kontrak
[5] kembali
============================================================`)
    var table = new Table({
        head: ['Id kontrak', 'Nim', 'kode matkul', 'id dosen pengampu', 'nilai'],
        colWidths: [15, 15, 25, 15, 10]
    });

    rl.question(`masukkan salah satu no. dari opsi di atas : `, (answer) => {
        switch (answer) {
            case '1':
                db.all("select * from kontrak", (err, rows) => {
                    if (err) throw err;
                    else {

                        for (let i = 0; i < rows.length; i++) {
                            table.push([rows[i].id,
                                rows[i].nim,
                                rows[i].kode_matkul,
                                rows[i].id_dosen_pengampu,
                                rows[i].nilai
                            ])
                        }
                        console.log(table.toString())
                        menuKontrak()
                    }
                })

                break;
            case '2':
                rl.question('Masukkan id kontrak : ', (answer) => {
                    let sql3 = `select * from kontrak
                      where id = ?`;

                    db.all(sql3, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            if (rows.length < 1) {
                                console.log(` kontrak dengan id '${answer}' tidak ada! `)
                                menuKontrak()
                            } else if (answer == rows[0].id) {
                                console.log(`
============================================================
contract details
============================================================
Id kontrak        : ${rows[0].id}
NIM               : ${rows[0].nim}
Kode Matkul       : ${rows[0].kode_matkul}
Id dosen pengampu : ${rows[0].id_dosen_pengampu}
Nilai             : ${rows[0].nilai}
`)
                                menuKontrak()
                            }
                        }
                    })
                })

                break;
            case '3':
                console.log(`
============================================================                    
Lengkapi data di bawah ini:`)
                rl.question(`Id kontrak : `, (answer) => {
                    rl.question(`Nim: `, (answer1) => {
                        rl.question(`Kode Matkul  : `, (answer2) => {
                            rl.question(`ID Dosen Pengampu : `, (answer3) => {
                                rl.question(`Nilai : `, (answer4) => {


                                    var sqlTambah = "Insert into kontrak (id,nim,kode_matkul,id_dosen_pengampu,Nilai) values(?,?,?,?,?)";
                                    db.run(sqlTambah, [answer, answer1, answer2, answer3, answer4], (err, rows) => {
                                        if (err) throw err;
                                        else {
                                            db.all("select * from kontrak", (err, rows) => {
                                                if (err) throw err;
                                                else {
                                                    var table = new Table({
                                                        head: ['Id', 'NIM', 'Kode Matkul', 'Id Dosen Pengampu', 'Nilai'],
                                                        colWidths: [10, 20, 20, 25, 10]
                                                    });
                                                    for (let i = 0; i < rows.length; i++) {
                                                        table.push([rows[i].id,
                                                            rows[i].nim,
                                                            rows[i].kode_matkul,
                                                            rows[i].id_dosen_pengampu,
                                                            rows[i].nilai
                                                        ])
                                                    }
                                                    console.log(table.toString())
                                                    menuKontrak()
                                                }
                                            })
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
                break;
            case '4':
                console.log(`
============================================================                    
                `)
                rl.question(`Masukkan ID kontrak yang akan dihapus: `, (answer) => {
                    let sqlHapus = "Delete from kontrak where id = ?"
                    db.run(sqlHapus, [answer], (err, rows) => {
                        if (err) throw err;
                        else {
                            console.log(`kontrak dengan ID "${answer}" telah dihapus
============================================================                    
                `)
                            db.all("select * from kontrak", (err, rows) => {
                                if (err) throw err;
                                else {
                                    var table = new Table({
                                        head: ['ID', 'NIM', 'Kode Matkul', 'ID Dosen Pengampu', 'Nilai'],
                                        colWidths: [6, 20, 15, 20, 10]
                                    });
                                    for (let i = 0; i < rows.length; i++) {
                                        table.push([rows[i].id,
                                            rows[i].nim,
                                            rows[i].kode_matkul,
                                            rows[i].id_dosen_pengampu,
                                            rows[i].nilai
                                        ])
                                    }
                                    console.log(table.toString())
                                    menuKontrak()
                                }
                            })
                        }
                    })
                })


                break;
            case '5':
                menu()
                break;
            default:
                console.log(`
    ============================================================                
    input tidak dikenali mohon masukkan input yang lain!`)
                menuKontrak()

        }
    })
}

function menu() {
    console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] dosen
[4] Mata Kuliah
[5] kontrak
[6] keluar 
============================================================`)
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