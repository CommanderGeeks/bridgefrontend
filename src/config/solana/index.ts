import { Connection } from "@solana/web3.js";
import { AnchorProvider, Program, Provider } from "@coral-xyz/anchor";
import { IDL, Portal } from "../../config/solana/idl";
import { PublicKey } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
export const PROGRAM_ID = new PublicKey("qLbS4ESAAgJPUVFn6Jiu7HGEPEPT7ZrxPLu9DLJsGoE");
export const NETWORK = "https://wandering-chaotic-mountain.solana-mainnet.quiknode.pro/6b231d609d55dfb71fa84b7494aa05a36138ec43";
export const CONFIG_ACCOUNT = new PublicKey("6497k38egVaN189EhAWcL3v8deBNWa7zWowwv9t1V7R7")
export const FEE_RECEIVER = new PublicKey("C6DuM7pcwodHEwp3T3w4NTJ6NNbXDaLyhuRh3zAWecy1");


export const connection = new Connection(NETWORK, "confirmed");

export const getSolProvider = (wallet: WalletContextState) => new AnchorProvider(connection, wallet as any, { preflightCommitment: "confirmed" });

// Load Anchor program 
export const getSolProgram = (provider: Provider) => new Program({ ...IDL, address: PROGRAM_ID.toBase58() } as Portal, provider);
