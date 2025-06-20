import BigNumber from "bignumber.js";
import { INetwork, IToken } from "../../config/types";
import Button from "../Button";
import { useCallback } from "react";
import { useSolDepositTokens } from "../../hooks/solana/useSolDeposit";

interface IProps {
  setTrxInProgress: (val: boolean) => void;
  setError: (val: string) => void;
  setTxHash: (val: string) => void;
  amount: BigNumber;
  receiver: string;
  trxInProgress: boolean;
  error: string;
  originToken: IToken;
  toChain: INetwork;
}

function DepositButtonSol(prop: IProps) {
  const {
    setTrxInProgress,
    amount,
    receiver,
    originToken,
    toChain,
    setError,
    trxInProgress,
    error,
    setTxHash,
  } = prop;

  const { onDeposit } = useSolDepositTokens(
    amount.toString(),
    receiver,
    originToken,
    toChain.chainId
  );

  const callDeposit = useCallback(async () => {
    try {
      if (trxInProgress || error) return;
      setTrxInProgress(true);
      const res: any = await onDeposit();
      if (res.error) {
        setError(res.error);
        setTimeout(() => {
          setError("");
        }, 1500);
      }
      setTrxInProgress(false);

      if (res.txHash) setTxHash(res.txHash);
    } catch (error) {
      console.error({ error });
      setTrxInProgress(false);
    }
  }, [error, trxInProgress, setTrxInProgress, onDeposit, setError, setTxHash]);

  return <Button onClick={callDeposit}>Bridge To {toChain.name.toString()} </Button>;
}

export default DepositButtonSol;
