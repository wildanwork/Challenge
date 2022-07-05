export default class kontrakView {
    static menu() {
        console.log(`============================================================
    silakan pilih opsi di bawah ini
[1] daftar kontrak
[2] cari kontrak
[3] tambah kontrak
[4] hapus kontrak
[5] kembali
============================================================`)
    }
    static cariGaada(answer) {
        console.log(` kontrak dengan id '${answer}' tidak ada! `)

    }
    static cariAda(rows) {
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
    }
    static hapusBerhasil(answer){
        console.log(`kontrak dengan ID "${answer}" telah dihapus
============================================================                    
                `)
    }
}