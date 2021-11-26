const { generateWallet, getWalletBalance, airDropSol } = require('../src');

const main = async () => {
    generateWallet();
    await airDropSol();
    const walletBalance = await getWalletBalance();
    if (walletBalance !== 5) {
        console.log('Test Failed');
        process.exit(1);
    } else {
        console.log('Test Passed');
        process.exit(0);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });