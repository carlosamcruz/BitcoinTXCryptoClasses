/////////////////////////////////////////////////
//JESUS is the LORD!!!
///////////////////////////////////////////////// 

const keyTT = new Keygen();

let str0: string = keyTT.publicKeyHEX("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340");

//pvtKey: acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340
//n - pvtKey: 532fe086dc255211e978ab08baa5a371cc1fdf0818ba875e02b41deafe35fe01

console.log("Chave Publica: ", keyTT.publicKeyHEX("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
console.log("Chave Publica SEC COMP 02: ", keyTT.publicKeyCompSEC("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
console.log("Chave Publica SEC COMP 03: ", keyTT.publicKeyCompSEC("532fe086dc255211e978ab08baa5a371cc1fdf0818ba875e02b41deafe35fe01"));
console.log("Chave Publica SEC UNCCOMP PAR: ", keyTT.publicKeyUncompSEC("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
console.log("Chave Publica SEC UNCCOMP IMPAR: ", keyTT.publicKeyUncompSEC("532fe086dc255211e978ab08baa5a371cc1fdf0818ba875e02b41deafe35fe01"));
console.log("PVTKey from HASH: ", keyTT.HashToBigInt("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
console.log("PubKey Rev: ", keyTT.pubKeyRev(str0));
console.log("X: ", Keygen.bItoHexStr(keyTT.pubKeyRev(str0)[0]));
console.log("Y: ", Keygen.bItoHexStr(keyTT.pubKeyRev(str0)[1]));

//keyTT.publicKeyCompSEC("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340") ==
//'0272ac45bc9e4935214a6044af91e75d4eac3c6b8c18af20799f55ed171eda9d2a'
console.log("PubKey CompSECRev 02: ", keyTT.pubKeyCompSECRev('0272ac45bc9e4935214a6044af91e75d4eac3c6b8c18af20799f55ed171eda9d2a'));
console.log("PubKey CompSECRev 03: ", keyTT.pubKeyCompSECRev('0372ac45bc9e4935214a6044af91e75d4eac3c6b8c18af20799f55ed171eda9d2a'));

console.log("PubKey UncompSECRev 02: ", keyTT.pubKeyUncompSECRev('0472ac45bc9e4935214a6044af91e75d4eac3c6b8c18af20799f55ed171eda9d2a9c6a9f31444c3351d36a6dca76cb7ab7ab59b5cd87e22365948fbeeab50d8124'));
console.log("PubKey UncompSECRev 03: ", keyTT.pubKeyUncompSECRev('0472ac45bc9e4935214a6044af91e75d4eac3c6b8c18af20799f55ed171eda9d2a639560cebbb3ccae2c9592358934854854a64a32781ddc9a6b7041144af27b0b'));

let PUBKEY = keyTT.publicKeyHEX("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"); //PVTKEY - string Hexadecimal de 64 elementos.

//String BSV160 = pubKey.bsvWalletRMD160(PUBKEY, Variables.CompPKey);
//String BSVADD = pubKey.bsvWalletFull(PUBKEY, Variables.CompPKey);
console.log("PVT KEY: acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340");
console.log("PUBKEY: ", PUBKEY);
console.log("BSV Add From PVTKEY (Comp == True): ", keyTT.bsvWalletFull(PUBKEY, true));
console.log("RMD160 From Add (Comp == True): ", keyTT.addRMD(keyTT.bsvWalletFull(PUBKEY, true)));
console.log("BSV RMD160 From PVTKEY (Comp == True): ", keyTT.bsvWalletRMD160(PUBKEY, true));
console.log("BSV Add From PVTKEY (Comp == False): ", keyTT.bsvWalletFull(PUBKEY, false));
console.log("RMD160 From Add (Comp == False): ", keyTT.addRMD(keyTT.bsvWalletFull(PUBKEY, false)));
console.log("BSV RMD160 From PVTKEY (Comp == False): ", keyTT.bsvWalletRMD160(PUBKEY, false));

//R: 83520919001766086373116921347194920976810261550277402938089611317543911197687
//S: 27028212287730952038339143198826959698871245423174352616292936075266370235418
console.log("BI form Sig DER: ", keyTT.sigDERrev("3045022100b8a72a38b9630139a597f271c7016501656d717012d14f81ceee47ad7bce8bf702203bc16d1098ed3b81d04e836b4ea6ed5791a6b0863c9165529215b7be3616ec1a"));
console.log("DER Format From BI: ", keyTT.sigDER(keyTT.sigDERrev("3045022100b8a72a38b9630139a597f271c7016501656d717012d14f81ceee47ad7bce8bf702203bc16d1098ed3b81d04e836b4ea6ed5791a6b0863c9165529215b7be3616ec1a")));



