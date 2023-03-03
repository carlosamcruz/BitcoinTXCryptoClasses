"use strict";
/////////////////////////////////////////////////
//JESUS is the LORD!!!
///////////////////////////////////////////////// 
class EcdsaSecretus {
    Ln = 0n;
    keyGEN = new Keygen();
    myEcc = new Ecc();
    point = [0n, 0n];
    pointNULL = [0n, 0n];
    constructor() {
        let n_order = this.myEcc.n_order;
        while (n_order > 0n) {
            this.Ln = (this.Ln * 2n) + 1n;
            n_order /= 2n;
        }
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////
    //Geração do K a partir da Chave Privada do Emissor
    ///////////////////////////////////////////////////////////
    Knum(HA4, PVTKEY, e) {
        //Verificar os NULLs
        let x = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(PVTKEY + e), SHA256G.HashStrToByte2(HA4));
        while (x === null) {
            x = x + "1";
            x = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(PVTKEY + e + x), SHA256G.HashStrToByte2(HA4));
        }
        let H1a = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(e), SHA256G.HashStrToByte2(x));
        while (H1a === null) {
            H1a = H1a + "1";
            H1a = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(e + H1a), SHA256G.HashStrToByte2(x));
        }
        let H1 = this.keyGEN.HashToBigInt(H1a);
        while ((H1 <= 1n) || (H1 >= this.myEcc.n_order - 1n)) {
            H1a = H1a + "1";
            H1a = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(H1a), SHA256G.HashStrToByte2(x));
            while (H1a === null) {
                H1a = H1a + "1";
                H1a = SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2(e + H1a), SHA256G.HashStrToByte2(x));
            }
            H1 = this.keyGEN.HashToBigInt(H1a);
        }
        return H1;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////
    //Criação da Assinatura Digital;
    //https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
    ///////////////////////////////////////////////////////////
    //MSN - mensagem não encriptada em posse do emissor (De string para array de byte);
    //e = SHA256(SHA2560(MSN))
    //PVTKEY - Chave privada do usuário (String com 64 elementos 0-9 de a-f);
    //HA4 - HASH para formação de K (String com 64 elementos 0-9 de a-f);;
    ///////////////////////////////////////////////////////////
    //public BigInteger [] ECDSABSV (byte[] MSNx, String PVTKEY, String HA4)
    ///////////////////////////////////////////////////////////
    ECDSABSV(e, PVTKEY, HA4) {
        let signECDSA = [0n, 0n, 0n];
        // 1 - Calcular uma HASH(MSN)
        // String e = SHA256G.SHA256bytes(MSN);
        // A MSN seria necessário apenas para formar o elemento e, entao é melhor trazer diretamente e
        /*
        String e = SHA256G.SHA256bytes(MSN);
        // e = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(e));
        e = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(e));
        */
        if (e == null)
            return signECDSA;
        // byte[] eByte = SHA256G.HashStrToByte2(e); // e pode ser null
        let z;
        //Variables.BarSize = 5;
        /////////////////////////////////////////////////////
        // 2 - Selecionar o os Ln bits de e
        /////////////////////////////////////////////////////
        z = this.keyGEN.HashToBigInt(e); // tranforma o HASH(MSN) de HEX para BigInt
        // Fica apenas com os Bit mais significativos de e
        while (z > this.Ln)
            z = z / 2n;
        /////////////////////////////////////////////////////
        /////////////////////////////////////////////////////
        let point = [0n, 0n];
        let K = 0n;
        let r = 0n;
        let s = 0n;
        let Flag = false;
        // STEP 3
        while (Flag == false) {
            Flag = true;
            /////////////////////////////////////////////////////
            // 3 - Selecionando um Valor de K
            /////////////////////////////////////////////////////
            K = this.Knum(HA4, PVTKEY, e);
            // Não pode ser null, tem que tratar
            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////
            // 4 - Calculando um ponto da Curva (x1, y1) = K * G
            /////////////////////////////////////////////////////
            point = this.myEcc.eccnP(K, this.myEcc.Gx, this.myEcc.Gy);
            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////
            // 5 - Calculando r = x1 mod n
            /////////////////////////////////////////////////////
            r = this.myEcc.modp(point[0], this.myEcc.n_order);
            /////////////////////////////////////////////////////
            /////////////////////////////////////////////////////
            if (r == 0n) {
                Flag = false;
                //e = SHA256G.SHA256STR(e + "1");//isso tem que ser reezaminado; Deve Ser K e não e que varia
                //K = K + 1n;
                //HA4 = HA4 + 1n;
                HA4 = SHA256G.SHA256STR(HA4 + "1");
            }
            else {
                /////////////////////////////////////////////////////
                //6 - Calculating s = ( (K^-1) * (z + r * PVTKEY) ) mod n
                /////////////////////////////////////////////////////
                // (K^-1) mod n
                let kinv = this.myEcc.inverse(K, this.myEcc.n_order);
                // (r * PVTKEY) mod n
                let rdA = r * this.myEcc.modp(this.keyGEN.HashToBigInt(PVTKEY), this.myEcc.n_order);
                // (z + (r * PVTKEY)) mod n
                s = z + rdA;
                s = this.myEcc.modp(s, this.myEcc.n_order);
                // ( (K^-1) * (z + r * PVTKEY) ) mod n
                s = kinv * s;
                s = this.myEcc.modp(s, this.myEcc.n_order);
                /////////////////////////////////////////////////////
                /////////////////////////////////////////////////////
                if (s === BigInt(0)) {
                    Flag = false;
                    //e = SHA256G.SHA256STR(e + "1");
                    //K = K + 1n;
                    //HA4 = HA4 + 1n;
                    HA4 = SHA256G.SHA256STR(HA4 + "1");
                }
            }
        }
        signECDSA[0] = r;
        signECDSA[1] = s;
        signECDSA[2] = K;
        return signECDSA;
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    ///////////////////////////////////////////////////////////
    //Verificação do Estado a Assinatura Digital
    //Se o resultado for 1, então a assinatura é válida
    //https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
    //Para testes
    ///////////////////////////////////////////////////////////
    //MSN - mensagem recuperada do processo de Encriptação (De string para array de byte);
    //e = SHA256(SHA2560(MSN))
    //pubKey - chave publica enviada pela emissor no inicio do processo de troca de mensagem;
    //sign -  Assinatura digital, enviada pelo emissor junto com a mesagem encriptada;
    ///////////////////////////////////////////////////////////
    ECDSAVerifyBSV2(e, pubKey, sign) {
        let signECDSA = [0n, 0n];
        /////////////////////////////////////////////////////////////////////////////////////////////
        // Verificação da validade do Ponto da Curva Eliptica da Chave Publica do Contato
        // O App já faz esta verificação previamente, mas a verificação é realizada novamente aqui
        // para deixar o algoritmo mais compreensível.
        // Se houver necessidade de otimização, esta primeira etapa pode ser suprimida
        /////////////////////////////////////////////////////////////////////////////////////////////
        // 1 Check that PUBKEY is not equal to the identity element (0,0), and its coordinates are otherwise valid
        if (pubKey[0] === 0n && pubKey[1] === 0n) {
            return -1;
        }
        // 2 Check that PUBKEY lies on the curva - Verificar se ponto faz parte da curva
        // 3 Check that n * PUBKEY == (0,0)
        // signECDSA = myEcc.eccnP(myEcc.n_order, pubKey[0], pubKey[1]);
        ////////////////////////////////////////////////////////////////////
        // Este procedimento inviabiliza a pré-fatoração da curva elíptica
        // Inviabiliza também o retorno (0, 0) ao encontrar n == n-order
        ////////////////////////////////////////////////////////////////////
        signECDSA = this.eccNPoint(this.myEcc.n_order, pubKey[0], pubKey[1]);
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        if (!(signECDSA[0] === 0n && signECDSA[1] === 0n)) {
            return -2;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////
        // Verificação da validade da Assinatura após a verificação de PUBKEY
        /////////////////////////////////////////////////////////////////////////////////////////////
        // Compara para ver se r ou s estão entre 1 e n-1
        if (sign[0] <= 1n || sign[0] >= this.myEcc.n_order - 1n) {
            return -3;
        }
        if (sign[1] <= 1n || sign[1] >= this.myEcc.n_order - 1n) {
            return -4;
        }
        // Passos 2 e 3 de https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
        // A MSN seria necessário apenas para formar o elemento e, então é melhor trazer diretamente e
        /*
          String e = SHA256G.SHA256bytes(MSN);
          //e = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(e));
          e = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(e));
        */
        if (e === null) {
            return -5;
        }
        let z = this.keyGEN.HashToBigInt(e);
        // Variables.Z1 = z.toString();
        // Fica apenas com os Bit mais significativos de e
        while (z > this.Ln) {
            z = z / 2n;
        }
        // Variables.Z2 = z.toString();
        // Passo 4
        let sInv = this.myEcc.inverse(sign[1], this.myEcc.n_order);
        let u1 = z * sInv;
        let u2 = sign[0] * sInv;
        u1 = this.myEcc.modp(u1, this.myEcc.n_order);
        u2 = this.myEcc.modp(u2, this.myEcc.n_order);
        // Passo 5
        let P1 = [0n, 0n];
        let P2 = [0n, 0n];
        let C = [0n, 0n];
        P1 = this.eccNPoint(u1, this.myEcc.Gx, this.myEcc.Gy);
        ////////////////////////////////////////////////////////////////////
        //Este procedimento inviabiliza a pré-fatoração da curva eliptica
        ////////////////////////////////////////////////////////////////////
        P2 = this.eccNPoint(u2, pubKey[0], pubKey[1]);
        ////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////
        C = this.myEcc.addp(P1[0], P1[1], P2[0], P2[1]);
        C[0] = this.myEcc.modp(C[0], this.myEcc.n_order);
        if (C[0] === 0n && C[1] === 0n) {
            return -6;
        }
        // Passo 6
        // Interfere no resultado; A mesmo que use o eccNPoint para o signECDSA
        // Parace que o resultado fica travado dento de myECC.eccp() mesmo myECC sendo private
        signECDSA[0] = 100n;
        if (C[0] === sign[0]) {
            return 1;
        }
        else {
            return 0;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////
    }
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    eccNPoint(n, x, y) {
        const newECC = new Ecc();
        return newECC.eccnP(n, x, y);
    }
}
