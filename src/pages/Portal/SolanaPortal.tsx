// src/pages/Portal/SolanaPortal.tsx
import { useContext, useEffect, useMemo, useState } from "react";
import ListAssets from "../../components/ListAssets";
import { StateContext } from "../../context/state";
import { formatNumber, fromDecimals } from "../../utils/formatBalance";
import { INetwork, IToken } from "../../config/types";
import supportedChains from "../../config/chains";
import BigNumber from "bignumber.js";
import AlertBox from "../../components/MainPortal/AlertBox";
import Input from "../../components/Input";
import DestinationChain from "../../components/MainPortal/DestinationChain";
import SolanaChain from "../../components/MainPortal/SolanaChain";
import {
  useComputeFeesSol,
  useMaxTxSol,
  useMintableSol,
  useMintBalanceSol,
  useMinTxSol,
} from "../../hooks/solana/useSolCalls";
import DynamicButtonSol from "../../components/MainPortal/DynamicButtonsSol";
import { getChainTokens, getTokenDecimalsFromToken } from "../../utils/tokenHelpers";
import { SOLANA_CHAIN_ID } from "../../config";
import { isValidEvmAddress } from "../../utils/validateAddress";

function SolanaPortal() {
  const { tokenKey, toChainId, setToChainId, setError, error, setShowError } =
    useContext(StateContext);

  const fromChain: INetwork = useMemo(() => supportedChains[20001], []);
  const toChain: INetwork = useMemo(
    () => supportedChains[toChainId],
    [toChainId]
  );

  const originToken: IToken = useMemo(() => {
    const chainTokens = getChainTokens(SOLANA_CHAIN_ID);
    if (!tokenKey) return chainTokens[0];
    return chainTokens.find((t: any) => t.key === tokenKey) || chainTokens[0];
  }, [tokenKey]);
  
  const destToken: IToken = useMemo(() => originToken, [originToken]);

  const [amount, setAmount] = useState(new BigNumber("0"));
  const [receiver, setReceiver] = useState("");
  const [trxInProgress, setTrxInProgress] = useState(false);
  const [txHash, setTxHash] = useState("");

  const mintable = useMintableSol(originToken);
  const minTx = useMinTxSol(originToken);
  const maxTx = useMaxTxSol(originToken);
  const balance = useMintBalanceSol(originToken);
  const feesVal = useComputeFeesSol(amount.toString(), originToken);

  // Use per-chain decimals for calculations
  const originTokenDecimals = getTokenDecimalsFromToken(originToken, SOLANA_CHAIN_ID);
  const destTokenDecimals = getTokenDecimalsFromToken(destToken, toChain.chainId);
  
  const maxTxVal = fromDecimals(maxTx, originTokenDecimals);
  const minTxVal = fromDecimals(minTx, originTokenDecimals);
  const balanceVal = fromDecimals(balance, originTokenDecimals);

  useEffect(() => {
    const err = amount.gt(balance)
      ? "Insufficient balance"
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
    balance,
    receiver,
    minTxVal,
    maxTxVal,
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
        <SolanaChain fromChain={fromChain} tokenKey={tokenKey} />

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
              <ListAssets token={originToken} chainId={SOLANA_CHAIN_ID} />
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
        <DynamicButtonSol
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

      {txHash && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
          <p className="text-green-400 text-sm">
            Transaction submitted: {txHash.slice(0, 20)}...
          </p>
        </div>
      )}
    </div>
  );
}

export default SolanaPortal;