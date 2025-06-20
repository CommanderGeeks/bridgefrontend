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
