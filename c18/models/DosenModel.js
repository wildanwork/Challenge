import { db } from "../main.js";

export default class DosenModel {
    static daftar(callback) {
        db.all("select * from dosen", (err, rows) => {
            if (err) throw err;
            else { callback(rows) }
        })
    }
    static cari(answer, callback) {
        let sql3 = `select * from dosen
          where nid = ?`;

        db.all(sql3, [answer], (err, rows) => {
            if (err) throw err;
            else {
                callback(rows)
            }
        })
    }
    static tambah(answer, answer1) {
        var sqlTambah = "Insert into dosen (nid,name) values(?,?)";
        db.run(sqlTambah, [answer, answer1], (err) => {
            if (err) throw err;
        })
        
    }
    static hapus(answer) {
        let sqlHapus = "Delete from dosen where nid = ?"
        db.run(sqlHapus, [answer], (err) => {
            if (err) throw err;
        })
    }
}