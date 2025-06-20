// src/hooks/useApprove.ts
import { ethers } from "ethers";
import { useCallback } from "react";
import { useERC20 } from "./useContract";
import { IToken } from "../config/types";
import { useChainId } from "wagmi";
import { getTokenDecimalsFromToken } from "../utils/tokenHelpers";

export const useApprove = (amount: number, token: IToken, addy: string) => {
  const chainId = useChainId();
  const tokenContract = useERC20(token.address[chainId]);

  const handleApprove = useCallback(async () => {
    try {
      // Use per-chain decimals instead of global decimals
      const tokenDecimals = getTokenDecimalsFromToken(token, chainId);
      
      const amountFormatted =
        amount > 0
          ? ethers.utils.parseUnits(amount.toString(), tokenDecimals)
          : ethers.constants.MaxUint256;

      const tx = await tokenContract.approve(addy, amountFormatted);
      await tx.wait();
      return tx;
    } catch (e) {
      return false;
    }
  }, [tokenContract, addy, amount, token, chainId]);

  return { onApproveBridge: handleApprove };
};