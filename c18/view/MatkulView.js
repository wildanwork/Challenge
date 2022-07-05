export default class MatkulView {
    static menu() {
        console.log(`
    silakan pilih opsi di bawah ini
[1] daftar mata kuliah
[2] cari mata kuliah
[3] tambah mata kuliah
[4] hapus mata kuliah
[5] kembali`)
    }
    static cariGaada(answer) {
        console.log(` mata kuliah dengan kode '${answer}' tidak ada! `)

    }
    static cariAda(rows) {
        console.log(`
============================================================
Subject details
============================================================
Kode matakuliah        : ${rows[0].kode_matkul}
nama matakuliah        : ${rows[0].nama_matkul}
jumlah SKS             : ${rows[0].jumlah_sks}`)

    }
    static nambah(answer, answer1, answer2) {
        console.log(`
  Matakuliah dengan kode matkul "${answer}"
  yaitu mata kuliah "${answer1}" 
  dengan jumlah sks "${answer2}" telah ditambahkan!`)
    }
    static hapusBerhasil(answer){
        console.log(`Mata kuliah dengan Kode  "${answer}" telah dihapus`)

    }
    static hapusGagal(){
        console.log('Input tidak dikenali silakan lihat tabel')

    }
}