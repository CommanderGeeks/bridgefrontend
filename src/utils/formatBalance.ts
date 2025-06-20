import { BigNumber } from "bignumber.js";

export const fromDecimals = (balance: BigNumber, decimals = 18) => {
  const displayBalance = new BigNumber(balance).div(
    new BigNumber(10).pow(decimals)
  );
  return displayBalance;
};

export const toDecimals = (amount: string, decimals = 18) => {
  const displayBalance = new BigNumber(amount).times(
    new BigNumber(10).pow(decimals)
  );
  return displayBalance;
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return new BigNumber(balance).div(new BigNumber(10).pow(decimals)).toNumber();
};

export const formatNumber = (val: any) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 3,
  }).format(val);
};
