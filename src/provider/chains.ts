import { Chain } from "wagmi/chains";
import bscIcon from "../assets/chains/56.png"
import infIcon from "../assets/chains/420000.png"

import baseIcon from "../assets/chains/8453.png"


const base: Chain = {
    id: 8453,
    rpcUrls: { default: { http: ["https://base.llamarpc.com"] } },
    nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
    },
    name: "Base",
    blockExplorers: {
        default: {
            name: "BaseScan",
            url: "https://basescan.org",
            apiUrl: "https://api.basescan.org/api",
        },
    },
};

const BSC: Chain = {
    id: 56,
    rpcUrls: { default: { http: ["https://binance.llamarpc.com"] } },
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB",
    },
    name: "BSC",
    blockExplorers: {
        default: {
            name: "BscScan",
            url: "https://bscscan.com/",
            apiUrl: "https://bscscan.com/api",
        },
    },
};

const infineon: Chain = {
    id: 420000,
    rpcUrls: { default: { http: ["https://rpc.infinaeon.com"] } },
    nativeCurrency: {
        decimals: 18,
        name: "ETH",
        symbol: "ETH",
    },
    name: "Infinaeon",
    blockExplorers: {
        default: {
            name: "Infinaeon",
            url: "https://explorer.infinaeon.com",
            apiUrl: "https://explorer.infinaeon.com/api",
        },
    },
};

export const chains = [

    BSC,
    base,
    infineon
] as const;

export const chainImages = {

    8453: baseIcon,
    56: bscIcon,
    420000: infIcon
  }