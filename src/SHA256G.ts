/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////
class SHA256G {

    /////////////////////////////////////////////////////////////////////////////////////////////
    //SHA 256 SETUP
    /////////////////////////////////////////////////////////////////////////////////////////////

    private static Kzh: bigint[] = [
      0x428a2f98n, 0x71374491n, 0xb5c0fbcfn, 0xe9b5dba5n,
      0x3956c25bn, 0x59f111f1n, 0x923f82a4n, 0xab1c5ed5n,
      0xd807aa98n, 0x12835b01n, 0x243185ben, 0x550c7dc3n,
      0x72be5d74n, 0x80deb1fen, 0x9bdc06a7n, 0xc19bf174n,
      0xe49b69c1n, 0xefbe4786n, 0x0fc19dc6n, 0x240ca1ccn,
      0x2de92c6fn, 0x4a7484aan, 0x5cb0a9dcn, 0x76f988dan,
      0x983e5152n, 0xa831c66dn, 0xb00327c8n, 0xbf597fc7n,
      0xc6e00bf3n, 0xd5a79147n, 0x06ca6351n, 0x14292967n,
      0x27b70a85n, 0x2e1b2138n, 0x4d2c6dfcn, 0x53380d13n,
      0x650a7354n, 0x766a0abbn, 0x81c2c92en, 0x92722c85n,
      0xa2bfe8a1n, 0xa81a664bn, 0xc24b8b70n, 0xc76c51a3n,
      0xd192e819n, 0xd6990624n, 0xf40e3585n, 0x106aa070n,
      0x19a4c116n, 0x1e376c08n, 0x2748774cn, 0x34b0bcb5n,
      0x391c0cb3n, 0x4ed8aa4an, 0x5b9cca4fn, 0x682e6ff3n,
      0x748f82een, 0x78a5636fn, 0x84c87814n, 0x8cc70208n,
      0x90befffan, 0xa4506cebn, 0xbef9a3f7n, 0xc67178f2n
    ];
  
    private static H0: bigint[] = [
      0x6a09e667n, 0xbb67ae85n, 0x3c6ef372n, 0xa54ff53an,
      0x510e527fn, 0x9b05688cn, 0x1f83d9abn, 0x5be0cd19n
    ];


    public static sha_256(W: bigint[], Hi0: bigint[], Hi: bigint[]): number {
        let A, B, C, D, E, F, G, H, temp1, temp2;
        let t = 0;
      
        for (t = 16; t < 64; t++) {
          W[t] = this.setRange(this.S1(W[t - 2]) + W[t - 7] + this.S0(W[t - 15]) + W[t - 16]);
        }
        temp1 = this.setRange(Hi0[7] + this.S3(Hi0[4]) + this.CH(Hi0[4], Hi0[5], Hi0[6]) + this.Kzh[0] + W[0]);
        temp2 = this.setRange(this.S2(Hi0[0]) + this.MAJ(Hi0[0], Hi0[1], Hi0[2]));
        H = Hi0[6];
        G = Hi0[5];
        F = Hi0[4];
        E = this.setRange(Hi0[3] + temp1);
        D = Hi0[2];
        C = Hi0[1];
        B = Hi0[0];
        A = this.setRange(temp1 + temp2);
      
        for (t = 1; t < 63; t++) {
          temp1 = this.setRange(H + this.S3(E) + this.CH(E, F, G) + this.Kzh[t] + W[t]);
          temp2 = this.setRange(this.S2(A) + this.MAJ(A, B, C));
          H = G;
          G = F;
          F = E;
          E = this.setRange(D + temp1);
          D = C;
          C = B;
          B = A;
          A = this.setRange(temp1 + temp2);
        }
        ///////////////////////////////////////////////////////////
        // when t = 63
        // In order to avoid extra computation
        ///////////////////////////////////////////////////////////
        temp1 = this.setRange(H + this.S3(E) + this.CH(E, F, G) + this.Kzh[63] + W[63]);
        temp2 = this.setRange(this.S2(A) + this.MAJ(A, B, C));
        Hi[0] = this.setRange(temp1 + temp2 + Hi0[0]);
        Hi[1] = this.setRange(A + Hi0[1]);
        Hi[2] = this.setRange(B + Hi0[2]);
        Hi[3] = this.setRange(C + Hi0[3]);
        Hi[4] = this.setRange(D + temp1 + Hi0[4]);
        Hi[5] = this.setRange(E + Hi0[5]);
        Hi[6] = this.setRange(F + Hi0[6]);
        Hi[7] = this.setRange(G + Hi0[7]);
      
        return 0;
    }
      
    public static setRange(val: bigint): bigint {
        return val & 0xFFFFFFFFn;
    }
      
    public static SHR(x: bigint, n: bigint): bigint {
        return (x & 0xFFFFFFFFn) >> n;
    }
      
    public static ROTR(x: bigint, n: number): bigint {
        const tmp1 = this.setRange(x << (32n - BigInt(n)));
        return (this.SHR(x, BigInt(n)) | tmp1);
    }
      
    public static S0(x: bigint): bigint {
        return this.ROTR(x, 7) ^ this.ROTR(x, 18) ^ this.SHR(x, 3n);
    }
      
    public static S1(x: bigint): bigint {
        return this.ROTR(x, 17) ^ this.ROTR(x, 19) ^ this.SHR(x, 10n);
    }
      
    public static S2(x: bigint): bigint {
        return this.ROTR(x, 2) ^ this.ROTR(x, 13) ^ this.ROTR(x, 22);
    }
      
