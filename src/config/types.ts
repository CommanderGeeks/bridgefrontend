// src/config/types.ts
export interface IToken {
  key: string;
  address: {
    [chainId: number]: string;
  };
  // New: decimals per chain instead of global decimals
  decimals: {
    [chainId: number]: number;
  };
  name: string;
  symbol: string;
}

export interface INetworks {
  [key: number]: INetwork;
}

export interface INetwork {
  isActive: boolean;
  name: string;
  chainId: number;
  currency: string;
  decimals: number;
  explorer: string;
  rpc: string;
  bridgeAddress: string;
}