import mahasiswa from "../controller/mahasiswa.js"
import Userview from "./userView.js"

export default class MahasiswaView {
    static menu() {
        Userview.garis()
        console.log(`
    silakan pilih opsi di bawah ini
[1] daftar mahasiswa
[2] cari mahasiswa
[3] tambah mahasiswa
[4] hapus mahasiswa
[5] kembali
`)
Userview.garis()

    }
    static cariGaAda(answer){
        console.log(` mahasiswa dengan nim '${answer}' tidak ada! `)
        mahasiswa.menuMahasiswa()
    }
    static cariAda(rows){
        console.log(`
============================================================
Student details
============================================================
 nim     : ${rows[0].nim}
 nama    : ${rows[0].name}
 alamat  : ${rows[0].address}
 jurusan : ${rows[0].nama_jurusan}
        `)
                                 
    }
    static nambah(){
        console.log(`                  
Lengkapi data di bawah ini:`)
    }
    static hapus(answer){
        console.log(`Mahasiswa dengan nim "${answer}" telah dihapus`)
Userview.garis()


    }
}