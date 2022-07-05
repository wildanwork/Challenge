import { db } from "../main.js";
import sqlite3 from "sqlite3";
export default class KontrakModel {
    static daftar(callback) {
        db.all("select * from kontrak", (err, rows) => {
            if (err) throw err;
            else { callback(rows) }
        })
    }
    static cari(answer, callback) {
        let sql3 = `select * from kontrak
        where id = ?`;

        db.all(sql3, [answer], (err, rows) => {
            if (err) throw err;
            else { callback(rows) }
        })
    }
    static tambah(answer, answer1, answer2, answer3, answer4) {
        var sqlTambah = "Insert into kontrak (id,nim,kode_matkul,id_dosen_pengampu,Nilai) values(?,?,?,?,?)";
        db.run(sqlTambah, [answer, answer1, answer2, answer3, answer4], (err) => {
            if (err) throw err;
        })
    }
    static hapus(answer) {
        let sqlHapus = "Delete from kontrak where id = ?"
        db.run(sqlHapus, [answer], (err) => {
            if (err) throw err;
        })
    }
}