"use strict";
/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////
const ecc = new Ecc();
console.log("Inverser of 1: ", ecc.inverse(1n, ecc.n_order));
console.log("Inverser of 2: ", ecc.inverse(2n, ecc.n_order));
console.log("Inverser of 57896044618658097711785492504343953926418782139537452191302581570759080747169: ", ecc.inverse(57896044618658097711785492504343953926418782139537452191302581570759080747169n, ecc.n_order));
console.log("Inverser of (n_order - 1): ", ecc.inverse(ecc.n_order - 1n, ecc.n_order));
console.log("G(x, y): ", ecc.eccnP(1n, ecc.Gx, ecc.Gy));
console.log("Double G: ", ecc.doublep(ecc.Gx, ecc.Gy));
console.log("G + G: ", ecc.addp(ecc.Gx, ecc.Gy, ecc.Gx, ecc.Gy));
console.log("G + G - G: ", ecc.addp(ecc.addp(ecc.Gx, ecc.Gy, ecc.Gx, ecc.Gy)[0], ecc.addp(ecc.Gx, ecc.Gy, ecc.Gx, ecc.Gy)[1], ecc.Gx, ecc.p - ecc.Gy));
console.log("n = 21530: ", ecc.eccnP(21530n, ecc.Gx, ecc.Gy), "n = 21531: ", ecc.eccnP(21531n, ecc.Gx, ecc.Gy), "n = 21531: (Complementar)", ecc.eccnP(21531n, ecc.Gx, ecc.p - ecc.Gy), "n - 1 = 15792089237316195423570985008687907852837564279074904382605163141518161494336: ", ecc.eccnP(15792089237316195423570985008687907852837564279074904382605163141518161494336n, ecc.Gx, ecc.Gy), "n = n-1: ", ecc.eccnP(ecc.n_order - 1n, ecc.Gx, ecc.Gy), "n = n: ", ecc.eccnP(ecc.n_order, ecc.Gx, ecc.Gy), "\nn = n + 1: ", ecc.eccnP(ecc.n_order + 1n, ecc.Gx, ecc.Gy));
