import React, { useState, useEffect, useContext } from "react";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Router from "next/router";
import axios from "axios";

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

    return data.cid;
  } catch (error) {
    console.log("Pinata upload error:", error);
  }
};
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider,
  );

// CONNECTING WITH SMART CONTRACT
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
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

      const accounts = window.ethereum.request({ method: "eth_request" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log("Something went wrong while connecting the wallet.");
    }
  };

  //connect wallet with button
  const connectWallet = async () => {
    if (!window.ethereum) return console.log("Please install MetaMask");

    const accounts = window.ethereum.request({ method: "eth_requestAccount" });
    setCurrentAccount(accounts[0]);
    window.location.reload();
    try {
    } catch (error) {
      console.log("Error while connecting to wallet.");
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        uploadToPinata,
        connectWallet,
        titleData,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
