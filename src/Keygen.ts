/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////
class Keygen {
    keys: Ecc = new Ecc();
    sqrtCF: TonelliShanks = new TonelliShanks();
    //private point: [bigint, bigint] = [0n, 0n];
    private base64: string[] = [
      '*', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', '#', 'J', 'K', 'L', 'M', 'N', '%', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
      'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', '?',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '$', '&'
    ];
    private base16: string[] = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
    ];
  
    constructor() {}

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Formação da chave publica a partir da Chave Privada PVTKey == text
    //  onde PVTKey é uma String qualquer,
    //  a saída é uma string em Base 64 codificada de acordo com this.base64: string[] 
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    publicKey(text: string): string {
      const sizeStr256 = Math.floor(text.length / 8);
      let keySize;
      let SecretKey: bigint = 0n;
      let cont: bigint = 1n;
      let secKey: string[];
      let pubKey64: string[] = new Array(44);
      secKey = text.split('');
  
      if (text.length <= 31) keySize = text.length % 32;
      else keySize = 32;
  
      for (let i = keySize - 1; i >= 0; i--) {
        SecretKey += cont * BigInt(secKey[i].charCodeAt(0));
        cont *= 0x100n;
      }
  
      // Chave MOD P
      SecretKey = this.keys.modp(SecretKey, this.keys.p);
  
      let point = this.keys.eccnP(SecretKey, this.keys.Gx, this.keys.Gy);
  
      for (let i = 43; i > 0; i--) {
        pubKey64[i] = this.base64[Number(point[0] & 63n)];
        point[0] = point[0] / 64n;
      }
  
      if (point[1] & 1n) pubKey64[0] = this.base64[3];
      else pubKey64[0] = this.base64[2];
  
      text = pubKey64.join('');
  
      return text;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Formação da chave publica a partir da Chave Privada PVTKey == text
    //   onde PVTKey é uma String Hexadecimal de 64 elementos,
    //   a saída é uma string em Base 64 codificada de acordo com this.base64: string[]
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    publicKeyHEX(text: string): string {
        let SecretKey: bigint = 0n;
        let cont: bigint = 1n;
        const secKey: string[] = text.split("");
        const pubKey64: string[] = new Array(44);
    
        for (let i = 63; i >= 0; i--) {
        let value = 0;
        for (value = 0; value < 16; value++)
            if (secKey[i] === this.base16[value]) break;
    
        SecretKey += cont * BigInt(value);
        cont *= 0x10n;
        }
    
        // Chave MOD P
        SecretKey = this.keys.modp(SecretKey, this.keys.p);
    
        let point: [bigint, bigint] = this.keys.eccnP(SecretKey, this.keys.Gx, this.keys.Gy);
    
        // Variables.dPubKX = point[0];
        // Variables.dPubKY = point[1];
    
        for (let i = 43; i > 0; i--) {
        pubKey64[i] = this.base64[Number(point[0] & 63n)];
        point[0] = point[0] / 64n;
        }
    
        if (point[1] & 1n) pubKey64[0] = this.base64[3];
        else pubKey64[0] = this.base64[2];
    
        text = pubKey64.join("");
    
        return text;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Formação da chave publica a partir da Chave Privada PVTKey == text
    //   onde PVTKey é uma String Hexadecimal de 64 elementos,
    //   a saída é uma string HEXADECIMAL códificada no Fomato SEC Comprimido
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    publicKeyCompSEC(text: string): string {
        let SecretKey = 0n;
        let cont = 1n;
        const secKey = text.split('');
        const pubKeyHEX = new Array(65);
    
        for (let i = 63; i >= 0; i--) {
        let value;
        for (value = 0; value < 16; value++) {
            if (secKey[i] === this.base16[value]) {
            break;
            }
        }
        SecretKey += cont * BigInt(value);
        cont *= 16n;
        }
    
        SecretKey = this.keys.modp(SecretKey, this.keys.p);
    
        const point = this.keys.eccnP(SecretKey, this.keys.Gx, this.keys.Gy);
    
        for (let i = 64; i > 0; i--) {
        pubKeyHEX[i] = this.base16[Number(point[0] & 15n)];
        point[0] = point[0] / 16n;
        }
    
        pubKeyHEX[0] = point[1] & 1n ? this.base16[3] : this.base16[2];
    
        text = pubKeyHEX.join('');//necessary
        return "0" + text;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Formação da chave publica a partir da Chave Privada PVTKey == text
    //   onde PVTKeyque é uma String Hexadecimal de 64 elementos,
    //   a saída é uma string HEXADECIMAL códificada no Fomato SEC Não-Comprimido
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    public publicKeyUncompSEC (text: string): string {
        let SecretKey = BigInt(0);
        let cont = BigInt(1);
        const secKey = text.split('');
        const pubKeyHEX = new Array(65);
        const pubKeyHEXY = new Array(64);
    
        for (let i = (text.length) - 1; i >= 0; i--) {
        let value;
        for (value = 0; value < 16; value++) {
            if (secKey[i] === this.base16[value]) break;
        }
    
        SecretKey += cont * BigInt(value);
        cont *= BigInt(0x10);
        }
    
        // Chave MOD P
        SecretKey = this.keys.modp(SecretKey, this.keys.p);
    
        let point = new Array<bigint>(2);
        point = this.keys.eccnP(SecretKey, this.keys.Gx, this.keys.Gy);
    
        for (let i = 64; i > 0; i--) {
        pubKeyHEX[i] = this.base16[Number(point[0] & BigInt(15).valueOf())];
        point[0] = point[0] / BigInt(16);
    
        pubKeyHEXY[i - 1] = this.base16[Number(point[1] & BigInt(15)).valueOf()];
        point[1] = point[1] / BigInt(16);
        }
    
        pubKeyHEX[0] = this.base16[4];
    
        text = "0" + pubKeyHEX.join('') + pubKeyHEXY.join('');//necessario
    
        return text;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
      
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    //Gera uma Chave Privada em BigInteger a partir de uma string Hexadecimal de 64 elementos 
    //  OBS: Não devolve MOD P
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    HashToBigInt(text: string): bigint {
        let keySize: number;
        let secretKey: bigint = BigInt(0);
        let cont: bigint = BigInt(1);
        let secKey: number[] = [];
      
        for (let i = 0; i < text.length; i++) {
          switch (text[i]) {
            case '0':
              secKey.push(0);
              break;
            case '1':
              secKey.push(1);
              break;
            case '2':
              secKey.push(2);
              break;
            case '3':
              secKey.push(3);
              break;
            case '4':
              secKey.push(4);
              break;
            case '5':
              secKey.push(5);
              break;
            case '6':
              secKey.push(6);
              break;
            case '7':
              secKey.push(7);
              break;
            case '8':
              secKey.push(8);
              break;
            case '9':
              secKey.push(9);
              break;
            case 'a':
              secKey.push(10);
              break;
            case 'b':
              secKey.push(11);
              break;
            case 'c':
              secKey.push(12);
              break;
            case 'd':
              secKey.push(13);
              break;
            case 'e':
              secKey.push(14);
              break;
            case 'f':
              secKey.push(15);
              break;
          }
        }
      
        for (let i = 0; i < text.length / 2; i++) {
          secKey[i] = secKey[2 * i + 1] + secKey[2 * i] * 0x10;
        }
      
        if (text.length / 2 <= 31) {
          keySize = text.length / 2 % 32;
        } else {
          keySize = 32;
        }
      
        for (let i = keySize - 1; i >= 0; i--) {
          secretKey += cont * BigInt(secKey[i]);
          cont *= BigInt(0x100);
        }
      
        // Chave MOD P
        //SecretKey = keys.modp(SecretKey, keys.p);
        return secretKey;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    /////////////////////////////////////////////////////////////  
    // Reverte a chave publica do formato Base64 para BigInt
    /////////////////////////////////////////////////////////////
    public pubKeyRev(pubkey: string): [bigint, bigint] {
      let point: [bigint, bigint] = [0n, 0n];
      let tA = 1n;
      //let pubKey1 = SHA256G.StrToByte(pubkey); 
      const pubKey1 = pubkey.split("");

      if (pubkey.length !== 44) return point;

      for (let i = pubkey.length - 1; i > pubkey.length - 44; i--) {
        let x;
        for (x = 0; x < 64; x++) if (this.base64[x] === pubKey1[i]) break;

        point[0] = point[0] + tA * BigInt(x);
        tA = tA * 64n;
      }

      point[1] = this.sqrtCF.sqrtCF(
        this.keys.modp(
          point[0] * this.keys.modp(point[0] * point[0], this.keys.p) +
            this.keys.A * point[0] +
            this.keys.B,
          this.keys.p
        ),
        this.keys.p
      );

      let pubKey2 = SHA256G.StrToByte(pubkey);

      if (
        (point[1] % 2n === 0n && (pubKey2[0] & 0x01) === 1) ||
        (point[1] % 2n === 1n && (pubKey2[0] & 0x01) !== 1)
      )
        point[1] = this.keys.p - point[1];

      return point;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////  
    // Reverte a chave publica do formato SEC Compactado para BigInt
    //////////////////////////////////////////////////////////////////
    public pubKeyCompSECRev(pubkey: string): [bigint, bigint] {
      let point: [bigint, bigint] = [0n, 0n];
      let tA = 1n;

      pubkey = pubkey.substring(1);

      if (pubkey.length !== 65) return point;

      //console.log('Aqui', pubKey1.length);

      for (let i = pubkey.length - 1; i > ((pubkey.length - 1) - 64); i--) {
        let x;  
        for (x = 0; x < 16; x++) if (this.base16[x] === pubkey[i]) break;

        point[0] = point[0] + tA * BigInt(x);
        tA = tA * 16n;
      }

      point[1] = this.sqrtCF.sqrtCF(
        this.keys.modp(
          point[0] * this.keys.modp(point[0] * point[0], this.keys.p) +
            this.keys.A * point[0] +
            this.keys.B,
          this.keys.p
        ),
        this.keys.p
      );

      
      if (
        (point[1] % 2n === 0n && (pubkey.charAt(0) ==='3')) ||
        (point[1] % 2n === 1n && (pubkey.charAt(0) ==='2'))
      )
        point[1] = this.keys.p - point[1];

      return point;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////  
    // Reverte a chave publica do formato SEC Não-Compactado para BigInt
    //////////////////////////////////////////////////////////////////
    public pubKeyUncompSECRev(pubkey: string): [bigint, bigint] {
      let point: [bigint, bigint] = [0n, 0n];
      let tA = 1n;

      pubkey = pubkey.substring(1);

      if (pubkey.length !== 65 + 64) return point;

      //console.log('Aqui', pubKey1.length);

      for (let i = pubkey.length - 1; i > ((pubkey.length - 1) - 64); i--) {
        let x;  
        for (x = 0; x < 16; x++) if (this.base16[x] === pubkey[i]) break;

        point[1] = point[1] + tA * BigInt(x);
        tA = tA * 16n;
      }

      tA = 1n;

      for (let i = (pubkey.length - 1) - 64; i > ((pubkey.length - 1) - 128); i--) {
        let x;  
        for (x = 0; x < 16; x++) if (this.base16[x] === pubkey[i]) break;

        point[0] = point[0] + tA * BigInt(x);
        tA = tA * 16n;
      }

      return point;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 
    
    /////////////////////////////////////////////////////////////
    //Construi uma String Hexadecimal a partir de um BigInteger
    /////////////////////////////////////////////////////////////
    static bItoHexStr(bInumber: bigint): string {
        let cSHA: number [] = [100]; // chave comprimida
        let ichA = bInumber;
      
        //for (let i = 99; i > 0; i--) {
        for (let i = 99; i >= 0; i--) {
          cSHA[i] = Number(ichA & BigInt(0xFF));
          ichA = ichA / BigInt(0x100);
        }
      
        let r = SHA256G.ByteToStrHex(cSHA);
        let ir = 0;
      
        while ("00" === r.substring(0, 2)) {
          r = r.substring(2);
          ir++;
        }
      
        return r;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    ////////////////////////////////////////////////////////////////////////////////////////////
    //Metodo utilizado para construir endereços Bitocoin Legacy Comprimidos e Não-Comprimidos
    //  a partir da chave publica em Base 64 gerada pelo metodo
    //  publicKeyHEX(text: string): string
    ////////////////////////////////////////////////////////////////////////////////////////////        
    bsvWalletFull(pubkeyCOD: string, Compressed: boolean): string {
      let pubKey: bigint[] = this.pubKeyRev(pubkeyCOD);
      let chA: number[] = new Array(64);
      let cSHA: number[] = new Array(33); // compressed key
      let cSHA2: number[] = new Array(65); // uncompressed key
      
      let tA: bigint, ichA: bigint, ichA2: bigint;

      ////////////////////////////////////////////////////////////////////
      //CONSTROI AS CHAVES PUBLICAS COMPRIMIDAS E NAO COMPRIMIDAS
      ////////////////////////////////////////////////////////////////////      
 
      ichA = pubKey[0];
      ichA2 = pubKey[1];
      
      for (let i = 32; i >= 1; i--) {
        cSHA2[i] = cSHA[i] = Number(ichA & 0xffn);
        cSHA2[i + 32] = Number(ichA2 & 0xffn);
        ichA = ichA / 256n;
        ichA2 = ichA2 / 256n;
      }

      if (pubKey[1] & 1n) cSHA[0] = 3;
      else cSHA[0] = 2;
      
      cSHA2[0] = 4;

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////      
 
      ////////////////////////////////////////////////////////////////////
      //HASH SHA256 DA CHAVE PUBLICA COMPRIMIDA
      ////////////////////////////////////////////////////////////////////      

      let SHA256out: string, SHA256out2: string;
      
      SHA256out = SHA256G.SHA256bytes(cSHA);
      SHA256out2 = SHA256G.SHA256bytes(cSHA2);

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
      
      ////////////////////////////////////////////////////////////////////
      //HASH RIPEMD160 DA SHA256 DA CHAVE PUBLICA
      ////////////////////////////////////////////////////////////////////

      let RIPEMDout: string, RIPEMDout2: string;
      let rmd160 = new Ripemd160();
      
      let SHA256outb = SHA256G.HashStrToByte2(SHA256out);
      let SHA256out2b = SHA256G.HashStrToByte2(SHA256out2);
      
      let SHA256outc = new Array(SHA256out.length / 2);
      let SHA256out2c = new Array(SHA256out2.length / 2);


      
      for (let i = 0; i < SHA256out.length / 2; i++)
      SHA256outc[i] = Number(SHA256outb[i] & 0xff);
      
      for (let i = 0; i < SHA256out2.length / 2; i++)
      SHA256out2c[i] = Number(SHA256out2b[i] & 0xff);
      
      RIPEMDout = Ripemd160.HashCharToStr(
      rmd160.ripemd160(SHA256outc, SHA256out.length / 2)
      );
      
      RIPEMDout2 = Ripemd160.HashCharToStr(
      rmd160.ripemd160(SHA256out2c, SHA256out2.length / 2)
      );
      
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////
      //PREFIX PLUS CHECKSUM
      ////////////////////////////////////////////////////////////////////

      let pRIPEMD160: number[] = new Array(21);
      let pRIPEMD1602: number[] = new Array(21);
      
      let RIPEMDoutj: number[] = new Array(RIPEMDout.length);
      let RIPEMDout2j: number[] = new Array(RIPEMDout2.length);
      
      RIPEMDoutj = SHA256G.HashStrToByte2(RIPEMDout);
      RIPEMDout2j = SHA256G.HashStrToByte2(RIPEMDout2);
      
      // Acrescenta o byte de versao do BTC, neste caso 0x00
      pRIPEMD1602[0] = pRIPEMD160[0] = 0;
      
      for (let i = 1; i < 21; i++) {
        pRIPEMD160[i] = RIPEMDoutj[i - 1];
        pRIPEMD1602[i] = RIPEMDout2j[i - 1];
      }
           
      // SHAS256 (PREFIX + RIPEMD(SHA256(COMPRESSED PUB KEY)))
      SHA256out = SHA256G.SHA256bytes(pRIPEMD160);
      // SHAS256 (PREFIX + RIPEMD(SHA256(UNCOMPRESSED PUB KEY)))
      SHA256out2 = SHA256G.SHA256bytes(pRIPEMD1602);
      
      // SHA256 (SHAS256 (PREFIX + RIPEMD(SHA256(COMPRESSED PUB KEY))))
      SHA256out = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(SHA256out));
      // SHA256 (SHAS256 (PREFIX + RIPEMD(SHA256(UNCOMPRESSED PUB KEY))))
      SHA256out2 = SHA256G.SHA256bytes(SHA256G.HashStrToByte2(SHA256out2));
      
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////
      //PREPARA O BIGINT PARA CONVERSAO A BASE 58
      ////////////////////////////////////////////////////////////////////
      
      //Transformar o Payload em BIGNUMBER
      let VPC: bigint = 0n, VPCcont: bigint = 1n, VPC2: bigint = 0n, VPCcont2: bigint = 1n;
      let SHA256outj: number[] = new Array(Math.floor(SHA256out.length / 2));
      let SHA256out2j: number[] = new Array(Math.floor(SHA256out2.length / 2));

      for (let i = 0; i < SHA256outj.length; i++) {
        SHA256outj[i] = SHA256G.HashStrToByte2(SHA256out)[i] & 0xff;
      }
      for (let i = 0; i < SHA256out2j.length; i++) {
        SHA256out2j[i] = SHA256G.HashStrToByte2(SHA256out2)[i] & 0xff;
      }

      //Primeiros 4 bites do SHA256 (SHAS256 (PREFIX + RIPEMD(SHA256(PUB KEY))))
      //Adiciona o CHEKSUM ao BIGINT
      for (let i = 3; i >= 0; i--) {
        VPC += VPCcont * BigInt(SHA256outj[i]);
        VPCcont *= 256n;

        VPC2 += VPCcont2 * BigInt(SHA256out2j[i]);
        VPCcont2 *= 256n;
      }

      //Adiciona o PREFIXO + RIPEMD160 ao BIGINT
      for (let i = 20; i >= 0; i--) {
        VPC += VPCcont * BigInt(pRIPEMD160[i]);
        VPCcont *= 256n;

        VPC2 += VPCcont2 * BigInt(pRIPEMD1602[i]);
        VPCcont2 *= 256n;
      }

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////
      //CONVERTE O BIGINT PARA BASE 58
      ////////////////////////////////////////////////////////////////////
      
      const base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      let BTCaddr: string = "";
      let BTCaddr2: string = "";

      let li = 0, li2 = 0;

      while (VPC > 0n) {
          //BTCaddr[li] = base58[Number(VPC % 58n)];
          //BTCaddr = BTCaddr + base58[Number(VPC % 58n)];
          BTCaddr = base58[Number(VPC % 58n)] + BTCaddr;

          VPC = VPC / 58n;
          li++;
      }

      while (VPC2 > 0n) {
          //BTCaddr2[li2] = base58[Number(VPC2 % 58n)];
          //BTCaddr2 = BTCaddr2 + base58[Number(VPC2 % 58n)];
          BTCaddr2 = base58[Number(VPC2 % 58n)] + BTCaddr2;
          VPC2 = VPC2 / 58n;
          li2++;
      }

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////


      ////////////////////////////////////////////////////////////////////
      //ADICIONA OS LEADING ZEROES DO PREFIX + RIPEMED160
      ////////////////////////////////////////////////////////////////////

      let lzeros = 0, lzeros2 = 0;

      while (pRIPEMD160[lzeros] == 0)
      {
          //BTCaddr[li] = base58[0];
          //BTCaddr = BTCaddr + base58[0];
          BTCaddr = base58[0] + BTCaddr;
          lzeros++;
          li++;
      }
      while (pRIPEMD1602[lzeros2] == 0)
      {
          //BTCaddr2[li2] = base58[0];
          //BTCaddr2 = BTCaddr2 + base58[0];
          BTCaddr2 = base58[0] + BTCaddr2;
          lzeros2++;
          li2++;
      }
      
      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////     
      
      if (Compressed)
          return BTCaddr;
      else
          return BTCaddr2;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////
    //Metodo utilizado para decodificar o HASH160 da Chave Publica
    //  a partir de um endereço Bitcoin Legacy, aqui gerados no método:
    //  bsvWalletFull(pubkeyCOD: string, Compressed: boolean): string
    //////////////////////////////////////////////////////////////////////////////////        
    public addRMD (hashKey: string): string {
      //const result: Uint8Array = new Uint8Array(20);
      let result: number[] = [20];
      const strChar: Array<string> = hashKey.split('');
      
      let addrINT: bigint = 0n;
      let x: number;
      const base58begin: Array<string> = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz".split('');
      
      for(let j = 1; j < hashKey.length; j++) {
        x = base58begin.indexOf(strChar[j]);
        addrINT *= 58n;
        addrINT += BigInt(x);
      }
    
      addrINT /= 0x100000000n;
      for(let j = 19; j >=0; j--) {
        result[j] = Number(addrINT & 0xFFn);
        addrINT /= 0x100n;
      }
    
      return SHA256G.ByteToStrHex(result);
    }
  
    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////
    //Metodo utilizado para construir o HASH160 da Chave Publica
    //  a partir da chave publica em Base 64 gerada pelo metodo 
    //  publicKeyHEX(text: string): string
    //////////////////////////////////////////////////////////////////////////////////        
    bsvWalletRMD160(pubkeyCOD: string, Compressed: boolean): string {
      let pubKey: bigint[] = this.pubKeyRev(pubkeyCOD);
      let chA: number[] = new Array(64);
      let cSHA: number[] = new Array(33); // compressed key
      let cSHA2: number[] = new Array(65); // uncompressed key
      
      let tA: bigint, ichA: bigint, ichA2: bigint;

      ////////////////////////////////////////////////////////////////////
      //CONSTROI AS CHAVES PUBLICAS COMPRIMIDAS E NAO COMPRIMIDAS
      ////////////////////////////////////////////////////////////////////      
 
      ichA = pubKey[0];
      ichA2 = pubKey[1];
      
      for (let i = 32; i >= 1; i--) {
        cSHA2[i] = cSHA[i] = Number(ichA & 0xffn);
        cSHA2[i + 32] = Number(ichA2 & 0xffn);
        ichA = ichA / 256n;
        ichA2 = ichA2 / 256n;
      }

      if (pubKey[1] & 1n) cSHA[0] = 3;
      else cSHA[0] = 2;
      
      cSHA2[0] = 4;

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////      
 
      ////////////////////////////////////////////////////////////////////
      //HASH SHA256 DA CHAVE PUBLICA COMPRIMIDA
      ////////////////////////////////////////////////////////////////////      

      let SHA256out: string, SHA256out2: string;
      
      SHA256out = SHA256G.SHA256bytes(cSHA);
      SHA256out2 = SHA256G.SHA256bytes(cSHA2);

      ////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////
      
      ////////////////////////////////////////////////////////////////////
      //HASH RIPEMD160 DA SHA256 DA CHAVE PUBLICA
      ////////////////////////////////////////////////////////////////////

      let RIPEMDout: string, RIPEMDout2: string;
      let rmd160 = new Ripemd160();
      
      let SHA256outb = SHA256G.HashStrToByte2(SHA256out);
      let SHA256out2b = SHA256G.HashStrToByte2(SHA256out2);
      
      let SHA256outc = new Array(SHA256out.length / 2);
      let SHA256out2c = new Array(SHA256out2.length / 2);
     
      for (let i = 0; i < SHA256out.length / 2; i++)
      SHA256outc[i] = Number(SHA256outb[i] & 0xff);
      
      for (let i = 0; i < SHA256out2.length / 2; i++)
      SHA256out2c[i] = Number(SHA256out2b[i] & 0xff);
      
      RIPEMDout = Ripemd160.HashCharToStr(
      rmd160.ripemd160(SHA256outc, SHA256out.length / 2)
      );
      
      RIPEMDout2 = Ripemd160.HashCharToStr(
      rmd160.ripemd160(SHA256out2c, SHA256out2.length / 2)
      );
      
      if(Compressed)
      //Compressed Address
        return RIPEMDout;
      else
      //UnCompressed Address
        return RIPEMDout2;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////
    //Metodo utilizado para reverter a codificação de uma assinatura ECDSA 
    //  do formado DER para BigInteger
    //////////////////////////////////////////////////////////////////////////////////        
    public sigDERrev(signECDSA: string): [bigint, bigint] {
      signECDSA = signECDSA.substring(6);
  
      let x: number = parseInt(signECDSA.substring(0, 2), 16);
      let r: string = signECDSA.substring(2, 2 * x + 2);
      signECDSA = signECDSA.substring(2 * x + 2);
      let s: string = signECDSA.substring(4);
  
      let bISign: [bigint, bigint] = [BigInt(0), BigInt(0)];
      let cR: number[] = SHA256G.HashStrToByte2(r);
      let cS: number[] = SHA256G.HashStrToByte2(s);
  
      for (let i = 0; i < cR.length; i++) {
          bISign[0] = bISign[0] * BigInt(0x100) + BigInt(cR[i]);
      }
  
      for (let i = 0; i < cS.length; i++) {
          bISign[1] = bISign[1] * BigInt(0x100) + BigInt(cS[i]);
      }
  
      return bISign;
    }

    /////////////////////////////////////////////////
    //JESUS is the LORD!!!
    ///////////////////////////////////////////////// 

    //////////////////////////////////////////////////////////////////////////////////
    //Metodo utilizado para codificar uma assinatura ECDSA 
    //  do formado BigInteger para DER
    //////////////////////////////////////////////////////////////////////////////////        
    public sigDER(signECDSA: bigint[]): string {
      const cSHA: number[] = new Array(100); // chave comprimida
      const cSHA2: number[] = new Array(100); // chave não comprimida
    
      let tA: bigint, ichA: bigint, ichA2: bigint;
      ichA = signECDSA[0];
      ichA2 = signECDSA[1];
    
      for (let i = 99; i > 0; i--) {
        cSHA[i] = (Number(ichA & BigInt(0xff)) & 0xff);
        cSHA2[i] = (Number(ichA2 & BigInt(0xff)) & 0xff);
        ichA = ichA / BigInt(0x100);
        ichA2 = ichA2 / BigInt(0x100);
      }
    
      let r: string = SHA256G.ByteToStrHex(cSHA);
      let ir: number = 0;
      while ("00".localeCompare(r.substring(0, 2)) == 0) {
        r = r.substring(2);
        ir++;
      }
    
      let s: string = SHA256G.ByteToStrHex(cSHA2);
      let is: number = 0;
      while ("00".localeCompare(s.substring(0, 2)) == 0) {
        s = s.substring(2);
        is++;
      }
    
      let jr: number = cSHA[ir] & 0xff;
      let js: number = cSHA2[is] & 0xff;
    
      if (jr > 0x7f) r = "00" + r;
      if (js > 0x7f) s = "00" + s;
    
      let sizeR: number[] = new Array(1); // chave comprimida
      let sizeS: number[] = new Array(1); // chave não comprimida
      let sizeSig: number[] = new Array(1); // chave não comprimida
    
      sizeR[0] = Number((r.length / 2) & 0xff);
      sizeS[0] = Number((s.length / 2) & 0xff);
    
      r = "02" + SHA256G.ByteToStrHex(sizeR) + r;
      s = "02" + SHA256G.ByteToStrHex(sizeS) + s;
    
      sizeSig[0] = Number(((r + s).length / 2) & 0xff);
    
      return "30" + SHA256G.ByteToStrHex(sizeSig) + r + s;
    }
}