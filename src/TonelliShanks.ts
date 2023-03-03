/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////
class TonelliShanks {
    eccobj: Ecc;
  
    constructor() {
      this.eccobj = new Ecc();
    }
    
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    pow_mod(base: bigint, expoent: bigint, modulus: bigint): bigint {
      let result: bigint = 1n;
      base = this.eccobj.modp(base, modulus);
      while (expoent > 0n) {
        if (this.eccobj.modp(expoent, 2n) === 1n) {
          result = this.eccobj.modp(result * base, modulus);
        }
        expoent = expoent / 2n;
        base = this.eccobj.modp(base * base, modulus);
      }
      return result;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    
    sqrtCF(n: bigint, p: bigint): bigint {
      let s: bigint = 0n;
      let q: bigint = p - 1n;
      while ((q & 1n) === 0n) {
        q = q / 2n;
        s++;
      }
      if (s === 1n) {
        let r: bigint = this.pow_mod(n, (p + 1n) / 4n, p);
        if (this.eccobj.modp(r * r, p) === n) {
          return r;
        }
        return 0n;
      }
  
      // Find the first quadratic non-residue z by brute-force search
      let z: bigint = 1n;
      while (true) {
        if (this.pow_mod(z + 1n, (p - 1n) / 2n, p) === p - 1n) {
          break;
        }
        z++;
      }
  
      let c: bigint = this.pow_mod(z, q, p);
      let r: bigint = this.pow_mod(n, (q + 1n) / 2n, p);
      let t: bigint = this.pow_mod(n, q, p);
      let m: bigint = s;
  
      while (t !== 1n) {
        let tt: bigint = t;
        let i: bigint = 0n;
        while (tt !== 1n) {
          tt = this.eccobj.modp(tt * tt, p);
          i++;
          if (i === m) {
            return 0n;
          }
        }
        let b: bigint = this.pow_mod(c, this.pow_mod(2n, m - i - 1n, p - 1n), p);
        let b2: bigint = this.eccobj.modp(b * b, p);
        r = this.eccobj.modp(r * b, p);
        t = this.eccobj.modp(t * b2, p);
        c = b2;
        m = i;
      }
  
      if (this.eccobj.modp(r * r, p) === n) {
        return r;
      }
      return 0n;
    }
}