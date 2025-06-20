import { useContext, useEffect } from "react";
import { StateContext } from "../../context/state";
import EvmPortal from "./EvmPortal";
import SolanaPortal from "./SolanaPortal";
import { getChainTokens } from "../../utils/tokenHelpers";

function MainPortal() {
  const { bridgeFrom, chainId, setTokenKey } = useContext(StateContext);

  useEffect(() => {
    const tokenKey = getChainTokens(chainId)[0]?.key;
    if (tokenKey) setTokenKey(tokenKey);
    // eslint-disable-next-line
  }, [chainId]);

  return <>{bridgeFrom === "evm" ? <EvmPortal /> : <SolanaPortal />}</>;
}

export default MainPortal;