    public static S3(x: bigint): bigint {
        return this.ROTR(x, 6) ^ this.ROTR(x, 11) ^ this.ROTR(x, 25);
    }
      
    public static MAJ(x: bigint, y: bigint, z: bigint): bigint {
        return (x & y) | (z & (x | y));
    }
      
    public static CH(x: bigint, y: bigint, z: bigint): bigint {
        return z ^ (x & (y ^ z));
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
      
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para construir um Hash SHA256 a partir de uma Stream de Bytes
    // A Stream de byte aqui deve ser HEXADECIMAL
    // Só funciona se a ENTRADA chegar em forma NUMERICA
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static SHA256bytes(txtcomp: number[]): string {

        const W: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000008n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        const Hi: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        // byte [] result = new
        
        if (txtcomp.length > 0) {
    
            //const result: string[] = new Array(64);
            let resultfinal: string = '';
            //let result: number[] = [64];
            let result: BigInt[] = [64n];

            // Para String de 448 bits 56 letras A
            let i = 0;
            let firstCycle = true;

            for (; i < (txtcomp.length) - ((txtcomp.length) % 64); i += 64) {
            // perform loop logic here

                W[0] = (0x01000000n * (BigInt(txtcomp[i]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 1]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 2]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 3]) & 0x000000FFn));
                W[1] = (0x01000000n * (BigInt(txtcomp[i + 4]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 5]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 6]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 7]) & 0x000000FFn));
                W[2] = (0x01000000n * (BigInt(txtcomp[i + 8]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 9]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 10]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 11]) & 0x000000FFn));
                W[3] = (0x01000000n * (BigInt(txtcomp[i + 12]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 13]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 14]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 15]) & 0x000000FFn));
                W[4] = (0x01000000n * (BigInt(txtcomp[i + 16]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 17]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 18]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 19]) & 0x000000FFn));
                W[5] = (0x01000000n * (BigInt(txtcomp[i + 20]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 21]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 22]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 23]) & 0x000000FFn));

                W[6] = (0x01000000n * (BigInt(txtcomp[i + 24]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 25]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 26]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 27]) & 0x000000FFn));
                W[7] = (0x01000000n * (BigInt(txtcomp[i + 28]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 29]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 30]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 31]) & 0x000000FFn));
                W[8] = (0x01000000n * (BigInt(txtcomp[i + 32]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 33]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 34]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 35]) & 0x000000FFn));
                W[9] = (0x01000000n * (BigInt(txtcomp[i + 36]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 37]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 38]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 39]) & 0x000000FFn));
                W[10] = (0x01000000n * (BigInt(txtcomp[i + 40]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 41]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 42]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 43]) & 0x000000FFn));
                W[11] = (0x01000000n * (BigInt(txtcomp[i + 44]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 45]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 46]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 47]) & 0x000000FFn));

                W[12] = (0x01000000n * (BigInt(txtcomp[i + 48]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 49]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 50]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 51]) & 0x000000FFn));
                W[13] = (0x01000000n * (BigInt(txtcomp[i + 52]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 53]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 54]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 55]) & 0x000000FFn));
                W[14] = (0x01000000n * (BigInt(txtcomp[i + 56]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 57]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 58]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 59]) & 0x000000FFn));
                W[15] = (0x01000000n * (BigInt(txtcomp[i + 60]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 61]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 62]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 63]) & 0x000000FFn));


                if(firstCycle)
                {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;
                }
                else 
                    this.sha_256 (W, Hi, Hi);

            }

            W[0] = 0x00000000n;  W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
            W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
            W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
            W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000000n;


            let j: number;
            let k = 0;
            for (j = i; j < txtcomp.length; j++) {
                switch (j % 4) {
                    case 0:
                    W[k] = 0x01000000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 1:
                    W[k] += 0x00010000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 2:
                    W[k] += 0x00000100n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 3:
                    W[k] += 0x00000001n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    // so para para o proximo k quando passar pelos 4
                    k++;
                    break;
                }
            }
            
            switch ((j - 1) % 4) {
            case 0:
                W[k] += 0x00800000n;
                break;
            case 1:
                W[k] += 0x00008000n;
                break;
            case 2:
                W[k] += 0x00000080n;
                break;
            case 3:
                // neste caso será o k posterior
                W[k] = 0x80000000n;
                break;
            }
            
            if (txtcomp.length % 64 < 56) {
                W[14] = 0x00000000n;
                W[15] = 0x00000001n * BigInt(8 * txtcomp.length);

                //console.log("W: ", W); //ok
            
                if (firstCycle) {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;

                } else {
                    this.sha_256(W, Hi, Hi);
                }

                //console.log("W after: ", W); //ok
            } 
            else {
                if (firstCycle) {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;
                } else {
                    this.sha_256(W, Hi, Hi);
                }
            
                W[0] = 0x00000000n; W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
                W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
                W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
                W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000001n * BigInt(8 * txtcomp.length);
            
                this.sha_256(W, Hi, Hi);
            }
            
            //let result: number[] = [64];
            let base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for(let i = 0; i < 8; i++) {
                result[i*8 + 0] = (Hi[i]/0x10000000n) & 0x0000000Fn;
                result[i*8 + 1] = (Hi[i]/0x01000000n) & 0x0000000Fn;
                result[i*8 + 2] = (Hi[i]/0x00100000n) & 0x0000000Fn;
                result[i*8 + 3] = (Hi[i]/0x00010000n) & 0x0000000Fn;
                result[i*8 + 4] = (Hi[i]/0x00001000n) & 0x0000000Fn;
                result[i*8 + 5] = (Hi[i]/0x00000100n) & 0x0000000Fn;
                result[i*8 + 6] = (Hi[i]/0x00000010n) & 0x0000000Fn;
                result[i*8 + 7] = (Hi[i]/0x00000001n) & 0x0000000Fn;
            }

            for(let i = 0; i < 64; i++) {
                //result[i] = base16[result[i]];
                //resultfinal += base16[result[i]];
                resultfinal = resultfinal + base16[Number(result[i])];
            }

            //return result.join('');
            return resultfinal;
        }
        return '';
    }
    /////////////////////////////////////////////////////////////////////////////////////////////       
    /////////////////////////////////////////////////////////////////////////////////////////////       

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para construir um Hash SHA256 a partir de uma Stream de Bytes
    //      e um vetor inicializador H0 alternativo também em bytes
    // A Stream de byte aqui deve ser HEXADECIMAL
    // Só funciona se a ENTRADA chegar em forma NUMERICA
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static SHA256MsnHxHex2(txtcomp: number[], Hx: number[]): string {

        const W: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000008n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        const Hi: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];

        const H0x: bigint[] = [
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
            ];

        if((txtcomp.length>0) && (Hx.length === 32)) {

            let resultfinal: string = '';
            let result: BigInt[] = [64n];

            for(let i=0; i < 8; i++)
            {
                H0x[i] = (0x01000000n * (BigInt(Hx[4*i + 0]) & 0x00000000FFn))
                        + (0x00010000n * (BigInt(Hx[4*i + 1]) & 0x00000000FFn))
                        + (0x00000100n * (BigInt(Hx[4*i + 2]) & 0x00000000FFn))
                        + (0x00000001n * (BigInt(Hx[4*i + 3]) & 0x00000000FFn));         
            }

            // Para String de 448 bits 56 letras A

            let i = 0;
            let firstCycle = true;

            //Toast.makeText(SHA256G.this,"Entrada Inválida",Toast.LENGTH_SHORT).show();
            for (; i < (txtcomp.length) - ((txtcomp.length) % 64); i += 64) {
                // perform loop logic here
    
                    W[0] = (0x01000000n * (BigInt(txtcomp[i]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 1]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 2]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 3]) & 0x000000FFn));
                    W[1] = (0x01000000n * (BigInt(txtcomp[i + 4]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 5]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 6]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 7]) & 0x000000FFn));
                    W[2] = (0x01000000n * (BigInt(txtcomp[i + 8]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 9]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 10]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 11]) & 0x000000FFn));
                    W[3] = (0x01000000n * (BigInt(txtcomp[i + 12]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 13]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 14]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 15]) & 0x000000FFn));
                    W[4] = (0x01000000n * (BigInt(txtcomp[i + 16]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 17]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 18]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 19]) & 0x000000FFn));
                    W[5] = (0x01000000n * (BigInt(txtcomp[i + 20]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 21]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 22]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 23]) & 0x000000FFn));
    
                    W[6] = (0x01000000n * (BigInt(txtcomp[i + 24]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 25]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 26]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 27]) & 0x000000FFn));
                    W[7] = (0x01000000n * (BigInt(txtcomp[i + 28]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 29]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 30]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 31]) & 0x000000FFn));
                    W[8] = (0x01000000n * (BigInt(txtcomp[i + 32]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 33]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 34]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 35]) & 0x000000FFn));
                    W[9] = (0x01000000n * (BigInt(txtcomp[i + 36]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 37]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 38]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 39]) & 0x000000FFn));
                    W[10] = (0x01000000n * (BigInt(txtcomp[i + 40]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 41]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 42]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 43]) & 0x000000FFn));
                    W[11] = (0x01000000n * (BigInt(txtcomp[i + 44]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 45]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 46]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 47]) & 0x000000FFn));
    
                    W[12] = (0x01000000n * (BigInt(txtcomp[i + 48]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 49]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 50]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 51]) & 0x000000FFn));
                    W[13] = (0x01000000n * (BigInt(txtcomp[i + 52]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 53]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 54]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 55]) & 0x000000FFn));
                    W[14] = (0x01000000n * (BigInt(txtcomp[i + 56]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 57]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 58]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 59]) & 0x000000FFn));
                    W[15] = (0x01000000n * (BigInt(txtcomp[i + 60]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 61]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 62]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 63]) & 0x000000FFn));
    
    
                    if(firstCycle)
                    {
                        //this.sha_256(W, this.H0, Hi);
                        this.sha_256(W, H0x, Hi);
                        firstCycle = false;
                    }
                    else 
                        this.sha_256 (W, Hi, Hi);
    
                }

                
            W[0] = 0x00000000n;  W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
            W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
            W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
            W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000000n;


            let j: number;
            let k = 0;
            for (j = i; j < txtcomp.length; j++) {
                switch (j % 4) {
                    case 0:
                    W[k] = 0x01000000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 1:
                    W[k] += 0x00010000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 2:
                    W[k] += 0x00000100n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 3:
                    W[k] += 0x00000001n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    // so para para o proximo k quando passar pelos 4
                    k++;
                    break;
                }
            }

            switch ((j - 1) % 4) {
                case 0:
                    W[k] += 0x00800000n;
                    break;
                case 1:
                    W[k] += 0x00008000n;
                    break;
                case 2:
                    W[k] += 0x00000080n;
                    break;
                case 3:
                    // neste caso será o k posterior
                    W[k] = 0x80000000n;
                    break;
            }
        
            if (txtcomp.length % 64 < 56) {
                W[14] = 0x00000000n;
                W[15] = 0x00000001n * BigInt(8 * txtcomp.length);

                //console.log("W: ", W); //ok
            
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;

                } else {
                    this.sha_256(W, Hi, Hi);
                }

                //console.log("W after: ", W); //ok
            } 
            else {
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;
                } else {
                    this.sha_256(W, Hi, Hi);
                }
            
                W[0] = 0x00000000n; W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
                W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
                W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
                W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000001n * BigInt(8 * txtcomp.length);
            
                this.sha_256(W, Hi, Hi);
            }

        

            //let result: number[] = [64];
            let base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for(let i = 0; i < 8; i++) {
                result[i*8 + 0] = (Hi[i]/0x10000000n) & 0x0000000Fn;
                result[i*8 + 1] = (Hi[i]/0x01000000n) & 0x0000000Fn;
                result[i*8 + 2] = (Hi[i]/0x00100000n) & 0x0000000Fn;
                result[i*8 + 3] = (Hi[i]/0x00010000n) & 0x0000000Fn;
                result[i*8 + 4] = (Hi[i]/0x00001000n) & 0x0000000Fn;
                result[i*8 + 5] = (Hi[i]/0x00000100n) & 0x0000000Fn;
                result[i*8 + 6] = (Hi[i]/0x00000010n) & 0x0000000Fn;
                result[i*8 + 7] = (Hi[i]/0x00000001n) & 0x0000000Fn;
            }

            for(let i = 0; i < 64; i++) {
                //result[i] = base16[result[i]];
                //resultfinal += base16[result[i]];
                resultfinal = resultfinal + base16[Number(result[i])];
            }

            //return result.join('');
            return resultfinal;           
        }    
        return '';        
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para construir um Hash SHA256 com resultado em Bytes
    // a partir de uma Stream de Bytes e um vetor inicializador H0 alternativo também em bytes
    // A Stream de byte aqui deve ser HEXADECIMAL
    // Só funciona se a ENTRADA chegar em forma NUMERICA
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static SHA256MsnHxHex3(txtcomp: number[], Hx: number[]): number[] {

        const W: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000008n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        const Hi: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];

        const H0x: bigint[] = [
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
            ];

        let result: number[] = 
        [   0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
            ];

        if((txtcomp.length>0) && (Hx.length === 32)) {

            for(let i=0; i < 8; i++)
            {
                H0x[i] = (0x01000000n * (BigInt(Hx[4*i + 0]) & 0x00000000FFn))
                        + (0x00010000n * (BigInt(Hx[4*i + 1]) & 0x00000000FFn))
                        + (0x00000100n * (BigInt(Hx[4*i + 2]) & 0x00000000FFn))
                        + (0x00000001n * (BigInt(Hx[4*i + 3]) & 0x00000000FFn));         

            }

            // Para String de 448 bits 56 letras A

            let i = 0;
            let firstCycle = true;

            //Toast.makeText(SHA256G.this,"Entrada Inválida",Toast.LENGTH_SHORT).show();
            for (; i < (txtcomp.length) - ((txtcomp.length) % 64); i += 64) {
                // perform loop logic here
    
                    W[0] = (0x01000000n * (BigInt(txtcomp[i]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 1]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 2]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 3]) & 0x000000FFn));
                    W[1] = (0x01000000n * (BigInt(txtcomp[i + 4]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 5]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 6]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 7]) & 0x000000FFn));
                    W[2] = (0x01000000n * (BigInt(txtcomp[i + 8]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 9]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 10]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 11]) & 0x000000FFn));
                    W[3] = (0x01000000n * (BigInt(txtcomp[i + 12]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 13]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 14]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 15]) & 0x000000FFn));
                    W[4] = (0x01000000n * (BigInt(txtcomp[i + 16]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 17]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 18]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 19]) & 0x000000FFn));
                    W[5] = (0x01000000n * (BigInt(txtcomp[i + 20]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 21]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 22]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 23]) & 0x000000FFn));
    
                    W[6] = (0x01000000n * (BigInt(txtcomp[i + 24]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 25]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 26]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 27]) & 0x000000FFn));
                    W[7] = (0x01000000n * (BigInt(txtcomp[i + 28]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 29]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 30]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 31]) & 0x000000FFn));
                    W[8] = (0x01000000n * (BigInt(txtcomp[i + 32]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 33]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 34]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 35]) & 0x000000FFn));
                    W[9] = (0x01000000n * (BigInt(txtcomp[i + 36]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 37]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 38]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 39]) & 0x000000FFn));
                    W[10] = (0x01000000n * (BigInt(txtcomp[i + 40]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 41]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 42]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 43]) & 0x000000FFn));
                    W[11] = (0x01000000n * (BigInt(txtcomp[i + 44]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 45]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 46]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 47]) & 0x000000FFn));
    
                    W[12] = (0x01000000n * (BigInt(txtcomp[i + 48]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 49]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 50]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 51]) & 0x000000FFn));
                    W[13] = (0x01000000n * (BigInt(txtcomp[i + 52]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 53]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 54]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 55]) & 0x000000FFn));
                    W[14] = (0x01000000n * (BigInt(txtcomp[i + 56]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 57]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 58]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 59]) & 0x000000FFn));
                    W[15] = (0x01000000n * (BigInt(txtcomp[i + 60]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 61]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 62]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 63]) & 0x000000FFn));
    
    
                    if(firstCycle)
                    {
                        //this.sha_256(W, this.H0, Hi);
                        this.sha_256(W, H0x, Hi);
                        firstCycle = false;
                    }
                    else 
                        this.sha_256 (W, Hi, Hi);
    
                }

                
            W[0] = 0x00000000n;  W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
            W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
            W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
            W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000000n;


            let j: number;
            let k = 0;
            for (j = i; j < txtcomp.length; j++) {
                switch (j % 4) {
                    case 0:
                    W[k] = 0x01000000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 1:
                    W[k] += 0x00010000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 2:
                    W[k] += 0x00000100n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 3:
                    W[k] += 0x00000001n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    // so para para o proximo k quando passar pelos 4
                    k++;
                    break;
                }
            }

            switch ((j - 1) % 4) {
                case 0:
                    W[k] += 0x00800000n;
                    break;
                case 1:
                    W[k] += 0x00008000n;
                    break;
                case 2:
                    W[k] += 0x00000080n;
                    break;
                case 3:
                    // neste caso será o k posterior
                    W[k] = 0x80000000n;
                    break;
            }
        
            if (txtcomp.length % 64 < 56) {
                W[14] = 0x00000000n;
                W[15] = 0x00000001n * BigInt(8 * txtcomp.length);

                //console.log("W: ", W); //ok
            
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;

                } else {
                    this.sha_256(W, Hi, Hi);
                }

                //console.log("W after: ", W); //ok
            } 
            else {
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;
                } else {
                    this.sha_256(W, Hi, Hi);
                }
            
                W[0] = 0x00000000n; W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
                W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
                W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
                W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000001n * BigInt(8 * txtcomp.length);
            
                this.sha_256(W, Hi, Hi);
            }

            for(i = 0; i < 8; i++)
            {
                result[i*4 + 0] = Number(((Hi[i]/0x01000000n) & 0x000000FFn));
                result[i*4 + 1] = Number(((Hi[i]/0x00010000n) & 0x000000FFn));
                result[i*4 + 2] = Number(((Hi[i]/0x00000100n) & 0x000000FFn));
                result[i*4 + 3] = Number(((Hi[i]/0x00000001n) & 0x000000FFn));
            }

            return result;           
        }    
        return result;        
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para construir um Hash SHA256 a partir de uma String 
    //      e um vetor inicializador H0 alternativo em String Hexadecimal
    // A Stream de byte aqui deve ser HEXADECIMAL
    // Só funciona se a ENTRADA chegar em forma NUMERICA
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static SHA256MsnHx(txtcompSTR: string, HxSTR: string): string {

        const W: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000008n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        const Hi: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];

        const H0x: bigint[] = [
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
            0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
            ];

        let txtcomp: number[];
        let Hx: number[];
        txtcomp = this.StrToByte(txtcompSTR);
        //txtcomp = this.HashStrToByte2(txtcompSTR);
        //Hx = this.StrToByte(HxSTR);
        Hx = this.HashStrToByte2(HxSTR);
        //console.log("txtcomp: ", txtcomp );
        //console.log("\nHx: ", Hx );

        if((txtcomp.length>0) && (Hx.length === 32)) {

            let resultfinal: string = '';
            let result: BigInt[] = [64n];

            for(let i=0; i < 8; i++)
            {
                H0x[i] = (0x01000000n * (BigInt(Hx[4*i + 0]) & 0x00000000FFn))
                        + (0x00010000n * (BigInt(Hx[4*i + 1]) & 0x00000000FFn))
                        + (0x00000100n * (BigInt(Hx[4*i + 2]) & 0x00000000FFn))
                        + (0x00000001n * (BigInt(Hx[4*i + 3]) & 0x00000000FFn));         
            }

            // Para String de 448 bits 56 letras A

            let i = 0;
            let firstCycle = true;

            //Toast.makeText(SHA256G.this,"Entrada Inválida",Toast.LENGTH_SHORT).show();
            for (; i < (txtcomp.length) - ((txtcomp.length) % 64); i += 64) {
                // perform loop logic here
    
                    W[0] = (0x01000000n * (BigInt(txtcomp[i]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 1]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 2]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 3]) & 0x000000FFn));
                    W[1] = (0x01000000n * (BigInt(txtcomp[i + 4]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 5]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 6]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 7]) & 0x000000FFn));
                    W[2] = (0x01000000n * (BigInt(txtcomp[i + 8]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 9]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 10]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 11]) & 0x000000FFn));
                    W[3] = (0x01000000n * (BigInt(txtcomp[i + 12]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 13]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 14]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 15]) & 0x000000FFn));
                    W[4] = (0x01000000n * (BigInt(txtcomp[i + 16]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 17]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 18]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 19]) & 0x000000FFn));
                    W[5] = (0x01000000n * (BigInt(txtcomp[i + 20]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 21]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 22]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 23]) & 0x000000FFn));
    
                    W[6] = (0x01000000n * (BigInt(txtcomp[i + 24]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 25]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 26]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 27]) & 0x000000FFn));
                    W[7] = (0x01000000n * (BigInt(txtcomp[i + 28]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 29]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 30]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 31]) & 0x000000FFn));
                    W[8] = (0x01000000n * (BigInt(txtcomp[i + 32]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 33]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 34]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 35]) & 0x000000FFn));
                    W[9] = (0x01000000n * (BigInt(txtcomp[i + 36]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 37]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 38]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 39]) & 0x000000FFn));
                    W[10] = (0x01000000n * (BigInt(txtcomp[i + 40]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 41]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 42]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 43]) & 0x000000FFn));
                    W[11] = (0x01000000n * (BigInt(txtcomp[i + 44]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 45]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 46]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 47]) & 0x000000FFn));
    
                    W[12] = (0x01000000n * (BigInt(txtcomp[i + 48]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 49]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 50]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 51]) & 0x000000FFn));
                    W[13] = (0x01000000n * (BigInt(txtcomp[i + 52]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 53]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 54]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 55]) & 0x000000FFn));
                    W[14] = (0x01000000n * (BigInt(txtcomp[i + 56]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 57]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 58]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 59]) & 0x000000FFn));
                    W[15] = (0x01000000n * (BigInt(txtcomp[i + 60]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 61]) & 0x000000FFn))
                            + (0x00000100n * (BigInt(txtcomp[i + 62]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 63]) & 0x000000FFn));
    
    
                    if(firstCycle)
                    {
                        //this.sha_256(W, this.H0, Hi);
                        this.sha_256(W, H0x, Hi);
                        firstCycle = false;
                    }
                    else 
                        this.sha_256 (W, Hi, Hi);
    
                }

                
            W[0] = 0x00000000n;  W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
            W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
            W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
            W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000000n;


            let j: number;
            let k = 0;
            for (j = i; j < txtcomp.length; j++) {
                switch (j % 4) {
                    case 0:
                    W[k] = 0x01000000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 1:
                    W[k] += 0x00010000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 2:
                    W[k] += 0x00000100n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 3:
                    W[k] += 0x00000001n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    // so para para o proximo k quando passar pelos 4
                    k++;
                    break;
                }
            }

            switch ((j - 1) % 4) {
                case 0:
                    W[k] += 0x00800000n;
                    break;
                case 1:
                    W[k] += 0x00008000n;
                    break;
                case 2:
                    W[k] += 0x00000080n;
                    break;
                case 3:
                    // neste caso será o k posterior
                    W[k] = 0x80000000n;
                    break;
            }
        
            if (txtcomp.length % 64 < 56) {
                W[14] = 0x00000000n;
                W[15] = 0x00000001n * BigInt(8 * txtcomp.length);

                //console.log("W: ", W); //ok
            
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;

                } else {
                    this.sha_256(W, Hi, Hi);
                }

                //console.log("W after: ", W); //ok
            } 
            else {
                if (firstCycle) {
                    //this.sha_256(W, this.H0, Hi);
                    this.sha_256(W, H0x, Hi);
                    firstCycle = false;
                } else {
                    this.sha_256(W, Hi, Hi);
                }
            
                W[0] = 0x00000000n; W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
                W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
                W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
                W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000001n * BigInt(8 * txtcomp.length);
            
                this.sha_256(W, Hi, Hi);
            }

        

            //let result: number[] = [64];
            let base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for(let i = 0; i < 8; i++) {
                result[i*8 + 0] = (Hi[i]/0x10000000n) & 0x0000000Fn;
                result[i*8 + 1] = (Hi[i]/0x01000000n) & 0x0000000Fn;
                result[i*8 + 2] = (Hi[i]/0x00100000n) & 0x0000000Fn;
                result[i*8 + 3] = (Hi[i]/0x00010000n) & 0x0000000Fn;
                result[i*8 + 4] = (Hi[i]/0x00001000n) & 0x0000000Fn;
                result[i*8 + 5] = (Hi[i]/0x00000100n) & 0x0000000Fn;
                result[i*8 + 6] = (Hi[i]/0x00000010n) & 0x0000000Fn;
                result[i*8 + 7] = (Hi[i]/0x00000001n) & 0x0000000Fn;
            }

            for(let i = 0; i < 64; i++) {
                //result[i] = base16[result[i]];
                //resultfinal += base16[result[i]];
                resultfinal = resultfinal + base16[Number(result[i])];
            }

            //return result.join('');
            return resultfinal;           
        }    
        return '';        
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para construir um Hash SHA256 a partir de uma String
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static SHA256STR(strIn: string): string {

        const W: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000008n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        const Hi: bigint[] = [
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n,
        0x00000000n, 0x00000000n, 0x00000000n, 0x00000000n
        ];
        
        // byte [] result = new
        let txtcomp: number[];

        txtcomp = this.StrToByte(strIn);
        
        if (txtcomp.length > 0) {
    
            //const result: string[] = new Array(64);
            let resultfinal: string = '';
            //let result: number[] = [64];
            let result: BigInt[] = [64n];

            // Para String de 448 bits 56 letras A
            let i = 0;
            let firstCycle = true;

            for (; i < (txtcomp.length) - ((txtcomp.length) % 64); i += 64) {
            // perform loop logic here

                W[0] = (0x01000000n * (BigInt(txtcomp[i]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 1]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 2]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 3]) & 0x000000FFn));
                W[1] = (0x01000000n * (BigInt(txtcomp[i + 4]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 5]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 6]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 7]) & 0x000000FFn));
                W[2] = (0x01000000n * (BigInt(txtcomp[i + 8]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 9]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 10]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 11]) & 0x000000FFn));
                W[3] = (0x01000000n * (BigInt(txtcomp[i + 12]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 13]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 14]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 15]) & 0x000000FFn));
                W[4] = (0x01000000n * (BigInt(txtcomp[i + 16]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 17]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 18]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 19]) & 0x000000FFn));
                W[5] = (0x01000000n * (BigInt(txtcomp[i + 20]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 21]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 22]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 23]) & 0x000000FFn));

                W[6] = (0x01000000n * (BigInt(txtcomp[i + 24]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 25]) & 0x000000FFn))
                    + (0x00000100n * (BigInt(txtcomp[i + 26]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 27]) & 0x000000FFn));
                W[7] = (0x01000000n * (BigInt(txtcomp[i + 28]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 29]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 30]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 31]) & 0x000000FFn));
                W[8] = (0x01000000n * (BigInt(txtcomp[i + 32]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 33]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 34]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 35]) & 0x000000FFn));
                W[9] = (0x01000000n * (BigInt(txtcomp[i + 36]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 37]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 38]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 39]) & 0x000000FFn));
                W[10] = (0x01000000n * (BigInt(txtcomp[i + 40]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 41]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 42]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 43]) & 0x000000FFn));
                W[11] = (0x01000000n * (BigInt(txtcomp[i + 44]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 45]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 46]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 47]) & 0x000000FFn));

                W[12] = (0x01000000n * (BigInt(txtcomp[i + 48]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 49]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 50]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 51]) & 0x000000FFn));
                W[13] = (0x01000000n * (BigInt(txtcomp[i + 52]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 53]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 54]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 55]) & 0x000000FFn));
                W[14] = (0x01000000n * (BigInt(txtcomp[i + 56]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 57]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 58]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 59]) & 0x000000FFn));
                W[15] = (0x01000000n * (BigInt(txtcomp[i + 60]) & 0x000000FFn)) + (0x00010000n * (BigInt(txtcomp[i + 61]) & 0x000000FFn))
                        + (0x00000100n * (BigInt(txtcomp[i + 62]) & 0x000000FFn)) + (0x00000001n * (BigInt(txtcomp[i + 63]) & 0x000000FFn));


                if(firstCycle)
                {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;
                }
                else 
                    this.sha_256 (W, Hi, Hi);

            }

            W[0] = 0x00000000n;  W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
            W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
            W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
            W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000000n;


            let j: number;
            let k = 0;
            for (j = i; j < txtcomp.length; j++) {
                switch (j % 4) {
                    case 0:
                    W[k] = 0x01000000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 1:
                    W[k] += 0x00010000n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 2:
                    W[k] += 0x00000100n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    break;
                    case 3:
                    W[k] += 0x00000001n * (BigInt(txtcomp[j]) & 0x000000FFn);
                    // so para para o proximo k quando passar pelos 4
                    k++;
                    break;
                }
            }
            
            switch ((j - 1) % 4) {
            case 0:
                W[k] += 0x00800000n;
                break;
            case 1:
                W[k] += 0x00008000n;
                break;
            case 2:
                W[k] += 0x00000080n;
                break;
            case 3:
                // neste caso será o k posterior
                W[k] = 0x80000000n;
                break;
            }
            
            if (txtcomp.length % 64 < 56) {
                W[14] = 0x00000000n;
                W[15] = 0x00000001n * BigInt(8 * txtcomp.length);

                //console.log("W: ", W); //ok
            
                if (firstCycle) {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;

                } else {
                    this.sha_256(W, Hi, Hi);
                }

                //console.log("W after: ", W); //ok
            } 
            else {
                if (firstCycle) {
                    this.sha_256(W, this.H0, Hi);
                    firstCycle = false;
                } else {
                    this.sha_256(W, Hi, Hi);
                }
            
                W[0] = 0x00000000n; W[1] = 0x00000000n; W[2] = 0x00000000n; W[3] = 0x00000000n;
                W[4] = 0x00000000n; W[5] = 0x00000000n; W[6] = 0x00000000n; W[7] = 0x00000000n;
                W[8] = 0x00000000n; W[9] = 0x00000000n; W[10] = 0x00000000n; W[11] = 0x00000000n;
                W[12] = 0x00000000n; W[13] = 0x00000000n; W[14] = 0x00000000n; W[15] = 0x00000001n * BigInt(8 * txtcomp.length);
            
                this.sha_256(W, Hi, Hi);
            }
            
            //let result: number[] = [64];
            let base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
            for(let i = 0; i < 8; i++) {
                result[i*8 + 0] = (Hi[i]/0x10000000n) & 0x0000000Fn;
                result[i*8 + 1] = (Hi[i]/0x01000000n) & 0x0000000Fn;
                result[i*8 + 2] = (Hi[i]/0x00100000n) & 0x0000000Fn;
                result[i*8 + 3] = (Hi[i]/0x00010000n) & 0x0000000Fn;
                result[i*8 + 4] = (Hi[i]/0x00001000n) & 0x0000000Fn;
                result[i*8 + 5] = (Hi[i]/0x00000100n) & 0x0000000Fn;
                result[i*8 + 6] = (Hi[i]/0x00000010n) & 0x0000000Fn;
                result[i*8 + 7] = (Hi[i]/0x00000001n) & 0x0000000Fn;
            }

            for(let i = 0; i < 64; i++) {
                //result[i] = base16[result[i]];
                //resultfinal += base16[result[i]];
                resultfinal = resultfinal + base16[Number(result[i])];
            }

            //return result.join('');
            return resultfinal;
        }
        return '';
    }
    /////////////////////////////////////////////////////////////////////////////////////////////       
    /////////////////////////////////////////////////////////////////////////////////////////////       

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////       
    //Metodos Auxiliares
    /////////////////////////////////////////////////////////////////////////////////////////////       

    /////////////////////////////////////////////////////////////////////////////////////////////       
    // Transforma uma String com elementos Hexadecimal em uma Stream de Bytes
    // Obs: a string precisa ter um número par de elementos;
    // Apesar de poder transformar qualquer string Hexadecimal para Stream de Bytes
    // Este metodo foi desenvolvimento para transformar um hash de 64 elementos em uma Stream de bytes 
    /////////////////////////////////////////////////////////////////////////////////////////////       
    public static HashStrToByte2(hashKey: string): number[] {    
        const result: number[] = new Array(hashKey.length);
        const result2: number[] = new Array(hashKey.length / 2);
        const strChar: string[] = hashKey.split('');
        for (let i = 0; i < hashKey.length; i++) {
            switch (strChar[i]) {
                case '0':
                    result[i] = 0;
                    break;
                case '1':
                    result[i] = 1;
                    break;
                case '2':
                    result[i] = 2;
                    break;
                case '3':
                    result[i] = 3;
                    break;
                case '4':
                    result[i] = 4;
                    break;
                case '5':
                    result[i] = 5;
                    break;
                case '6':
                    result[i] = 6;
                    break;
                case '7':
                    result[i] = 7;
                    break;
                case '8':
                    result[i] = 8;
                    break;
                case '9':
                    result[i] = 9;
                    break;
                case 'a':
                    result[i] = 10;
                    break;
                case 'b':
                    result[i] = 11;
                    break;
                case 'c':
                    result[i] = 12;
                    break;
                case 'd':
                    result[i] = 13;
                    break;
                case 'e':
                    result[i] = 14;
                    break;
                case 'f':
                    result[i] = 15;
                    break;
            }
        }
        for (let i = hashKey.length / 2 - 1; i >= 0; i--) {
            // result2 [i] = (byte) (result[2*i + 1] + result[2*i] * 0x10); // Funciona, mas pode have propagação de sinal
            result2[i] = (result[2 * i + 1] + result[2 * i] * 0x10) & 0xff;
        }
        return result2;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////     
    /////////////////////////////////////////////////////////////////////////////////////////////     

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////     
    // Metodo usado para transformar uma Stream de Bytes em uma String Hexadecimanl
    /////////////////////////////////////////////////////////////////////////////////////////////     
    public static ByteToStrHex(hashKey: number[]): string {
        const result: string[] = new Array(2 * hashKey.length);
        const base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        
        for (let i = 0; i < hashKey.length; i++) {
        result[2 * i] = base16[(hashKey[i] & 0xF0) / (0x10)]; // break the sign propagation
        result[2 * i + 1] = base16[hashKey[i] & 0x0F];
        }
    
        return result.join('');
    }
    /////////////////////////////////////////////////////////////////////////////////////////////     
    /////////////////////////////////////////////////////////////////////////////////////////////     

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////     
    // Metodo usado para transforma uma String Hexadecimal de Big Endian para Little Endian
    /////////////////////////////////////////////////////////////////////////////////////////////     
    public static LEformat(hashKey: string): string {
        const result: string[] = new Array(hashKey.length);
        const strChar: string[] = hashKey.split('');
    
        for (let i = 0; i < hashKey.length; i = i + 2) {
        result[hashKey.length - 2 - i] = strChar[i];
        result[hashKey.length - 1 - i] = strChar[i + 1];
        }
    
        return result.join('');
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo utilizado para realizar alguns testes de convergencia de resultados
    /////////////////////////////////////////////////////////////////////////////////////////////
    public static H0String(): string {
        let resultf: string = '';
        let result: BigInt[] = [64n];
    
        for (let i = 0; i < 8; i++) {
        result[i * 8 + 0] = ((BigInt(this.H0[i]) / 0x10000000n) & 0x0000000Fn);
        result[i * 8 + 1] = ((BigInt(this.H0[i]) / 0x01000000n) & 0x0000000Fn);
        result[i * 8 + 2] = ((BigInt(this.H0[i]) / 0x00100000n) & 0x0000000Fn);
        result[i * 8 + 3] = ((BigInt(this.H0[i]) / 0x00010000n) & 0x0000000Fn);
        result[i * 8 + 4] = ((BigInt(this.H0[i]) / 0x00001000n) & 0x0000000Fn);
        result[i * 8 + 5] = ((BigInt(this.H0[i]) / 0x00000100n) & 0x0000000Fn);
        result[i * 8 + 6] = ((BigInt(this.H0[i]) / 0x00000010n) & 0x0000000Fn);
        result[i * 8 + 7] = ((BigInt(this.H0[i]) / 0x00000001n) & 0x0000000Fn);
        }
    
        const base16: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        for (let i = 0; i < 64; i++) {
        //const charCode: number = result[i].charCodeAt(0);
        resultf = resultf + base16[Number(result[i])];
        }
    
        return resultf;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    /////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Metodo usado para transformar um string em um array de bytes
    // String to byte
    /////////////////////////////////////////////////////////////////////////////////////////////
    public static StrToByte(hashKey: string): number[] {
        const result: number[] = [];
        const strChar = hashKey.split('');
    
        for (let i = 0; i < hashKey.length; i++) {
        result[i] = strChar[i].charCodeAt(0) & 0xff;
        }   
        return result;
    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
}