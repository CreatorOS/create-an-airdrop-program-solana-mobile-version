const { generateWallet } = require('../src');

const main = async () => {
    const keypair = generateWallet();
    console.log(keypair);
    if (!('_keypair' in keypair)) {
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