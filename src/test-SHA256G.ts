/////////////////////////////////////////////////
//JESUS is the LORD!!!
/////////////////////////////////////////////////

console.log("Hash Test T0: ", "acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340");

console.log("Hash String to Byte: ", 
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));

console.log("\nHash Byte to String: ", 
SHA256G.ByteToStrHex(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));

console.log("SHA256 Hash Test T0: ", 
SHA256G.SHA256bytes(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));

console.log("SHA256 Hash Test (T0 + T0): ", 
SHA256G.SHA256bytes(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));

console.log("SHA256 Hash Test (T0 + T0 + T0): ", 
SHA256G.SHA256bytes(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));

console.log("SHA256 Hash Test (T0 + T0 + T0 + T0): ", 
SHA256G.SHA256bytes(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));


console.log("LEFormat (SHA256 Hash Test (T0 + T0 + T0 + T0)): ",
SHA256G.LEformat( 
SHA256G.SHA256bytes(
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"))));

console.log("H0 from Byte to String: ", SHA256G.H0String());
console.log("H0 from String to Byte: ", SHA256G.HashStrToByte2(SHA256G.H0String()));
console.log("\nH0 from Byte to String Again: ", 
SHA256G.ByteToStrHex(SHA256G.HashStrToByte2(SHA256G.H0String())));

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

console.log("SHA256MsnHxHex2(T0, H0): ", 
SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
                        SHA256G.HashStrToByte2(SHA256G.H0String())));

//Resultado: "ea6deb7ee5d6bfecde009ae613b6fd6ba36788654787b6c641ff551bd9301c82"
console.log("SHA256MsnHxHex2(T0, Hx(T0)): ", 
SHA256G.SHA256MsnHxHex2(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
                        SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));                        

console.log("SHA256MsnHxHex3(T0, H0): ", 
    SHA256G.SHA256MsnHxHex3(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
                            SHA256G.HashStrToByte2(SHA256G.H0String())));

console.log("SHA256MsnHxHex3(T0, H0) from Byte to String: ", 
SHA256G.ByteToStrHex(SHA256G.SHA256MsnHxHex3(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
SHA256G.HashStrToByte2(SHA256G.H0String()))));

    //Resultado: "ea6deb7ee5d6bfecde009ae613b6fd6ba36788654787b6c641ff551bd9301c82"
console.log("SHA256MsnHxHex3(T0, Hx(T0)): ", 
    SHA256G.SHA256MsnHxHex3(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
                            SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340")));                        
    
console.log("SHA256MsnHxHex3(T0, Hx(T0) from Byte to String: ", 
SHA256G.ByteToStrHex(SHA256G.SHA256MsnHxHex3(SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"),
SHA256G.HashStrToByte2("acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"))));

console.log("SHA256STR('qwertyuiop'): ", 
SHA256G.SHA256STR('qwertyuiop'));

// Resultado: 142bd05b5741173add305cc40d11561092773b0c023394074753a71dcd2a6941
console.log("SHA256STR('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.'): ", 
SHA256G.SHA256STR('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.'));


// Resultado: 142bd05b5741173add305cc40d11561092773b0c023394074753a71dcd2a6941
console.log("SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.'): ", 
SHA256G.SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.', 
SHA256G.H0String()));


// Resultado: 188f5df027a1b637e265ab5cd369967d06315dd6cdfdc91d0f086eb185dd6f89 APP Android
console.log("SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.'): ", 
SHA256G.SHA256MsnHx('1 In the beginning God created the heaven and the earth. 2 And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters. 3 And God said, Let there be light: and there was light. 4 And God saw the light, that it was good: and God divided the light from the darkness. 5 And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.', 
"acd01f7923daadee168754f7455a5c8cee8efdde968e18ddbd1e40a1d2004340"));
