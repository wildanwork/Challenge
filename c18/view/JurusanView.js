import User from "../controller/User.js"
import Userview from "./userView.js"

export default class JurusanView{
    static menu(){
        Userview.garis()
        console.log(`
    silakan pilih opsi di bawah ini
[1] daftar jurusan
[2] cari jurusan
[3] tambah jurusan
[4] hapus jurusan
[5] kembali`)
    }
    static daftarGaada(answer){
        console.log(` mahasiswa dengan nim '${answer}' tidak ada! `)
    }
    static daftarAda(rows){
        Userview.garis()
        console.log(`
Major details
============================================================
kode jurusan     : ${rows[0].jurusan}
nama jurusan     : ${rows[0].nama_jurusan}
`)
    }
    static buatDefault(){
        console.log(`input tidak dikenali mohon masukkan input yang lain!`)

    }
    static tambahBerhasil(answer1){
        console.log(`jurusan "${answer1}" telah ditambahkan`)
    }
}