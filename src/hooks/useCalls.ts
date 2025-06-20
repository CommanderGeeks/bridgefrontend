import { BigNumber } from "bignumber.js";
import { useEffect, useState } from "react";
import { useBridgeContract, useERC20 } from "./useContract";
import useRefresh from "./useRefresh";
import { ADDRESS_ZERO } from "../config";
import Web3 from "web3";
import erc20 from "../config/abi/erc20.json";
import { INetwork, IToken } from "../config/types";
import { getTokenAddyByKey } from "../utils/tokenHelpers";
import { toDecimals } from "../utils/formatBalance";
import { useAccount, useChainId } from "wagmi";

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

export const useBalance = (token: IToken) => {
  const { address } = useAccount();
  const chainId = useChainId();
  const [balance, setBalance] = useState(new BigNumber("0"));
  const addr = token.address[chainId];
  const tokenContract = useERC20(addr);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address) return;
        const res = await tokenContract.balanceOf(address);
        setBalance(new BigNumber(res.toString()));
      } catch (e) {
        setBalance(new BigNumber("0"));
      }
    };
    fetch();
  }, [address, fastRefresh, tokenContract, addr]);

  return balance;
};

export const useComputeFees = (
  amount: string,
  bridgeAddress: string,
  token: IToken
) => {
  const [fees, setFees] = useState(new BigNumber("0"));
  const bridgeContract = useBridgeContract(bridgeAddress);
  const { fastRefresh } = useRefresh();
  const { address } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!address || !amount) return;

        const val = toDecimals(amount, token.decimals);
        const res = await bridgeContract.computeFee(
          val.toFixed(),
          token.address[chainId]
        );
        setFees(new BigNumber(res.toString()));
      } catch (e) {
        console.log(e);
        setFees(new BigNumber("0"));
      }
    };
    fetch();
  }, [fastRefresh, amount, bridgeContract, address, token, chainId]);

  return fees;
};

export const useSupplyInVault = (tokenKey: string, toChain: INetwork) => {
  const [balance, setBalance] = useState(new BigNumber("0"));
  const { fastRefresh } = useRefresh();
  const provider = new Web3(toChain.rpc);
  const tokenAddy = getTokenAddyByKey(tokenKey, toChain.chainId);
  const contract: any = new provider.eth.Contract(erc20, tokenAddy);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (tokenAddy === ADDRESS_ZERO) return balance;
        const res = await contract.methods
          .balanceOf(toChain.bridgeAddress)
          .call();
        setBalance(new BigNumber(res.toString()));
      } catch (e) {
        console.log(e);
        setBalance(new BigNumber("0"));
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [toChain, tokenAddy, fastRefresh]);

  return balance;
};

export const useMintable = (token: IToken, addy: string) => {
  const [mintable, setMintable] = useState(false);
  const { fastRefresh } = useRefresh();
  const bridgeContract = useBridgeContract(addy);
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
