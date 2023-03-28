import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
//  import  {keccak256} from "ethereum-cryptography/keccak";
//  import {utf8ToBytes} from "ethereum-cryptography/utils";
// import { keccak256 } from "ethereumjs-util";

function Wallet({ address, setAddress, balance, setBalance,privateKey,setPrivateKey}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address =toHex(secp.getPublicKey(privateKey));
    // const bytes=utf8ToBytes(publicKey);
    //  const address=keccak256(bytes.slice(1)).slice(-20);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        privateKey
        <input placeholder="privatekey" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address:{address}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
