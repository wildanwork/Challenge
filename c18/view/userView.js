export default class Userview {

    static kopLogin() {
        Userview.garis()
        console.log(`
Welcome to Institut Teknologi Bandung
Jl Ganesha no. 10`)
        Userview.garis()
    }
    static garis() {
        console.log(`============================================================`)

    }
    static usernameSalah(answer) {
        console.log(` user dengan username '${answer}' tidak ada! `)

    }
    static usernameBenar(rows) {
        console.log(`Welcome ${rows[0].username}, your acces level is : ${rows[0].level}`,)

    }
    static passwordSalah() {
        console.log(`
============================================================
                                
Username atau password anda salah silahkan periksa kembali!
        `)

    }
    static menu(){
        Userview.garis()
        console.log(`
    silakan pilih opsi di bawah ini
[1] Mahasiswa
[2] Jurusan
[3] dosen
[4] Mata Kuliah
[5] kontrak
[6] keluar `)

    }
}