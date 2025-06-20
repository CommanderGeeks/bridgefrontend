import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import { CONFIG_ACCOUNT, connection, getSolProvider } from "../../config/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import { IToken } from "../../config/types";
import { decodeConfigAccount, RawConfig } from "../../utils/solana";
import useRefresh from "../useRefresh";
import { SOLANA_CHAIN_ID } from "../../config";

export const useBridgeConfig = () => {
  const [config, setConfig] = useState<RawConfig | null>(null);
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const accountInfo = await connection.getAccountInfo(CONFIG_ACCOUNT);
        
        if (!accountInfo || !accountInfo.data) {
          console.error("Config account not found");
          return;
        }

        const decodedConfig = decodeConfigAccount(accountInfo.data);
        setConfig(decodedConfig);
      } catch (error) {
        console.error("Error fetching bridge config:", error);
        setConfig(null);
      }
    };

    fetchConfig();
    // @ts-nocheck
  }, [fastRefresh]);

  return config;
};

export const useMintBalanceSol = (token: IToken) => {
  const wallet = useWallet();
  const provider = getSolProvider(wallet);
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      if (!provider || !wallet.publicKey) return;
      try {
        const tokenAccount = await provider.connection.getTokenAccountsByOwner(
          wallet.publicKey,
          { mint: new PublicKey(token.address[SOLANA_CHAIN_ID]) }
        );

        if (tokenAccount.value.length > 0) {
          const balanceInfo = await provider.connection.getTokenAccountBalance(
            tokenAccount.value[0].pubkey
          );
          setBalance(new BigNumber(balanceInfo.value.amount));
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(new BigNumber(0));
      }
    };

    fetchBalance();
    // eslint-disable-next-line
  }, [wallet, token]);

  return balance;
};

export const useComputeFeesSol = (
  amount: string,
  token: IToken
) => {
  const [fees, setFees] = useState(new BigNumber("0"));
  const config = useBridgeConfig();

  useEffect(() => {
    if (!amount || !config) return;
    const findToken = config.tokens.find((t) => t.mint.toString() === token.address[SOLANA_CHAIN_ID])
    if (!findToken) return

    const val = new BigNumber(amount);
    const feeRate = new BigNumber(findToken.fee.toString());
    const fee = val.times(feeRate).div(10000);

    setFees(fee);
  }, [token, amount, config]);

  return fees;
};

export const useMintableSol = (token: IToken) => {
  const [mintable, setMintable] = useState(false);
  const config = useBridgeConfig();

  useEffect(() => {
    if (!config) return;
    const tokenData = config.tokens.find(t => t.mint.toString() === token.address[SOLANA_CHAIN_ID]);
    if (!tokenData) return
    setMintable(tokenData.isOriginChain ? false : true);
  }, [config, token.address]);

  return mintable;
};

export const useMinTxSol = (token: IToken) => {
  const [minTx, setMinTx] = useState(new BigNumber("0"));
  const config = useBridgeConfig();

  useEffect(() => {
    if (!config) return;
    const tokenData = config.tokens.find(t => t.mint.toString() === token.address[SOLANA_CHAIN_ID]);
    setMinTx(tokenData ? new BigNumber(tokenData.minTx.toString()) : new BigNumber("0"));
  }, [config, token.address]);

  return minTx;
};

export const useMaxTxSol = (token: IToken) => {
  const [maxTx, setMaxTx] = useState(new BigNumber("0"));
  const config = useBridgeConfig();

  useEffect(() => {
    if (!config) return;
    const tokenData = config.tokens.find(t => t.mint.toString() === token.address[SOLANA_CHAIN_ID]);
    setMaxTx(tokenData ? new BigNumber(tokenData.maxTx.toString()) : new BigNumber("0"));
  }, [config, token.address]);

  return maxTx;
};