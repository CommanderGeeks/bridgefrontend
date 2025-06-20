import React, { ReactNode } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { NETWORK } from "../../config/solana";

import("@solana/wallet-adapter-react-ui");
require("@solana/wallet-adapter-react-ui/styles.css");

export function SolanaProvider({ children }: { children: ReactNode }) {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={NETWORK}>
      <WalletProvider wallets={wallets} autoConnect>
        <>{children}</>
      </WalletProvider>
    </ConnectionProvider>
  );
}
