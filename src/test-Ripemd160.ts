/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////

const rmd160 = new Ripemd160();
let str: string = "1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.";

console.log("SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.'): \n\n", 
SHA256G.SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.', 
"acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));


//Resultado: 0d6c457ec5571d6d6afd2c77d3bc7d2b7a73d3e2
//https://www.fileformat.info/tool/hash.htm?hex=acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340
console.log("RMD160: acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340: \n\n",
Ripemd160.HashCharToStr(
    rmd160.ripemd160(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"), 
    "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340".length/2)
    )
);

const hashSTR: string = "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"
//Result: c13ea1e847d9b17920382f09d1de88cb311d065c
console.log("RMD160: " + hashSTR + "\n\n",
Ripemd160.HashCharToStr(
    rmd160.ripemd160(SHA256G.HashStrToByte2(hashSTR), 
    hashSTR.length/2)
    )
);


console.log("RMD160: " + str +"\n\n");

//A string precisa ser transformada em uma String Hexadecimal
str = SHA256G.ByteToStrHex(SHA256G.StrToByte(str));

//Result: e4578dc4fecd560e4ebd22ebd2edd1d6c687b078
//console.log("RMD160: " + str +"\n\n",
console.log( Ripemd160.HashCharToStr(rmd160.ripemd160(SHA256G.HashStrToByte2(str), str.length/2)));