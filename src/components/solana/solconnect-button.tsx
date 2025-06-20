import { FC } from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaConnect: FC = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
    </WalletModalProvider>
  );
};
