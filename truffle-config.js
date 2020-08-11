
module.exports = {
  networks: {
  development: {
    host: "localhost", // Random IP for example purposes (do not use)
    port: 8545,
    network_id: 15
   },ropsten: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.cd80405c940847429e2ef4f9c09a5349),
    network_id: 3,
    gas: 3000000,
    gasPrice: 21
  },
  kovan: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
    network_id: 42,
    gas: 3000000,
    gasPrice: 21
  },
  rinkeby: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
    network_id: 4,
    gas: 3000000,
    gasPrice: 21
  },
  // main ethereum network(mainnet)
  main: {
    provider: () => new HDWalletProvider(process.env.MNENOMIC, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
    network_id: 1,
    gas: 3000000,
    gasPrice: 21
  }
  }
}
