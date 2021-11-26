# Create an airdrop program with Solana web3.js

Welcome to all the learners to the Solana 101 airdrop program development quest. In this quest, you’ll learn how to develop an application leveraging the Solana blockchain - which is the fastest growing blockchain community in the world.
We’ll be developing an airdrop program throughout this quest. Airdrop refers to the act of sending a cryptocurrency to a wallet, usually for free, to either promote the cryptocurrency or enable developers to test out transactions over the blockchain without spending real money.
This quest assumes that you’ve basic understanding of any one programming language - preferably Javascript. 

## Setting up the environment

To interact with the Solana blockchain, we need to connect to the Solana network. Solana provides us with a very hand JS package called `web3.js`. 
We have already imported the required modules we are going to use from `web3.js` package in the code file.

```
const {
 Connection,
 PublicKey,
 clusterApiUrl,
 Keypair,
 LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
```
Congratulations, we are’re all set to start developing JS applications on Solana. 

## Generating a new wallet
To transact money on the blockchain, you need to use a software that facilitates these transactions called a wallet. Crypto wallets are physical devices or virtual programs that allow us to easily store and retrieve our crypto assets i.e. any cryptocurrencies that we might have on the blockchain.


The `Keypair` class that we just imported allows us to create a new wallet. 
Add the following lines in `generateWallet()` function:
```
const newPair = new Keypair();
```
We now have a wallet object of type `Keypair` and will be airdropping SOL into this wallet.

## Storing the wallet credentials

Every crypto wallet has two components to it - a public key and a secret(aka private) key. The public key is used to uniquely identify your wallet over the blockchain and can be used to receive crypto to your wallet. The private key is used to perform transactions through your wallet. 
The `newPair` instance that we created in the previous section holds the public key and the secret key. 
Add the following line to `generateWallet()` function:

```
publicKey = new PublicKey(newPair._keypair.publicKey).toString();
``` 

We’re extracting the public key from `accountInfo` and storing it in a variable called `publicKey` which is of type string.
We can do the same thing for a secret key. Add the following lines after the previous line:

```
secretKey = newPair._keypair.secretKey
```

We’re extracting the private key from accountInfo and storing it in a variable called `secretKey`, which is of type `Uint8Array` of length 64. 
**Never share the private key of your wallet with anyone**. It can be used to clone your wallet and perform transactions without your authorization.

Let's now check how the public and private key looks like. 
Hit `Save` and `Run` and you should see the keys in test output 1.

## Creating the wallet balance function

What if we want to see the balance of our wallet? Now that we’ve seen how to create a wallet, let’s create a function that can utilize the public and private key and print out the wallet balance. Web3.js allows us to view the balance using the `getBalance` method inside the `connection` class that we had imported.

We’ll be adding functionality to `getWalletBalance()` function.
Add the following lines inside the ’try’ block.

```
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
```

Creates a connection object that’ll be used to get the balance. Apart from the main network (called mainnet), Solana also maintains clusters called devnet and testnet. Devnet is the replica of the Solana’s mainnet, and serves as a playground for anyone who wants to try out the features of Solana. `clusterApuIrl` provides us the URL for devnet that we’ll be passing to create our connection object so that we get details of devnet.
Next, we’ll create a wallet object from the `secretKey`. Type the following code:

```
const myWallet = await Keypair.fromSecretKey(secretKey);
```

We’ll now be querying the balance of this wallet.

```
let walletBalance = await connection.getBalance(
    new PublicKey(myWallet.publicKey)
);
walletBalance = parseInt(walletBalance)/LAMPORTS_PER_SOL;
console.log(`=> For wallet address ${publicKey}`);
console.log(`Wallet balance: ${walletBalance}`);
return walletBalance;
```

Hit `Save` and `Run` and check output in test output 2. 
The wallet balance output should be `0 SOL`.

## Airdropping SOL function!

Now that we’ve set up our wallet, let’s create a function that’ll airdrop some SOL into our wallet! 

As we had had done earlier, we need to create a `connection` object and a `walletKeyPair` object for the airdrop function. 
Add the following commands in the `airDropSol()` function:

```
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const walletKeyPair = await Keypair.fromSecretKey(secretKey);
```

Now, we first create an airdrop signature using the wallet details and the amount of SOL we want to airdrop (you can airdrop at max 5 SOL in one transaction). We then await a confirmation for the transaction from the network. 
Add the following lines to do so:
```
console.log(`-- Airdropping 5 SOL --`)
const fromAirDropSignature = await connection.requestAirdrop(
    new PublicKey(walletKeyPair.publicKey),
    5 * LAMPORTS_PER_SOL
);
await connection.confirmTransaction(fromAirDropSignature);
```

Now, hit `Save` and `Run`. 
The 3rd output should show the wallet balance as `5 SOL`.

Congratulations! You’ve completed the airdrop function.

## Conclusion

Congratulations on completing the Solana 101 airdrop program quest! With the ever growing Solana development ecosystem, you’re in for a wild and exciting ride. In the upcoming quests, we’ll be dipping our toes in fun projects like creating your very own cryptocurrency, or writing smart contracts for Solana in Rust.
