import { AnchorProvider, Program } from '@coral-xyz/anchor';
import * as anchor from "@project-serum/anchor";
import { useCallback } from "react";
import { IToken } from "../../config/types";
import { toDecimals } from "../../utils/formatBalance";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { IDL, Portal } from "../../config/solana/idl";
import { FEE_RECEIVER, NETWORK, PROGRAM_ID } from '../../config/solana';
import { getOrCreateAssociatedTokenAccount } from '../../config/solana/token/getOrCreateAssociatedTokenAccount';
import { SOLANA_CHAIN_ID } from '../../config';

export const useSolDepositTokens = (
  amount: string,
  receiver: string,
  token: IToken,
  destChainId: Number
) => {
  const wallet = useWallet();

  const handleDeposit = useCallback(async () => {
    if (!wallet.publicKey || !wallet.signTransaction) {
      return;
    }

    try {
      const connection = new Connection(NETWORK, "confirmed");
      const walletPubKey = wallet.publicKey!
      const tokenMint = new PublicKey(token.address[SOLANA_CHAIN_ID])

      // Initialize Anchor provider
      const provider = new AnchorProvider(connection, wallet as any, { preflightCommitment: "confirmed" });
      anchor.setProvider(provider);

      // Load Anchor program
      const program = new Program({
        ...IDL,
        address: PROGRAM_ID.toBase58()
      } as Portal,
        provider
      );

      // Derive the PDA Vault Authority
      const [vaultAuthorityPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault_authority")],
        PROGRAM_ID
      );

      // Get depositor's associated token account
      const depositorTokenAccount = await getOrCreateAssociatedTokenAccount(connection, walletPubKey, tokenMint, walletPubKey, wallet.signTransaction!)
      const vaultTokenAccount = await getOrCreateAssociatedTokenAccount(connection, walletPubKey, tokenMint, vaultAuthorityPDA, wallet.signTransaction!, true)

      // Get fee receiver token account
      const feeToTokenAccount = await getOrCreateAssociatedTokenAccount(connection, walletPubKey, tokenMint, FEE_RECEIVER, wallet.signTransaction!, true);

      // Call the deposit function
      const tx = await program.methods
        .deposit(
          new anchor.BN(toDecimals(amount, token.decimals).toNumber()),
          new anchor.BN(destChainId),
          receiver
        )
        .accounts({
          depositor: walletPubKey,
          depositorTokenAccount: depositorTokenAccount.address,
          vaultTokenAccount: vaultTokenAccount.address,
          feeToTokenAccount: feeToTokenAccount.address,
          mint: tokenMint,
        })
        .rpc();

      return { txHash: tx };
    } catch (e: any) {
      console.log(e);
      // console.log(e.reason);
      return { error: e.reason };
    }
  }, [wallet, amount, receiver, destChainId, token]);
  return { onDeposit: handleDeposit };
}