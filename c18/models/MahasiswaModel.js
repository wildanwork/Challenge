import { db } from "../main.js";
export default class MahasiswaModel {
    static daftarMahasiswa(callback) {
        db.all("select * from mahasiswa", (err, rows) => {
            if (err) throw err;
            else {
                callback(rows)
            }
        }
        )
    }
    static cariMahasiswa(answer, callback) {
        var sql2 = `select * from mahasiswa
        join jurusan on 
        mahasiswa.jurusan = jurusan.kode_jurusan where nim = ?`;

        db.all(sql2, [answer], (err, rows) => {
            if (err) throw err;
            else {
                callback(rows)
            }
        })
    }
    static tambahMahasiswa(answer, answer1, answer2, answer3, answer4) {
        var sqlTambah = "Insert into mahasiswa (nim,name,address,jurusan,umur) values(?,?,?,?,?)";
        db.run(sqlTambah, [answer, answer1, answer2, answer3, answer4], (err, rows) => {
            if (err) throw err;
            console.log(`Mahasiswa dengan nim "${answer}" telah ditambahkan`)
        })
    }
    static hapusMahasiswa(answer) {
        let sqlHapus = "Delete from mahasiswa where nim = ?"
        db.run(sqlHapus, [answer], (err, rows) => {
            if (err) throw err;
           
        })
    }
}
