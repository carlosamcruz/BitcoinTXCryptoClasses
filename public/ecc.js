"use strict";
/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////
class Ecc {
    p;
    Gx;
    Gy;
    n_order;
    A;
    B;
    point;
    pointNULL;
    constructor() {
        this.p = 115792089237316195423570985008687907853269984665640564039457584007908834671663n;
        this.n_order = 115792089237316195423570985008687907852837564279074904382605163141518161494337n;
        this.Gx = 55066263022277343669578718895168534326250603453777594175500187360389116729240n;
        this.Gy = 32670510020758816978083085130507043184471273380659243275938904335757337482424n;
        this.A = 0n;
        this.B = 7n;
        this.point = [0n, 0n];
        this.pointNULL = [0n, 0n];
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    modp(n, p1) {
        n = n % p1;
        if (n < 0n)
            return p1 + n;
        return n;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    inverse(r, p) {
        let t = 1n;
        let aux = p;
        let newr = r;
        let newt = (0n - (aux / r));
        while ((newr = aux % (r = newr)) !== 0n) {
            aux = t;
            newt = aux - ((t = newt) * (r / newr));
            aux = r;
        }
        if (t < 0n)
            return t + p;
        return t;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    doublep(x, y) {
        let point = [0n, 0n];
        let m = this.modp(((this.inverse(y * 2n, this.p)) * ((x * 3n) * x + this.A)), this.p);
        point[0] = this.modp(m ** 2n - (x * 2n), this.p);
        point[1] = this.modp(-(m * this.modp(m ** 2n, this.p) - (m * 2n * x) + (y - (m * x))), this.p);
        return point;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    addp(x1, y1, x2, y2) {
        let m, d;
        let point = [0n, 0n];
        if (x1 === x2) {
            if (y1 === y2) {
                return this.doublep(x1, y1);
            }
            else {
                return this.pointNULL;
            }
        }
        m = this.modp((y2 - y1) * this.inverse(this.modp(x2 - x1, this.p), this.p), this.p);
        point[0] = this.modp(this.modp(m ** 2n, this.p) - (x1 + x2), this.p);
        point[1] = this.modp(-(this.modp(m * (point[0] - x1), this.p) + y1), this.p);
        return point;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    eccnP(n, x, y) {
        if (n < 0n) {
            n = 0n - n;
            y = this.p - y;
        }
        let x3 = x;
        let y3 = y;
        let pointR = [0n, 0n];
        let point = [0n, 0n];
        let n3 = n * 3n;
        let bittest = 1n;
        while (bittest <= n3) {
            bittest *= 2n;
        }
        bittest /= 4n;
        while ((bittest - 1n) > 0n) {
            pointR = this.doublep(x3, y3);
            x3 = pointR[0];
            y3 = pointR[1];
            if ((n3 & bittest) !== 0n && (n & bittest) === 0n) {
                pointR = this.addp(x3, y3, x, y);
                x3 = pointR[0];
                y3 = pointR[1];
            }
            if ((n3 & bittest) === 0n && (n & bittest) !== 0n) {
                pointR = this.addp(x3, y3, x, this.p - y);
                x3 = pointR[0];
                y3 = pointR[1];
            }
            bittest /= 2n;
        }
        point[0] = x3;
        point[1] = y3;
        return point;
    }
}
