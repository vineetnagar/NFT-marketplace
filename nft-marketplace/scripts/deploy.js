const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.waitForDeployment();

  const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
  const transferFunds = await TransferFunds.deploy();

  await transferFunds.waitForDeployment();

  const contractAddressNFT = await nftMarketplace.getAddress();
  const contractAddressFunds = await transferFunds.getAddress();

  console.log("Deployed NFTMarketplace contract address:", contractAddressNFT);
  console.log("Deployed TransferFunds contract address:", contractAddressFunds);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
