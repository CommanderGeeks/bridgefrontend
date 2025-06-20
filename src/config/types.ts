export interface IToken {
  key: string;
  address: {
    [chainId: number]: string;
  };
  name: string;
  symbol: string;
  decimals: number;
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
