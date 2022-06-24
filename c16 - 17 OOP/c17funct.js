import { Pi } from "./c17.js";
export default class MesinHitung {
    constructor() {
        this.x = 1;
    }
    tambah(n) {
        Math.round(this.x += n)
        return this

    }
    kurang(n) {
        Math.round(this.x -= n)
        return this
    }
    kali(n) {
        Math.round(this.x *= n)
        return this
    }
    bagi(n) {
        Math.round(this.x /= n)

        return this
    }
    akar() {
        this.x = Math.round(this.x ** 0.5)

        return this
    }
    kuadrat() {
        this.x = Math.round(this.x ** 2)
        return this
    }
    eksponen(n) {
        this.x = Math.round(this.x ** n)

        return this
    }

    hasil() {
        console.log(Math.round(this.x))

    }


}