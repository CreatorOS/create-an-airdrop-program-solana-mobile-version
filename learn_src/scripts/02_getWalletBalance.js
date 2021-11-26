const { generateWallet, getWalletBalance } = require('../src');

const main = async () => {
    generateWallet();
    const walletBalance = await getWalletBalance();
    if (walletBalance !== 0) {
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