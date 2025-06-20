import WalletConnect from "../../components/WalletConnect";
import { SolanaConnect } from "../../components/solana/solconnect-button";

function NavBar({ bridgeFrom }: any) {
  return (
    <nav className="bg-dark  px-2 sm:px-4 py-4 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center ">
          <img width="50px" src="/logo.jpg" alt="Wizard bridge logo" />
        </a>
        <div className="flex">
          {/* <div className='mx-10 py-1'>
          <a href="https://wizardswap.org" className="flex items-center border-2 p-1 px-3 rounded-lg	">
            <img src="/wizswap-logo.png" alt="Wizard Swap" className='w-7 mr-2' />
            Wizard Swap
          </a>
        </div> */}
          {/* <div className="mx-10 py-1">
            <a
              href="/transactions"
              className="flex items-center border p-1 px-3 rounded-lg	"
            >
              <ClockIcon className="h-5 w-5" aria-hidden="true" />
              Transactions
            </a>
          </div> */}
          <div className="mx-10 py-1">
            <a
              href="#!"
              className="flex items-center border p-1 px-3 rounded-lg	"
            >
          {bridgeFrom} 
            </a>
          </div> 

          {bridgeFrom === "solana" ? (
            <div>
              <SolanaConnect />
            </div>
          ) : (
            <div>
              <WalletConnect />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
