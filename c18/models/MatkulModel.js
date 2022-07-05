import { db } from "../c18.js";
import sqlite3 from "sqlite3";
export default class matkulModel {
    static daftar(callback) {
        db.all("select * from matakuliah", (err, rows) => {
            if (err) throw err;
            else { callback(rows) }
        })
    }
    static cari(answer, callback) {
        let sql3 = `select * from matakuliah where kode_matkul = ?`;

        db.all(sql3, [answer], (err, rows) => {
            if (err) throw err;
            else { callback(rows) }
        })
    }
    static tambah(answer,answer1,answer2) {
        var sqlTambah = "Insert into matakuliah (kode_matkul,nama_matkul,jumlah_sks) values(?,?,?)";
        db.run(sqlTambah, [answer, answer1, answer2], (err) => {
            if (err) throw err;
        })
    }
    static hapus (answer){
        let sqlHapus = "Delete from matakuliah where kode_matkul = ?"
        db.run(sqlHapus, [answer], (err) => {
            if (err) throw err;})
    }
}