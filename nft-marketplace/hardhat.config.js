require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    polygon_amoy: {
      url: process.env.ALCHEMY_AMOY_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
  },
};
