import { useEffect, useMemo } from "react";
import { INetwork, IToken } from "../../config/types";
import ListChains from "../ListChains";
import { chainIds } from "../../config";

interface IProps {
  fromChain: INetwork;
  toChain: INetwork;
  tokenKey: string;
  token: IToken;
  setToChainId: (e: any) => void;
}

function DestinationChain({ fromChain, toChain, token, setToChainId }: IProps) {
  const chainList = useMemo(() => {
    const diffChainId = chainIds.filter((id) => id !== fromChain.chainId) || [
      0,
    ];
    const chains: number[] = [];

    try {
      for (let i = 0; i < diffChainId.length; i++) {
        const chainId: number = diffChainId[i];
        if (token.address[chainId] && fromChain.chainId !== chainId) {
          chains.push(chainId);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return chains;
  }, [token, fromChain]);

  useEffect(() => {
    const id =
      fromChain.chainId === toChain.chainId ? chainList[0] : toChain.chainId;
    const checkId = chainList.find((l) => l === id) ? id : chainList[0];

    if (toChain.chainId !== checkId) {
      setToChainId(checkId);
    }
    //eslint-disable-next-line
  }, [fromChain, toChain, chainList]);

  return (
    <div className="w-full">
      <ListChains
        chainList={chainList}
        chain={toChain}
        toggleChain={(val) => setToChainId(val)}
      />
    </div>
  );
}

export default DestinationChain;
