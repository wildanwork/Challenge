import Userview from "./userView.js"

export default class DosenView {
    static menuDosen() {
        console.log(`
    silakan pilih opsi di bawah ini
[1] daftar dosen
[2] cari dosen
[3] tambah dosen
[4] hapus dosen
[5] kembali`)
    }
    static cari(rows) {
        console.log(`
Lecturer details
============================================================
Nomor induk dosen    : ${rows[0].nid}
nama dosen           : ${rows[0].name}`)
    }
    static hapusBerhasil(answer){
        console.log(`Dosen dengan ID  "${answer}" telah dihapus`)
        Userview.garis()
    }
    static buatDefault(){
        console.log(`
        ============================================================                
        input tidak dikenali mohon masukkan input yang lain!`)
    }
    static tambahBerhasil(answer,answer1){
        console.log(`Dosen dengan NID "${answer}" dan nama "${answer1}" telah ditambahkan`)
    }
}