// src/config/index.ts
import chains from "./chains";
import { IToken } from "./types";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const SOLANA_CHAIN_ID = 20001
export const chainIds: number[] = [...Object.values(chains)]
  .map((chain) => (chain.isActive ? chain.chainId : 0))
  .filter((chainId) => chainId !== 0);

export const dummyToken: IToken = {
  key: "Unknown",
  address: {
    20001: "0x0000000000000000000000000000000000000000",
    420000: "0x0000000000000000000000000000000000000000",
    8453: "0x0000000000000000000000000000000000000000",
    56: "0x0000000000000000000000000000000000000000",
  },
  name: "Unknown",
  symbol: "Unknown",
  decimals: {
    20001: 6,
    420000: 18,
    8453: 18,
    56: 18,
  },
};