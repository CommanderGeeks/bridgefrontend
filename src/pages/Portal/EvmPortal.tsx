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
import { getChainTokens } from "../../utils/tokenHelpers";
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
  const maxTx = useMaxTx(originToken, fromChain.bridgeAddress);
  const minTx = useMinTx(originToken, fromChain.bridgeAddress);
  const balance = useBalance(originToken);
  const feesAmount = useComputeFees(
    amount.toString(),
    fromChain.bridgeAddress,
    originToken
  );

  const maxTxVal = fromDecimals(maxTx, originToken.decimals);
  const minTxVal = fromDecimals(minTx, originToken.decimals);
  const balanceVal = fromDecimals(balance, originToken.decimals);
  const feesVal = fromDecimals(feesAmount, originToken.decimals);
  const addressError = useMemo(() => {
    let err = null;
    if (toChain.chainId === SOLANA_CHAIN_ID) {
      if (!isValidSolanaAddress(receiver)) err = "Invalid sol receiver address";
    } else {
      if (!isValidEvmAddress(receiver)) err = "Invalid receiver address";
    }

    return err;
  }, [receiver, toChain]);

  useEffect(() => {
    const err = amount.gt(balance)
      ? "Insufficient balance"
      : addressError
      ? addressError
      : amount.lt(minTxVal)
      ? "Amount too small"
      : amount.gt(maxTxVal)
      ? "Amount is beyond limit"
      : "";

    setError(err);
  }, [
    addressError,
    error,
    amount,
    balance,
    receiver,
    minTxVal,
    maxTxVal,
    mintable,
    setError,
  ]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between my-2 mt-0">
        <OriginChain fromChain={fromChain} />

        <div className="mt-4">
          <div className="">
            Balance: {formatNumber(balanceVal)}
            <button
              onClick={() => setAmount(balanceVal)}
              className="text-white pl-3"
            >
              {" "}
              Max
            </button>
          </div>
          <div className="flex">
            <div className="relative w-[60%] mr-2">
              <Input
                onFocus={() => setShowError(false)}
                onBlur={() => setShowError(true)}
                type="number"
                onChange={(e: any) => {
                  setAmount(new BigNumber(e.target.value));
                }}
                value={amount.toString()}
                placeholder="0.00"
              />
            </div>
            <div className="w-[40%]">
              <ListAssets chainId={fromChain.chainId} token={originToken} />
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
          <div className="">Payout address</div>
          <Input
            onChange={(e: any) => {
              setReceiver(e.target.value);
            }}
            value={receiver}
            type="text"
          />
        </div>
      </div>

      <div className="mt-8 ">
        <div className="w-full">Destination Chain</div>

        <DestinationChain
          toChain={toChain}
          fromChain={fromChain}
          tokenKey={tokenKey}
          token={originToken}
          setToChainId={setToChainId}
        />

        <div className="mt-4">
          <div className="">Receiving</div>
          <div className="flex">
            <div className="relative w-[70%] mr-2">
              <input
                value={formatNumber(amount.minus(feesVal))}
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
                <img
                  src={`/assets/${destToken.symbol.toLowerCase()}.png`}
                  alt="asset"
                  className="h-5 w-5 rounded-full "
                />
                <div className=" ml-2 mr-10 text-sm font-bold text-gray-400 bg-dark focus:ring-0">
                  {destToken.symbol}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-8xl mx-auto mb-auto">
        <div className="mt-6 p-4 rounded-md border border-gray-500 text-[14px] font-semibold">
          <div className="flex justify-between">
            <div>Fees:</div>
            <div>
              {formatNumber(feesVal)} {originToken.symbol}{" "}
            </div>
          </div>

          <div className="flex justify-between">
            <div>Estimated time:</div>
            <div>~3mins </div>
          </div>

          <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

          <div className="flex justify-between">
            <div> Min bridge amount: </div>
            <div>
              {formatNumber(minTxVal)} {originToken.symbol}
            </div>
          </div>

          <div className="flex justify-between">
            <div>Max bridge amount</div>
            <div>
              {formatNumber(maxTxVal)} {originToken.symbol}{" "}
            </div>
          </div>
        </div>

        <DynamicButton
          fromChain={fromChain}
          toChain={toChain}
          trxInProgress={trxInProgress}
          originToken={originToken}
          amount={amount}
          receiver={receiver}
          setTrxInProgress={setTrxInProgress}
          setError={setError}
          setTxHash={setTxHash}
          error={error}
        />

        {txHash && (
          <AlertBox>
            Tokens have been deposited please wait for confirmation.
            <a
              href={fromChain.explorer + "/tx/" + txHash}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View tx
            </a>
          </AlertBox>
        )}
      </div>
    </>
  );
}

export default EvmPortal;
