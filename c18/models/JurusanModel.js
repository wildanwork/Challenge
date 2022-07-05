import sqlite3 from "sqlite3";
import { db } from "../c18.js";
export default class JurusanModel {

    static daftar(callback) {

        db.all("select * from jurusan", (err, rows) => {
            if (err) throw err;
            else {
                callback(rows)
            }
        })

    }
    static tambah(answer, answer1) {
        var sqlTambah = "Insert into jurusan (kode_jurusan,nama_jurusan) values(?,?)";
        db.run(sqlTambah, [answer, answer1], (err) => {
            if (err) throw err;

        })

    }

    static search(answer, callback) {
        let sql3 = `select * from jurusan join mahasiswa
        on mahasiswa.jurusan = jurusan.kode_jurusan
         where kode_jurusan = ? `;

        db.all(sql3, [answer], (err, rows) => {
            if (err) {
                throw err;
            } else {
                callback(rows)
            }
        })
    }

    static remove(answer) {
        let sqlHapus = "Delete from jurusan where kode_jurusan = ?"
        db.run(sqlHapus, [answer], (err) => {
            if (err) throw err;
        })
    }
}