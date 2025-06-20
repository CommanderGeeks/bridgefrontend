// src/utils/formatBalance.ts
import { BigNumber } from "bignumber.js";

export const formatNumber = (
  balance: BigNumber,
  decimals: number = 4
): string => {
  return balance.toFixed(decimals);
};

export const toDecimals = (
  amount: string,
  decimals: number
): BigNumber => {
  return new BigNumber(amount).times(new BigNumber(10).pow(decimals));
};

export const fromDecimals = (
  amount: BigNumber,
  decimals: number
): BigNumber => {
  return amount.div(new BigNumber(10).pow(decimals));
};

// NEW: Helper to format with token-specific decimals
export const formatTokenAmount = (
  balance: BigNumber,
  tokenDecimals: number,
  displayDecimals: number = 4
): string => {
  const formatted = fromDecimals(balance, tokenDecimals);
  return formatted.toFixed(displayDecimals);
};