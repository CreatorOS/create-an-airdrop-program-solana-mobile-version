const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");


let publicKey, secretKey;

const generateWallet = () => {
  //STEP-1 Generating a new wallet keypair
  const newPair = new Keypair();
  // console.log(newPair);

  //STEP-2 Storing the public and private key
  publicKey = new PublicKey(newPair._keypair.publicKey).toString();
  secretKey = newPair._keypair.secretKey;

  return newPair;
}

//STEP-3 Getting the wallet Balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    let walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    walletBalance = parseInt(walletBalance)/LAMPORTS_PER_SOL;
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`   Wallet balance: ${walletBalance} SOL`);
    return walletBalance;
  } catch (err) {
    console.log(err);
  }
};

//STEP-4 Air dropping SOL (in terms of LAMPORTS)
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`-- Airdropping 5 SOL --`)
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      5 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  generateWallet,
  getWalletBalance,
  airDropSol,
  getWalletBalance,
}