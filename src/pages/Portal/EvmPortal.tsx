// src/pages/Portal/EvmPortal.tsx
import { useContext, useEffect, useMemo, useState } from "react";
import ListAssets from "../../components/ListAssets";
import { chainIds, SOLANA_CHAIN_ID } from "../../config";
import { StateContext } from "../../context/state";
import {
  useBalance,
  useComputeFees,
  useMaxTx,
  useMinTx,
  useMintable,
} from "../../hooks/useCalls";
import { formatNumber, fromDecimals } from "../../utils/formatBalance";
import { useChainId } from "wagmi";
import { INetwork, IToken } from "../../config/types";
import supportedChains from "../../config/chains";
import OriginChain from "../../components/MainPortal/OriginChain";
import DynamicButton from "../../components/MainPortal/DynamicButtons";
import BigNumber from "bignumber.js";
import AlertBox from "../../components/MainPortal/AlertBox";
import Input from "../../components/Input";
import DestinationChain from "../../components/MainPortal/DestinationChain";
import tokens from "../../config/tokens";
import { getChainTokens, getTokenDecimalsFromToken } from "../../utils/tokenHelpers";
import {
  isValidEvmAddress,
  isValidSolanaAddress,
} from "../../utils/validateAddress";

function EvmPortal() {
  const { tokenKey, toChainId, setToChainId, setError, error, setShowError } =
    useContext(StateContext);
  const chainId = useChainId();
  const fromChain: INetwork = useMemo(
    () => supportedChains[chainId] || supportedChains[chainIds[0]],
    [chainId]
  );
  const toChain: INetwork = useMemo(() => {
    return supportedChains[toChainId];
  }, [toChainId]);

  const originToken: IToken = useMemo(() => {
    const chainTokens = getChainTokens(fromChain.chainId);
    if (!tokenKey) return chainTokens[0];
    return chainTokens.find((t: any) => t.key === tokenKey) || chainTokens[0];
  }, [tokenKey, fromChain]);
  
  const destToken: IToken = useMemo(() => {
    return tokens.find((t: any) => t.key === tokenKey) || originToken;
  }, [tokenKey, originToken]);

  const [amount, setAmount] = useState(new BigNumber("0"));
  const [receiver, setReceiver] = useState("");
  const [trxInProgress, setTrxInProgress] = useState(false);
  const [txHash, setTxHash] = useState("");

  const mintable = useMintable(originToken, fromChain.bridgeAddress);
  const minTx = useMinTx(originToken, fromChain.bridgeAddress);
  const maxTx = useMaxTx(originToken, fromChain.bridgeAddress);
  const balance = useBalance(originToken, fromChain.bridgeAddress);
  const feesVal = useComputeFees(amount.toString(), originToken, fromChain.bridgeAddress);

  // Use per-chain decimals for calculations
  const originTokenDecimals = getTokenDecimalsFromToken(originToken, fromChain.chainId);
  const destTokenDecimals = getTokenDecimalsFromToken(destToken, toChain.chainId);
  
  const maxTxVal = fromDecimals(maxTx, originTokenDecimals);
  const minTxVal = fromDecimals(minTx, originTokenDecimals);
  const balanceVal = fromDecimals(balance, originTokenDecimals);

  useEffect(() => {
    const err = amount.gt(balanceVal)
      ? "Insufficient balance"
      : toChain.chainId === SOLANA_CHAIN_ID
      ? !isValidSolanaAddress(receiver)
        ? "Invalid receiver address, please check"
        : ""
      : !isValidEvmAddress(receiver)
      ? "Invalid receiver address, please check"
      : amount.lt(minTxVal)
      ? "Amount too small"
      : amount.gt(maxTxVal)
      ? "Amount too large"
      : "";

    setError(err);
    setShowError(!!err);
  }, [
    amount,
    balanceVal,
    receiver,
    minTxVal,
    maxTxVal,
    toChain.chainId,
    setError,
    setShowError,
  ]);

  return (
    <div className="bg-black-100 border border-zinc-800 w-full md:w-[450px] p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-white">Bridge Tokens</h1>
      </div>

      <div className="mt-4 ">
        <div className="w-full text-white">Origin Chain</div>
        <OriginChain fromChain={fromChain} tokenKey={tokenKey} />

        <div className="mt-4">
          <div className="text-white">Amount</div>
          <div className="flex">
            <div className="relative w-[70%] mr-2">
              <Input
                balance={balanceVal}
                amount={amount}
                setAmount={setAmount}
                decimals={originTokenDecimals} // Use origin chain decimals
                type="number"
              />
            </div>
            <div className="w-[30%] relative bg-dark text-center px-4 pl-3 py-[10px] rounded-lg shadow-md sm:text-sm">
              <ListAssets token={originToken} chainId={fromChain.chainId} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-white">Receiver Address</div>
          <input
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="py-3 px-4 w-full shadow-lg rounded-lg bg-dark border-0 text-white font-medium sm:text-sm"
            placeholder="Enter receiver address"
            type="text"
          />
        </div>
      </div>

      <div className="mt-8 ">
        <div className="w-full text-white">Destination Chain</div>

        <DestinationChain
          toChain={toChain}
          fromChain={fromChain}
          tokenKey={tokenKey}
          token={originToken}
          setToChainId={setToChainId}
        />

        <div className="mt-4">
          <div className="text-white">Receiving</div>
          <div className="flex">
            <div className="relative w-[70%] mr-2">
              <input
                value={formatNumber(amount.minus(feesVal), 6)}
                type="text"
                disabled
                className="py-3 w-full shadow-lg rounded-lg bg-dark border-0 text-white font-medium sm:text-sm"
                placeholder="0.00"
              />
            </div>
            <div className="w-[30%] relative bg-dark text-center px-4 pl-3 py-[10px] rounded-lg shadow-md sm:text-sm">
              <button
                className="flex items-center w-full rounded-lg text-left  sm:text-sm"
                type="button"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {destToken.symbol.slice(0, 2).toUpperCase()}
                </div>
                <div className=" ml-2 mr-10 text-sm font-bold text-gray-400 bg-dark focus:ring-0">
                  {destToken.symbol}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <DynamicButton
          amount={amount}
          originToken={originToken}
          fromChain={fromChain}
          toChain={toChain}
          receiver={receiver}
          trxInProgress={trxInProgress}
          setTrxInProgress={setTrxInProgress}
          setTxHash={setTxHash}
          error={error}
          setError={setError}
        />
      </div>

      <div className="mt-4">
        <AlertBox />
      </div>
    </div>
  );
}

export default EvmPortal;