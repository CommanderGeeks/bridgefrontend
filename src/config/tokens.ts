// src/config/tokens.ts
import { IToken } from "./types";

const tokens: IToken[] = [
    {
        key: "INFINAEON",
        address: {
            20001: "42py4U4kUcxUsj2AYAbPuu9ottwYM2Y9P8jo3fHiNF42",
            420000: "0xe4d27c167fD98Db2516e8c4bC292d9B551D6e187",
        },
        name: "INFINAEON",
        symbol: "INF",
        decimals: {
            20001: 9, // SOL chain uses 9 decimals
            420000: 18, // Infinaeon chain uses 18 decimals
        },
    },
    {
        key: "SELECT",
        symbol: "SELECT",
        address: {
            56: "",
            42161: "",
            8453: "",
            420000: "",
            20001: "",
        },
        name: "SELECT",
        decimals: {
            56: 6,
            42161: 6,
            8453: 6,
            420000: 6,
            20001: 6,
        },
    },
    {
        key: "SHAMAN",
        address: {
            20001: "5YnjBp1eidhx7MhATU6hPwg8PtE72vx2ApC2sjXApump",
            420000: "0xAE4446bdcCdC4C04e02Bd05903bfaA994B7a6C01"
        },
        name: "American Shaman",
        symbol: "SHAMAN",
        decimals: {
            20001: 6, // SOL chain
            420000: 6, // Infinaeon chain
        },
    },
    {
        key: "GEEKS",
        address: {
            56: "0xB09e71CC2519a188a3B14459CE7D7bC50b55AA1f",
            8453: "0xDEAF504EB2C7fbc0ac9F3f97Cad1dfB47794ADb5"
        },
        name: "Geeks",
        symbol: "Geeks",
        decimals: {
            56: 18, // BSC
            8453: 18, // Base
        },
    },
    {
        key: "DEFIRE",
        address: {
            56: "0xccE95EDCFD167d28daE22b464b297c154966B343",
            8453: "0x5F964c01CfCeAf1D9dC247C037DB9b833aB49dD4"
        },
        name: "DeFire",
        symbol: "DeFire",
        decimals: {
            56: 18, // BSC
            8453: 18, // Base
        },
    },
    // NEW: Yafa token with different decimals on each chain
    {
        key: "Yafa",
        address: {
            20001: "YAFAJvjUv9MVAKcTE7Y8ouo45QNKVK6fCMzdxt2tjPs", // Solana address
            8453: "0xE51f9bb2E4Fe0AB024dDCD2DAFD600073B579342", // Base address
        },
        name: "Yafa",
        symbol: "Yafa",
        decimals: {
            20001: 6, // SOL chain uses 6 decimals
            8453: 9, // Base chain uses 9 decimals
        },
    },
];

export default tokens;