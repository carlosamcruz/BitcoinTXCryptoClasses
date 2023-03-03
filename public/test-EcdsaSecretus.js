"use strict";
/////////////////////////////////////////////////
//JESUS is the LORD!!!
///////////////////////////////////////////////// 
const newECDSA = new EcdsaSecretus();
const newKey = new Keygen();
//let str0: string = keyTT.publicKeyHEX("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340");
//Result: 78508239125677432446181005529785340604787833939970894555192085498210693770233
console.log("Knum T1: ", newECDSA.Knum("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340", "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340", "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
//Result: 65090042990684253147974948434437001492367760580140170602975500419195257618689
console.log("Knum T2: ", newECDSA.Knum("6c9daaae5fd8d551787d2341bcb99dc5fe0d5ca6952173b653cf265608817eda", "af47502c85213d42cfcb9d9bffc75fd352806d581b2b7e866ce93d39d9a0be58", "40fd0048c2c4a8390b638e724000473734d794d60ddbd104c6f3a59475433c96"));
//Assina e verifica 1:
let ECDSA2 = newECDSA.ECDSABSV("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340", "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340", "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340");
console.log("\nECDSA X: ", ECDSA2[0]);
console.log("\nECDSA Y: ", ECDSA2[1]);
console.log("\nECDSA Z: ", ECDSA2[2]);
let ECDSA3 = [2n];
ECDSA3[0] = ECDSA2[0];
ECDSA3[1] = ECDSA2[1];
console.log("\nECDSA Verify 1: ", newECDSA.ECDSAVerifyBSV2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340", newKey.pubKeyRev(newKey.publicKeyHEX("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")), ECDSA3));
//Assina e verifica 2:
let ECDSA2b = newECDSA.ECDSABSV("6c9daaae5fd8d551787d2341bcb99dc5fe0d5ca6952173b653cf265608817eda", "af47502c85213d42cfcb9d9bffc75fd352806d581b2b7e866ce93d39d9a0be58", "40fd0048c2c4a8390b638e724000473734d794d60ddbd104c6f3a59475433c96");
let ECDSA3b = [2n];
ECDSA3b[0] = ECDSA2b[0];
ECDSA3b[1] = ECDSA2b[1];
console.log("\nECDSA Verify 2: ", newECDSA.ECDSAVerifyBSV2("6c9daaae5fd8d551787d2341bcb99dc5fe0d5ca6952173b653cf265608817eda", newKey.pubKeyRev(newKey.publicKeyHEX("af47502c85213d42cfcb9d9bffc75fd352806d581b2b7e866ce93d39d9a0be58")), ECDSA3b));
