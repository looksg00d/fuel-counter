const { Wallet, utils } = require("fuels");

const mnemonic = "sand figure cigar elevator float elder grass nephew adapt venture sight alien appear nature seven divorce culture minute oval lunch tip frozen catalog trim";
const wallet = Wallet.fromMnemonic(mnemonic, "https://beta-3.fuel.network/graphql");

console.log("address", wallet.address.toString());
console.log("private key", wallet.privateKey);
