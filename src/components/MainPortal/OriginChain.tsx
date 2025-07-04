// src/components/MainPortal/OriginChain.tsx
import { useSwitchChain } from "wagmi";
import { INetwork } from "../../config/types";
import ListChains from "../ListChains";
import { chainIds } from "../../config";
import { useMemo } from "react";

interface IProps {
  fromChain: INetwork;
  tokenKey?: string; // Add optional tokenKey prop
}

function OriginChain({ fromChain, tokenKey }: IProps) {
  const { switchChain } = useSwitchChain();

  const chainList = useMemo(() => {
    const chains: number[] = [];

    try {
      for (let i = 0; i < chainIds.length; i++) {
        const chainId = chainIds[i];
        if (chainId === 20001) continue;

        chains.push(chainId);
      }
    } catch (error) {
      console.log(error);
    }
    return chains;
  }, []);

  return (
    <div className="w-full">
      <ListChains
        chainList={chainList}
        chain={fromChain}
        toggleChain={(val) => switchChain({ chainId: val })}
        tokenKey={tokenKey}
      />
    </div>
  );
}

export default OriginChain;