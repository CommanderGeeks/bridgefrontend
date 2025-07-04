// src/hooks/useDeposit.ts
import { useCallback } from "react";
import { useBridgeContract } from "./useContract";
import { INetwork, IToken } from "../config/types";
import { toDecimals } from "../utils/formatBalance";
import { getTokenDecimalsFromToken } from "../utils/tokenHelpers";

export const useDepositTokens = function (
  amount: string,
  receiver: string,
  token: IToken,
  chain: INetwork,
  destChainId: Number
) {
  const bridgeAddress = chain.bridgeAddress;
  const bridgeContract = useBridgeContract(bridgeAddress);

  const handleDeposit = useCallback(async () => {
    try {
      if (Number(chain.chainId) === destChainId) {
        return { error: "Cannot bridge to same chain" };
      }
      
      // Use per-chain decimals instead of global decimals
      const tokenDecimals = getTokenDecimalsFromToken(token, chain.chainId);
      const amountFormatted = toDecimals(amount || "0", tokenDecimals);
      console.log(amountFormatted.toFixed());

      const params = [
        amountFormatted.toFixed(),
        token.address[chain.chainId],
        destChainId,
        receiver,
      ];
      const tx = await bridgeContract.deposit(...params);
      // wait for the transaction to actually settle in the blockchain
      await tx.wait();
      return { txHash: tx.hash };
    } catch (e: any) {
      console.log({ e });
      console.log(e.reason);
      return { error: e.reason };
    }
  }, [amount, receiver, chain.chainId, destChainId, token, bridgeContract]);

  return { onDeposit: handleDeposit };
};