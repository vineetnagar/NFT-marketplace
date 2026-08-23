const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.waitForDeployment();

  const contractAddress = await nftMarketplace.getAddress();

  console.log("Deployed contract address:", contractAddress);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
