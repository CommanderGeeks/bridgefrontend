import { INetwork } from "../../config/types";
import ListChains from "../ListChains";
import { useMemo } from "react";

interface IProps {
  fromChain: INetwork;
}

function SolanaChain({ fromChain }: IProps) {
  const chainList = useMemo(() => [20001], []);

  return (
    <div className="w-full">
      <ListChains
        chainList={chainList}
        chain={fromChain}
        toggleChain={(val) => {}}
      />
    </div>
  );
}

export default SolanaChain;
