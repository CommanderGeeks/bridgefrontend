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
import { getChainTokens } from "../../utils/tokenHelpers";
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

  const maxTxVal = fromDecimals(maxTx, originToken.decimals);
  const minTxVal = fromDecimals(minTx, originToken.decimals);
  const balanceVal = fromDecimals(balance, originToken.decimals);

  useEffect(() => {
    const err = amount.gt(balance)
      ? "Insufficient balance"
      : !isValidEvmAddress(receiver)
      ? "Invalid receiver address, please check"
      : amount.lt(minTxVal)
      ? "Amount too small"
      : amount.gt(maxTxVal)
      ? "Amount is beyond limit"
      : "";

    setError(err);
  }, [
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
        <SolanaChain fromChain={fromChain} />

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
          fromChain={fromChain}
          toChain={toChain}
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

        <DynamicButtonSol
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
        {/* <DepositButtonSol
          trxInProgress={trxInProgress}
          setTrxInProgress={setTrxInProgress}
          amount={amount}
          receiver={receiver}
          originToken={originToken}
          toChain={toChain}
          setTxHash={setTxHash}
          error={error}
          setError={setError}
        /> */}

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

export default SolanaPortal;
