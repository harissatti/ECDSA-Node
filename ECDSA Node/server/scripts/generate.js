const secp = require("ethereum-cryptography/secp256k1");
const {toHex}=require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

//generate the private Key that come as bite array
const privateKey=secp.utils.randomPrivateKey();
//using to Hex to see key in hexa decimal
console.log("private Key:",toHex(privateKey));
//get the Public key
const publicKey=secp.getPublicKey(privateKey);
// const slic=keccak256(publicKey.slice(1)).slice(-20);
console.log("public Key:",toHex(publicKey));

