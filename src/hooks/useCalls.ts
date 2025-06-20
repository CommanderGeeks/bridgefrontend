// src/hooks/useCalls.ts
import { useCallback, useEffect, useState } from "react";
import { useBridgeContract, useERC20 } from "./useContract";
import { BigNumber } from "bignumber.js";
import { useAccount, useChainId } from "wagmi";
import { IToken } from "../config/types";
import useRefresh from "./useRefresh";
import { getTokenDecimalsFromToken } from "../utils/tokenHelpers";
import { ADDRESS_ZERO } from "../config";
import { toDecimals } from "../utils/formatBalance";

export const useAllowance = (token: IToken, addy: string) => {
  const chainId = useChainId();
  const { address } = useAccount();
  const [allowance, setAllowance] = useState(new BigNumber("0"));
  const tokenAddy = token.address[chainId];
  const tokenContract = useERC20(tokenAddy);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        if (tokenAddy === ADDRESS_ZERO) return;

        const res = await tokenContract.allowance(address, addy);
        setAllowance(new BigNumber(res.toString()));
      } catch (e) {
        setAllowance(new BigNumber("0"));
      }
    };
    fetch();
  }, [address, tokenContract, addy, chainId, token, fastRefresh, tokenAddy]);

  return allowance;
};

export const useBalance = (token: IToken, bridgeAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber("0"));
  const chainId = useChainId();
  const { address } = useAccount();
  const { fastRefresh } = useRefresh();
  const erc20Contract = useERC20(token.address[chainId]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await erc20Contract.balanceOf(address);
        setBalance(new BigNumber(res.toString()));
      } catch (e) {
        console.log(e);
        setBalance(new BigNumber("0"));
      }
    };
    fetch();
  }, [token, chainId, erc20Contract, fastRefresh, address]);

  return balance;
};

export const useComputeFees = (
  amount: string,
  token: IToken,
  bridgeAddress: string
) => {
  const [fees, setFees] = useState(new BigNumber("0"));
  const { fastRefresh } = useRefresh();
  const bridgeContract = useBridgeContract(bridgeAddress);
  const chainId = useChainId();
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await bridgeContract.getTokenData(token.address[chainId]);
        
        // Use per-chain decimals
        const tokenDecimals = getTokenDecimalsFromToken(token, chainId);
        const val = new BigNumber(amount);
        const feeRate = new BigNumber(res?.fee?.toString() || "0");
        const fee = val.times(feeRate).div(10000);
        
        setFees(fee);
      } catch (e) {
        console.log(e);
        setFees(new BigNumber("0"));
      }
    };
    fetch();
  }, [token, amount, chainId, bridgeContract, fastRefresh, address]);

  return fees;
};

export const useMintable = (token: IToken, bridgeAddress: string) => {
  const [mintable, setMintable] = useState(false);
  const { fastRefresh } = useRefresh();
  const bridgeContract = useBridgeContract(bridgeAddress);
  const chainId = useChainId();
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await bridgeContract.getTokenData(token.address[chainId]);
        setMintable(res?.isOriginChain);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [token, chainId, bridgeContract, fastRefresh, address]);

  return mintable;
};

export const useMaxTx = (token: IToken, bridgeAddress: string) => {
  const [maxTx, setMaxTx] = useState(new BigNumber("0"));
  const bridgeContract = useBridgeContract(bridgeAddress);
  const { fastRefresh } = useRefresh();
  const chainId = useChainId();
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await bridgeContract.getTokenData(token.address[chainId]);
        setMaxTx(new BigNumber(res?.maxTx.toString()));
      } catch (e) {
        console.log(e);
        setMaxTx(new BigNumber("0"));
      }
    };
    fetch();
  }, [token, chainId, bridgeContract, fastRefresh, address]);

  return maxTx;
};

export const useMinTx = (token: IToken, bridgeAddress: string) => {
  const [minTx, setMinTx] = useState(new BigNumber("0"));
  const { fastRefresh } = useRefresh();
  const bridgeContract = useBridgeContract(bridgeAddress);
  const chainId = useChainId();
  const { address } = useAccount();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await bridgeContract.getTokenData(token.address[chainId]);
        setMinTx(new BigNumber(res?.minTx.toString()));
      } catch (e) {
        console.log(e);
        setMinTx(new BigNumber("0"));
      }
    };
    fetch();
  }, [token, chainId, bridgeContract, fastRefresh, address]);

  return minTx;
};