/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////

class Ripemd160 {
    private ctx: ripemd160_context = new ripemd160_context();
  
    uint32_t(valor: bigint): bigint {
      return valor & 0xFFFFFFFFn;
    }

    //public long GET_UINT32_LE (char b[], int i) {
    GET_UINT32_LE (b: number[], i: number): bigint {
        let n: bigint;
         n =  BigInt(b[i])
                | BigInt (b[i + 1]) << 8n
                | BigInt (b[i + 2]) << 16n
                | BigInt (b[i + 3]) << 24n;
        return n;
    }

    //public char[] PUT_UINT32_LE (long n, char b[], int i) {
    PUT_UINT32_LE (n: bigint, b: number[], i: number): number[] {
        b[i    ] = Number(n & 0xFFn);
        b[i + 1] = Number(n >>  8n & 0xFFn);
        b[i + 2] = Number(n >> 16n & 0xFFn);
        b[i + 3] = Number(n >> 24n & 0xFFn);

        return b;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    ripemd160_starts(): void {
        this.ctx.total[0] = 0x0n;
        this.ctx.total[1] = 0x0n;

        this.ctx.state[0] = 0x67452301n;
        this.ctx.state[1] = 0xEFCDAB89n;
        this.ctx.state[2] = 0x98BADCFEn;
        this.ctx.state[3] = 0x10325476n;
        this.ctx.state[4] = 0xC3D2E1F0n;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    ripemd160_process (data: number[]): void {
        //final int A = 0, B = 1, C = 2, D = 3, E = 4;
        const A = 0, B = 1, C = 2, D = 3, E = 4;
        //long M[] = new long[5];
        let M: bigint[] = [5n];
        //long Mp[] = new long[5];
        let Mp: bigint[] = [5n]
        //long X[] = new long[16];
        let X: bigint[] = [16n]
        //int F, Fp; long K, Kp;
        let F: number, Fp: number; let K: bigint, Kp: bigint;

        X[ 0] = this.uint32_t(this.GET_UINT32_LE(data,  0));
        X[ 1] = this.uint32_t(this.GET_UINT32_LE(data,  4));
        X[ 2] = this.uint32_t(this.GET_UINT32_LE(data,  8));
        X[ 3] = this.uint32_t(this.GET_UINT32_LE(data, 12));
        X[ 4] = this.uint32_t(this.GET_UINT32_LE(data, 16));
        X[ 5] = this.uint32_t(this.GET_UINT32_LE(data, 20));
        X[ 6] = this.uint32_t(this.GET_UINT32_LE(data, 24));
        X[ 7] = this.uint32_t(this.GET_UINT32_LE(data, 28));
        X[ 8] = this.uint32_t(this.GET_UINT32_LE(data, 32));
        X[ 9] = this.uint32_t(this.GET_UINT32_LE(data, 36));
        X[10] = this.uint32_t(this.GET_UINT32_LE(data, 40));
        X[11] = this.uint32_t(this.GET_UINT32_LE(data, 44));
        X[12] = this.uint32_t(this.GET_UINT32_LE(data, 48));
        X[13] = this.uint32_t(this.GET_UINT32_LE(data, 52));
        X[14] = this.uint32_t(this.GET_UINT32_LE(data, 56));
        X[15] = this.uint32_t(this.GET_UINT32_LE(data, 60));

        M[A] = Mp[A] = this.ctx.state[0];
        M[B] = Mp[B] = this.ctx.state[1];
        M[C] = Mp[C] = this.ctx.state[2];
        M[D] = Mp[D] = this.ctx.state[3];
        M[E] = Mp[E] = this.ctx.state[4];

        //Define def = new Define();
        let def: Define = new Define();

        K = 0x00000000n; Kp = 0x50A28BE6n; F = 1; Fp = 5;
        M = def.P(M, A, B, C, D, E,  X[0], 11, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[5],  8, Fp, Kp); // OK
        M = def.P(M, E, A, B, C, D,  X[1], 14, F, K); Mp = def.P(Mp, E, A, B, C, D, X[14],  9, Fp, Kp); // OK
        M = def.P(M, D, E, A, B, C,  X[2], 15, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[7],  9, Fp, Kp); // OK
        M = def.P(M, C, D, E, A, B,  X[3], 12, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[0], 11, Fp, Kp); // OK
        M = def.P(M, B, C, D, E, A,  X[4],  5, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[9], 13, Fp, Kp); // OK
        M = def.P(M, A, B, C, D, E,  X[5],  8, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[2], 15, Fp, Kp); // OK
        M = def.P(M, E, A, B, C, D,  X[6],  7, F, K); Mp = def.P(Mp, E, A, B, C, D, X[11], 15, Fp, Kp); // OK
        M = def.P(M, D, E, A, B, C,  X[7],  9, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[4],  5, Fp, Kp); // OK
        M = def.P(M, C, D, E, A, B,  X[8], 11, F, K); Mp = def.P(Mp, C, D, E, A, B, X[13],  7, Fp, Kp); // OK
        M = def.P(M, B, C, D, E, A,  X[9], 13, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[6],  7, Fp, Kp); // OK
        M = def.P(M, A, B, C, D, E, X[10], 14, F, K); Mp = def.P(Mp, A, B, C, D, E, X[15],  8, Fp, Kp); // OK
        M = def.P(M, E, A, B, C, D, X[11], 15, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[8], 11, Fp, Kp); // OK
        M = def.P(M, D, E, A, B, C, X[12],  6, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[1], 14, Fp, Kp); // OK
        M = def.P(M, C, D, E, A, B, X[13],  7, F, K); Mp = def.P(Mp, C, D, E, A, B, X[10], 14, Fp, Kp); // OK
        M = def.P(M, B, C, D, E, A, X[14],  9, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[3], 12, Fp, Kp); // OK
        M = def.P(M, A, B, C, D, E, X[15],  8, F, K); Mp = def.P(Mp, A, B, C, D, E, X[12],  6, Fp, Kp); // OK

        K = 0x5A827999n; Kp = 0x5C4DD124n; F = 2; Fp = 4;
        M = def.P(M, E, A, B, C, D,  X[7],  7, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[6],  9, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[4],  6, F, K); Mp = def.P(Mp, D, E, A, B, C, X[11], 13, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B, X[13],  8, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[3], 15, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A,  X[1], 13, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[7],  7, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E, X[10], 11, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[0], 12, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[6],  9, F, K); Mp = def.P(Mp, E, A, B, C, D, X[13],  8, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[15], 7, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[5],  9, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[3], 15, F, K); Mp = def.P(Mp, C, D, E, A, B, X[10], 11, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[12],  7, F, K); Mp = def.P(Mp, B, C, D, E, A, X[14],  7, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[0], 12, F, K); Mp = def.P(Mp, A, B, C, D, E, X[15],  7, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[9], 15, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[8], 12, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[5],  9, F, K); Mp = def.P(Mp, D, E, A, B, C, X[12],  7, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[2], 11, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[4],  6, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[14],  7, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[9], 15, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E, X[11], 13, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[1], 13, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[8], 12, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[2], 11, Fp, Kp); // Ok

        K = 0x6ED9EBA1n; Kp = 0x6D703EF3n; F = 3; Fp = 3;
        M = def.P(M, D, E, A, B, C,  X[3], 11, F, K); Mp = def.P(Mp, D, E, A, B, C, X[15],  9, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B, X[10], 13, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[5],  7, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[14],  6, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[1], 15, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[4],  7, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[3], 11, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[9], 14, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[7],  8, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C, X[15],  9, F, K); Mp = def.P(Mp, D, E, A, B, C, X[14],  6, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[8], 13, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[6],  6, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A,  X[1], 15, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[9], 14, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[2], 14, F, K); Mp = def.P(Mp, A, B, C, D, E, X[11], 12, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[7],  8, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[8], 13, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[0], 13, F, K); Mp = def.P(Mp, D, E, A, B, C, X[12],  5, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[6],  6, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[2], 14, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[13],  5, F, K); Mp = def.P(Mp, B, C, D, E, A, X[10], 13, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E, X[11], 12, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[0], 13, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[5],  7, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[4],  7, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C, X[12],  5, F, K); Mp = def.P(Mp, D, E, A, B, C, X[13],  5, Fp, Kp); // Ok

        K = 0x8F1BBCDCn; Kp = 0x7A6D76E9n; F = 4; Fp = 2;
        M = def.P(M, C, D, E, A, B,  X[1], 11, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[8], 15, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A,  X[9], 12, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[6],  5, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E, X[11], 14, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[4],  8, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D, X[10], 15, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[1], 11, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[0], 14, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[3], 14, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[8], 15, F, K); Mp = def.P(Mp, C, D, E, A, B, X[11], 14, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[12],  9, F, K); Mp = def.P(Mp, B, C, D, E, A, X[15],  6, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[4],  8, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[0], 14, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D, X[13],  9, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[5],  6, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[3], 14, F, K); Mp = def.P(Mp, D, E, A, B, C, X[12],  9, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[7],  5, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[2], 12, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[15],  6, F, K); Mp = def.P(Mp, B, C, D, E, A, X[13],  9, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E, X[14],  8, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[9], 12, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[5],  6, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[7],  5, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[6],  5, F, K); Mp = def.P(Mp, D, E, A, B, C, X[10], 15, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[2], 12, F, K); Mp = def.P(Mp, C, D, E, A, B, X[14],  8, Fp, Kp); // Ok

        K = 0xA953FD4En; Kp = 0x00000000n; F = 5; Fp = 1;
        M = def.P(M, B, C, D, E, A,  X[4],  9, F, K); Mp = def.P(Mp, B, C, D, E, A, X[12],  8, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[0], 15, F, K); Mp = def.P(Mp, A, B, C, D, E, X[15],  5, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D,  X[5],  5, F, K); Mp = def.P(Mp, E, A, B, C, D, X[10], 12, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[9], 11, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[4],  9, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[7],  6, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[1], 12, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[12],  8, F, K); Mp = def.P(Mp, B, C, D, E, A,  X[5],  5, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[2], 13, F, K); Mp = def.P(Mp, A, B, C, D, E,  X[8], 14, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D, X[10], 12, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[7],  6, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C, X[14],  5, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[6],  8, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B,  X[1], 12, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[2], 13, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A,  X[3], 13, F, K); Mp = def.P(Mp, B, C, D, E, A, X[13],  6, Fp, Kp); // Ok
        M = def.P(M, A, B, C, D, E,  X[8], 14, F, K); Mp = def.P(Mp, A, B, C, D, E, X[14],  5, Fp, Kp); // Ok
        M = def.P(M, E, A, B, C, D, X[11], 11, F, K); Mp = def.P(Mp, E, A, B, C, D,  X[0], 15, Fp, Kp); // Ok
        M = def.P(M, D, E, A, B, C,  X[6],  8, F, K); Mp = def.P(Mp, D, E, A, B, C,  X[3], 13, Fp, Kp); // Ok
        M = def.P(M, C, D, E, A, B, X[15],  5, F, K); Mp = def.P(Mp, C, D, E, A, B,  X[9], 11, Fp, Kp); // Ok
        M = def.P(M, B, C, D, E, A, X[13],  6, F, K); Mp = def.P(Mp, B, C, D, E, A, X[11], 11, Fp, Kp); // Ok

        M[C]         = this.uint32_t(this.ctx.state[1] + M[C] + Mp[D]);
        this.ctx.state[1] = this.uint32_t(this.ctx.state[2] + M[D] + Mp[E]);
        this.ctx.state[2] = this.uint32_t(this.ctx.state[3] + M[E] + Mp[A]);
        this.ctx.state[3] = this.uint32_t(this.ctx.state[4] + M[A] + Mp[B]);
        this.ctx.state[4] = this.uint32_t(this.ctx.state[0] + M[B] + Mp[C]);
        this.ctx.state[0] = this.uint32_t(M[C]);
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    cpy(a: number[], b: number[], start: number, end: number): number[] {
        for (let idx = start; idx < end; idx++)
            a[idx] = b[idx - start];
        return a;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    
    pop(str: number[], ilen: number, n: number): number[] {
        const ans: number[] = new Array(ilen - n);
        for (let idx = n; idx < ilen; idx++)
            ans[idx - n] = str[idx];
        return ans;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////
    
    ripemd160_update(input: number[], ilen: number): void {
        let left = Number(this.ctx.total[0] & 0x3Fn);
        const fill = 64 - left;
    
        this.ctx.total[0] += BigInt(ilen);
        this.ctx.total[0] &= 0xFFFFFFFFn;
    
        if (this.ctx.total[0] < BigInt(ilen))
            this.ctx.total[1]++;
    
        if (left !== 0 && ilen >= fill) {

            //this.ctx.buffer = this.cpy(this.ctx.buffer, input, left, left + fill);
            this.ctx.buffer = this.cpy(this.ctx.buffer, input, left, left + fill);
            
            this.ripemd160_process(this.ctx.buffer);
    
            input = this.pop(input, ilen, fill);
            ilen -= fill;
            left = 0;
        }
    
        while (ilen >= 64) {
            //console.log(input);
            this.ripemd160_process(input);
            input = this.pop(input, ilen, 64);
            ilen -= 64;
        }
    
        if (ilen > 0) this.ctx.buffer = this.cpy(this.ctx.buffer, input, left, left + ilen);
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    ripemd160_finish(): number[] {

        let ripemd160_padding: number [] =
                [    0x80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                ];

        //long last, padn;
        //long high, low;
        let last: bigint, padn: bigint, high: bigint, low: bigint;
        //char msglen[] = new char[8];
        let msglen: number[] = [8]
        //char output[] = new char[20];
        let output: number[] = [20]

        high = (this.ctx.total[0] >> 29n)
                | (this.ctx.total[1] <<  3n);
        low = (this.ctx.total[0] <<  3n);

        msglen = this.PUT_UINT32_LE(low, msglen, 0);
        msglen = this.PUT_UINT32_LE(high, msglen, 4);

        last = this.ctx.total[0] & 0x3Fn;
        padn = (last < 56n) ?(56n - last) :(120n - last);


        this.ripemd160_update(ripemd160_padding, Number(padn));
        this.ripemd160_update(msglen, 8);

        output = this.PUT_UINT32_LE(this.ctx.state[0], output,  0);
        output = this.PUT_UINT32_LE(this.ctx.state[1], output,  4);
        output = this.PUT_UINT32_LE(this.ctx.state[2], output,  8);
        output = this.PUT_UINT32_LE(this.ctx.state[3], output, 12);
        output = this.PUT_UINT32_LE(this.ctx.state[4], output, 16);

        return output;
    }    
    
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    //public char[] ripemd160 (char input[], int ilen) {
    ripemd160 (input: number[], ilen: number): number[] {
        this.ripemd160_starts();
        this.ripemd160_update(input, ilen);
        return this.ripemd160_finish();
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    //Metodo usado para transforma um HASH SHA256 de bytes para String
    static HashCharToStr(hashKey: number[]): string {
        //Cada posição do vetor tem 2 nibbles
        const result: number[] = new Array(2 * hashKey.length);
    
        for (let i = 0; i < 2 * hashKey.length; i++) {
        if (i % 2 === 0) {
            result[i] = (hashKey[i / 2] / 0x10) & 0x0f;
        } else {
            result[i] = hashKey[Math.floor(i / 2)] & 0x0f;
        }
    
        switch (result[i]) {
            case 0:
            result[i] = 0x30;
            break;
            case 1:
            result[i] = 0x31;
            break;
            case 2:
            result[i] = 0x32;
            break;
            case 3:
            result[i] = 0x33;
            break;
            case 4:
            result[i] = 0x34;
            break;
            case 5:
            result[i] = 0x35;
            break;
            case 6:
            result[i] = 0x36;
            break;
            case 7:
            result[i] = 0x37;
            break;
            case 8:
            result[i] = 0x38;
            break;
            case 9:
            result[i] = 0x39;
            break;
            case 10:
            result[i] = 0x61;
            break;
            case 11:
            result[i] = 0x62;
            break;
            case 12:
            result[i] = 0x63;
            break;
            case 13:
            result[i] = 0x64;
            break;
            case 14:
            result[i] = 0x65;
            break;
            case 15:
            result[i] = 0x66;
            break;
        }
        }
    
        return String.fromCharCode(...result);
    }
}

/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////

class ripemd160_context {
    total: bigint[] = [0n, 0n];
    state: bigint[] = [0n, 0n, 0n, 0n, 0n];
    buffer: number[] = new Array(64).fill(0);
}

/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////

class Define {

    uint32_t(valor: bigint): bigint {
        return valor & 0xFFFFFFFFn;
    }

    S(x: bigint, n: number): bigint {
        return ((x << BigInt(n)) | (x >> BigInt(32 - n)));
    }
    
    P(
        M: bigint[],
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        X: bigint,
        s: number,
        F: number,
        K: bigint
      ): bigint[] {
        let f = BigInt(0);
    
        if (F === 1) f = M[b] ^ M[c] ^ M[d];
        else if (F === 2) f = (M[b] & M[c]) | (~M[b] & M[d]);
        else if (F === 3) f = (M[b] | ~M[c]) ^ M[d];
        else if (F === 4) f = (M[b] & M[d]) | (M[c] & ~M[d]);
        else if (F === 5) f = M[b] ^ (M[c] | ~M[d]);
    
        f = this.uint32_t(f);
    
        M[a] = this.uint32_t(M[a] + f + X + K);
        M[a] = this.uint32_t(this.S(M[a], s) + M[e]);
        M[c] = this.uint32_t(this.S(M[c], 10));
    
        return M;
    }
}
  