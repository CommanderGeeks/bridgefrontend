import React, { useState } from "react";
import { chainIds } from "../config";

const intialState = {
  address: "",
  setAddress: (val: any) => {},
  chainId: chainIds[0],
  setChainId: (val: number) => {},
  toChainId: chainIds[0],
  setToChainId: (val: number) => {},
  tokenKey: "",
  setTokenKey: (val: string) => {},
  error: "",
  setError: (val: string) => {},
  showError: false,
  setShowError: (val: boolean) => {},
  bridgeFrom: "solana",
  setBridgeFrom: (val: string) => {},
};

const StateContext = React.createContext(intialState);

const StateContextProvider = ({ children }: any) => {
  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<number>(chainIds[0]);
  const [toChainId, setToChainId] = useState<number>(chainIds[1]);
  const [tokenKey, setTokenKey] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [bridgeFrom, setBridgeFrom] = useState<string>("solana");

  const state = {
    address,
    setAddress,
    chainId,
    setChainId,
    toChainId,
    setToChainId,
    tokenKey,
    setTokenKey,
    error,
    setError,
    showError,
    setShowError,
    bridgeFrom,
    setBridgeFrom,
  };

  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateContextProvider };
