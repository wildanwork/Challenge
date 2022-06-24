export const Pi = 3.14;


import MesinHitung from "./c17funct.js";

var mh = new MesinHitung();
mh.tambah(10).kurang(5).hasil() // hasil = 6
mh.tambah(3).kali(4).bagi(6).hasil() //hasil = 6
mh.x = 7;
console.log(`nilai sekarang : ${mh.x}`) // "nilai sekarang : 7"
mh.kali(2).kali(Pi).hasil() //44
mh.x = 7;
mh.kuadrat().kali(Pi).hasil() //154
mh.x = 4;
mh.eksponen(3).hasil() //64
mh.akar().hasil() //8