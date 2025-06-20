import { ethers } from "ethers";
import { useEffect, useState } from "react";
import OriginBridge from "../config/abi/WizPortal.json";
import erc20 from "../config/abi/erc20.json";

export const useSigner = () => {
  //@ts-expect-error Window.ethers not TS
  if (!window.ethereum) return undefined;

  //@ts-expect-error Window.ethers not TS
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.getSigner();
}

export const useContract = (address: string, abi: any) => {
  const signer = useSigner();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    try {
      setContract(new ethers.Contract(address, abi, signer));
    } catch (error) {
      
    }
    // eslint-disable-next-line
  }, [address, abi]);

  return contract;
};

export const useERC20 = (address: string) => {
  return useContract(address, erc20)
}

export const useBridgeContract = (bridgeAddress: string) => {
  return useContract(bridgeAddress, OriginBridge)
}
