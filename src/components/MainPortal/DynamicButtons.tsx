// src/components/MainPortal/DynamicButtons.tsx
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { INetwork, IToken } from "../../config/types";
import Button from "../Button";
import { useCallback, useMemo } from "react";
import { chainIds } from "../../config";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import BigNumber from "bignumber.js";
import { useAllowance } from "../../hooks/useCalls";
import { fromDecimals } from "../../utils/formatBalance";
import { useApprove } from "../../hooks/useApprove";
import DepositButton from "./DepositButton";
import { getTokenDecimalsFromToken } from "../../utils/tokenHelpers";

interface IProps {
  fromChain: INetwork;
  toChain: INetwork;
  trxInProgress: boolean;
  receiver: string;
  originToken: IToken;
  amount: BigNumber;
  setTrxInProgress: (val: boolean) => void;
  setTxHash: (val: string) => void;
  error: string;
  setError: (val: string) => void;
}

function DynamicButton({
  fromChain,
  toChain,
  trxInProgress,
  originToken,
  amount,
  receiver,
  setTrxInProgress,
  setTxHash,
  error,
  setError,
}: IProps) {
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const { address } = useAccount();
  const { open } = useWeb3Modal();

  const allowance = useAllowance(originToken, fromChain.bridgeAddress);
  
  // Use per-chain decimals for allowance calculation
  const tokenDecimals = getTokenDecimalsFromToken(originToken, fromChain.chainId);
  const allowanceVal = fromDecimals(allowance, tokenDecimals);

  const { onApproveBridge } = useApprove(
    amount.toNumber(),
    originToken,
    fromChain.bridgeAddress
  );

  const networkSupported = useMemo(
    () => chainIds.find((c) => c === chainId),
    [chainId]
  );

  const callApprove = useCallback(async () => {
    try {
      if (trxInProgress || error) return;
      setTrxInProgress(true);
      await onApproveBridge();
      setTrxInProgress(false);
    } catch (error) {
      console.error(error);
      setTrxInProgress(false);
    }
  }, [trxInProgress, error, setTrxInProgress, onApproveBridge]);

  if (!address) return <Button onClick={() => open()}>Connect Wallet</Button>;
  else if (!networkSupported)
    return (
      <Button onClick={() => switchChain({ chainId: chainIds[0] })}>
        Switch Network
      </Button>
    );
  else if (trxInProgress)
    return <Button onClick={() => {}}> Processing Txn... </Button>;
  else if (allowanceVal.lte(0) || amount.gt(allowanceVal))
    return <Button onClick={callApprove}> Approve {originToken.name.toString()} </Button>;
  else
    return (
      <DepositButton
        trxInProgress={trxInProgress}
        setTrxInProgress={setTrxInProgress}
        amount={amount}
        receiver={receiver}
        originToken={originToken}
        fromChain={fromChain}
        toChain={toChain}
        setTxHash={setTxHash}
        error={error}
        setError={setError}
      />
    );
}

export default DynamicButton;