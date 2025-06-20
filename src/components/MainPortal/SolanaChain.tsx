// src/components/MainPortal/SolanaChain.tsx
import { INetwork } from "../../config/types";
import ListChains from "../ListChains";
import { useMemo } from "react";

interface IProps {
  fromChain: INetwork;
  tokenKey?: string; // Add optional tokenKey prop
}

function SolanaChain({ fromChain, tokenKey }: IProps) {
  const chainList = useMemo(() => [20001], []);

  return (
    <div className="w-full">
      <ListChains
        chainList={chainList}
        chain={fromChain}
        toggleChain={(val) => {}}
        tokenKey={tokenKey}
      />
    </div>
  );
}

export default SolanaChain;