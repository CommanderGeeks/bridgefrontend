import { useAccount } from "wagmi";
import { chainIds } from "../../config";
import NavBar from "./NavBar";
import { useContext } from "react";
import ErrorMessage from "../../components/MainPortal/ErrorMessage";
import { StateContext } from "../../context/state";
import Button from "../../components/Button";

function Layout({ children }: any) {
  const { chainId } = useAccount();
  const { error, setError, showError } = useContext(StateContext);

  const { bridgeFrom, setBridgeFrom } = useContext(StateContext);

  return (
    <div className="min-h-screen">
      <NavBar bridgeFrom={bridgeFrom} />

      {!chainIds.find((c) => c === chainId) && (
        <div className="bg-red-400 h-10 flex justify-center items-center font-medium text-center text-white text-lg ">
          Chain is not supported
        </div>
      )}

      <div className="flex flex justify-center items-center ">
        <div className="w-[250px] mr-2">
          <Button onClick={() => setBridgeFrom("solana")}>
            Bridge From Solana
          </Button>
        </div>
        <div className="w-[250px] ml-2">
          <Button onClick={() => setBridgeFrom("evm")}>Bridge From EVM</Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between md:max-w-[1550px] mx-auto">
        <div className="w-[80%] md:w-[400px] mx-auto">
          <div className="px-5 mt-10 py-10 max-w-md mx-auto rounded-lg bg-zinc-900 shadow-lg text-gray-400">
            {error && showError && (
              <ErrorMessage setError={setError}>{error}</ErrorMessage>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
