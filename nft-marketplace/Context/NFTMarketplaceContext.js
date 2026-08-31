import React, { useState, useEffect, useContext } from "react";

import Web3Modal from "web3modal";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    ethers.getAddress(NFTMarketplaceAddress),
    NFTMarketplaceABI,
    signerOrProvider,
  );
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";
//Upload to pinata function
const uploadToPinata = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Pinata CID:", data.cid);
    console.log("Pinata URL:", data.url);

    return data.url;
  } catch (error) {
    console.log("Pinata upload error:", error);
  }
};
//function to create NFT
const createNFT = async (name, price, image, description, router) => {
  // const { name, description, price } = formInput;

  if (!name || !description || !price || !image)
    return console.log("Data is missing");

  try {
    const metaData = { name, description, image };

    //upload metadata json to pinata

    const response = await fetch("/api/upload-metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metaData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    //metadata url
    const url = data.url;

    await createSale(url, price);
  } catch (error) {
    console.log("Error while creating NFT", error);
  }
};

//function for create Sale
const createSale = async (url, formInputPrice, isReselling, id) => {
  try {
    const price = ethers.parseUnits(formInputPrice.toString(), "ether");

    const contract = await connectingWithSmartContract();
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.reSellToken(url, price, {
          value: listingPrice.toString(),
        });

    await transaction.wait();

    console.log("NFT created successfully!", transaction);
  } catch (error) {
    console.log("Error in creating sale:", error);
  }
};

//function for fetching NFT
const fetchNFTs = async () => {
  try {
    const provider = new ethers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItem();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformsttedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);

        const {
          data: { image, name, description },
        } = axios.get(tokenURI);

        const price = ethers.formatUnits(unformsttedPrice, "ether");
        return {
          price,
          tokenId: tokenId.Number(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      }),
    );
    return items;
  } catch (error) {
    console.log("Error while fetching NFTs");
  }
};

//fetching my NFTs or listed NFTs
const fetchMyNFTsOrListedNFTs = async (type) => {
  try {
    const contract = await connectingWithSmartContract();
    const data =
      type == "fetchItemsListed"
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFT();

    const items = await Promise.all(
      data.map(async ({ tokenId, seller, owner, price: unformsttedPrice }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);
        const price = ethers.formatUnits(unformsttedPrice.toString(), "ether");
        return {
          price,
          tokenId: tokenId.Number(),
          seller,
          owner,
          image,
          name,
          description,
          tokenURI,
        };
      }),
    );

    return items;
  } catch (error) {
    console.log("Error while fetching lsited NFTs");
  }
};

//Buy NFTs function
const buyNFT = async (nft) => {
  try {
    const contract = await connectingWithSmartContract();
    const price = ethers.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
  } catch (error) {
    console.log("Error while buying nft", error);
  }
};
const HARDHAT_CHAIN_ID = "0x7a69"; // 31337

const switchToHardhatNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HARDHAT_CHAIN_ID }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: HARDHAT_CHAIN_ID,
            chainName: "Hardhat Localhost",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
};

// CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    if (!window.ethereum) {
      console.log("Please install MetaMask");
      throw new Error("Please install MetaMask");
    }

    await switchToHardhatNetwork();

    const network = new ethers.Network("hardhat", 31337);
    const provider = new ethers.BrowserProvider(window.ethereum, network);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = new ethers.JsonRpcSigner(provider, accounts[0]);

    const contract = fetchContract(signer);

    console.log("Contract:", contract);
    console.log("Wallet:", await signer.getAddress());

    return contract;
  } catch (error) {
    console.error("Contract connection error:", error);
    throw error;
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs ";

  const [currentAccount, setCurrentAccount] = useState("");

  //checl if wallet connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return console.log("Please install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Current address:", accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting the wallet.", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //connect wallet with button
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return console.log("Please install MetaMask");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);

        console.log("Wallet connected:", accounts[0]);
      }
    } catch (error) {
      console.log("Error while connecting to wallet:", error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        uploadToPinata,
        connectWallet,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        currentAccount,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
