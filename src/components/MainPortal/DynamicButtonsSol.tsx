import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { INetwork, IToken } from "../../config/types";
import Button from "../Button";
import { useMemo } from "react";
import { chainIds } from "../../config";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import BigNumber from "bignumber.js";
import DepositButtonSol from "./DepositButtonSol";

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

function DynamicButtonSol({
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

  const networkSupported = useMemo(
    () => chainIds.find((c) => c === chainId),
    [chainId]
  );

  if (!address) return <Button onClick={() => open()}>Connect Wallet</Button>;
  else if (!networkSupported)
    return (
      <Button onClick={() => switchChain({ chainId: chainIds[0] })}>
        Switch Network
      </Button>
    );
  else if (trxInProgress)
    return <Button onClick={() => {}}> Processing Txn... </Button>;
  else
    return (
      <DepositButtonSol
        trxInProgress={trxInProgress}
        setTrxInProgress={setTrxInProgress}
        amount={amount}
        receiver={receiver}
        originToken={originToken}
        toChain={toChain}
        setTxHash={setTxHash}
        error={error}
        setError={setError}
      />
    );
}

export default DynamicButtonSol;
