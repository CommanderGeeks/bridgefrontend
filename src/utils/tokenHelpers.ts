// src/utils/tokenHelpers.ts
import { ADDRESS_ZERO } from "../config";
import tokens from "../config/tokens";
import { IToken } from "../config/types";

export const getChainTokens = (chainId: number): IToken[] => {
  return tokens.filter((t) => t.address[chainId]);
};

export const getTokenByKey = (tokenKey: string): IToken | undefined => {
  return tokens.find((t) => t.key === tokenKey);
};

export const getTokenAddyByKey = (
  tokenKey: string,
  chainId: number
): string => {
  return (
    tokens.find((t) => t.key === tokenKey)?.address[chainId] ||
    ADDRESS_ZERO
  );
};

// NEW: Helper function to get token decimals for a specific chain
export const getTokenDecimals = (
  tokenKey: string,
  chainId: number
): number => {
  const token = tokens.find((t) => t.key === tokenKey);
  return token?.decimals[chainId] || 18; // Default to 18 if not found
};

// NEW: Helper function to get token decimals from token object
export const getTokenDecimalsFromToken = (
  token: IToken,
  chainId: number
): number => {
  return token.decimals[chainId] || 18; // Default to 18 if not found
};