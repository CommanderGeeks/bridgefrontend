import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SolanaProvider } from "../components/solana/solana-provider";
import { chains, chainImages } from "./chains";

const queryClient = new QueryClient();

const projectId = "bc551a2524225f8b49b759c77e3fa518";

const metadata = {
  name: "WizBridge",
  description: "CrossChain Assets Transfer",
  url: "https://wizbridge.com", // origin must match your domain & subdomain
  icons: [
    "https://wizbridge.org/logo192.png",
    "https://wizbridge.org/logo512.png",
  ],
};

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default,
  themeVariables: {
    "--w3m-accent": "#57534e",
  }, 
  chainImages,
});

export function Web3ModalProvider({ children }: any) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SolanaProvider>{children}</SolanaProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
