import { db } from "../c18.js";
export default class UserModels {
    static login(answer, callback) {
        const sql = "SELECT * FROM users where username = ?";

        db.all(sql, [answer], (err, rows) => {
            if (err) console.log('maaf error', err)
            else {
                callback(rows)
            }
        })
    }
}
