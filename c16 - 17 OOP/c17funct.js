import { Pi } from "./c17.js";
export default class MesinHitung {
    constructor() {
        this.x = 1;
    }
    tambah(n) {
        (this.x += n)
        return this

    }
    kurang(n) {
        (this.x -= n)
        return this
    }
    kali(n) {
        (this.x *= n)
        return this
    }
    bagi(n) {
        (this.x /= n)

        return this
    }
    akar() {
        this.x = (this.x ** 0.5)

        return this
    }
    kuadrat() {
        this.x = (this.x ** 2)
        return this
    }
    eksponen(n) {
        this.x = (this.x ** n)

        return this
    }

    hasil() {
        console.log(Math.round(this.x))

    }


}