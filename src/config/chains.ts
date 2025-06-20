import { INetworks } from "./types";

const supportedChains: INetworks = {
  20001: {
    isActive: true,
    name: "Solana",
    chainId: 20001,
    currency: "SOL",
    decimals: 9,
    explorer:
      "https://explorer.solana.com/",
    rpc: "https://base.llamarpc.com",
    bridgeAddress: "0x00AC09E13CD78b559464433DFf9296F0bd3FB764",
  },
  8453: {
    isActive: true,
    name: "Base",
    chainId: 8453, // 8453
    currency: "ETH",
    decimals: 18,
    explorer: "https://basescan.org",
    rpc: "https://base.llamarpc.com",
    bridgeAddress: "0x48E3b1C1403E3006ec6F70bE75d1aa72288814f6",
  },

  56: {
    isActive: true,
    name: "Binance Smart Chain",
    chainId: 56, // 56
    currency: "BNB",
    decimals: 18,
    explorer: "https://bscscan.com",
    rpc: "https://binance.llamarpc.com",
    bridgeAddress: "0xbfE84444E331D45E3E5666E353830657D5a07935",
  },
  420000: {
    isActive: true,
    name: "Infinaeon",
    chainId: 420000, // 
    currency: "ETH",
    decimals: 18,
    explorer: "https://bscscan.com",
    rpc: "https://rpc.infinaeon.com",
    bridgeAddress: "0x262F5D28087Bda51e3AcB2949B50f0ADd871A78f",
  },
};

export default supportedChains;
