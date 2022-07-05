import UserModels from "../models/UserModels.js"
import Userview from "../view/userView.js"
import mahasiswa from "./mahasiswa.js"
import { rl } from "../main.js"
import jurusan from "./jurusan.js"
import dosen from "./dosen.js"
import JurusanView from "../view/JurusanView.js"

export default class User{
    static menu(){
         {
           Userview.menu()
            rl.question(`masukkan salah satu no. dari opsi di atas: `, (answer) => {
                switch (answer) {
                    case '1':
                       mahasiswa.menuMahasiswa()
                        break;
                    case '2':
                        jurusan.menuJurusan()
                        break;
                    case '3':
                        dosen.menuDosen()
                        break;
                    case '4':
                        menuMatkul()
                        break;
                    case '5':
                        menuKontrak()
                        break;
                    case '6':
                        User.login()
                        break;
                    default:
                        JurusanView.buatDefault()
                       User.menu()
        
                }
            })
        }
    }
    static login(){
        rl.question('Username : ', (answer) => {
            rl.question('password: ', (answer2) => {
                UserModels.login(answer, function (rows) {
                    
                     
                        if (rows.length < 1) {
                            Userview.usernameSalah(answer)
                            login()
                        } else if (answer == rows[0].username && answer2 == rows[0].password) {
                            Userview.usernameBenar(rows)
                            menu()
    
                        } else {
                            Userview.passwordSalah()
                            login()
    
                        }
                    
                })
    
    
            })
    
    
    
        })
    }
}