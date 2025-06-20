import chains from "./chains";
import { IToken } from "./types";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const SOLANA_CHAIN_ID = 20001
export const chainIds: number[] = [...Object.values(chains)]
  .map((chain) => (chain.isActive ? chain.chainId : 0))
  .filter((chainId) => chainId !== 0);

export const dummyToken: IToken = {
  key: "Unknown",
  address: "0x0000000000000000000000000000000000000000",
  name: "Unknown",
  symbol: "Unknown",
  decimals: 6,
};
