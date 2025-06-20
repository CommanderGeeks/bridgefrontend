import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

export interface RawTokenData {
    mint: PublicKey;
    minTx: bigint;
    maxTx: bigint;
    active: boolean;
    fee: bigint;
    isOriginChain: boolean;
}

export interface RawConfig {
    admin: PublicKey;
    feeTo: PublicKey;
    defaultFee: bigint;
    halt: boolean;
    supportedChains: bigint[];
    txHashes: string[];
    tokens: RawTokenData[];
}

// Constants for Fixed Array Sizes
const MAX_CHAINS = 10;
const MAX_HASHES = 10;
const MAX_TOKENS = 10;

/**
 * Function to decode the Config Account data
 */
export const decodeConfigAccount = (buffer: Buffer): RawConfig => {
    // skip offset 8 for anchor's reserved space
    let offset = 8;

    const admin = new PublicKey(buffer.slice(offset, offset + 32));
    offset += 32;

    const feeTo = new PublicKey(buffer.slice(offset, offset + 32));
    offset += 32;

    const defaultFee = buffer.readBigUInt64LE(offset);
    offset += 8;

    const halt = buffer.readUInt8(offset) === 1;
    offset += 1;

    const supportedChains: bigint[] = [];
    const chainCount = buffer.readUInt32LE(offset);
    offset += 4;

    if (chainCount > MAX_CHAINS) {
        throw new Error("Invalid chainCount value in Config account");
    }

    for (let i = 0; i < chainCount; i++) {
        supportedChains.push(buffer.readBigUInt64LE(offset));
        offset += 8;
    }

    const txHashes: string[] = [];
    const txHashCount = buffer.readUInt32LE(offset);
    offset += 4;

    if (txHashCount > MAX_HASHES) {
        throw new Error("Invalid txHashCount value in Config account");
    }

    for (let i = 0; i < txHashCount; i++) {
        const txHashLength = buffer.readUInt32LE(offset);
        offset += 4;

        const hashBuffer = buffer.slice(offset, offset + txHashLength);
        txHashes.push(hashBuffer.toString("utf-8"));
        offset += txHashLength;
    }

    const tokens: RawTokenData[] = [];
    const tokenCount = buffer.readUInt32LE(offset);
    offset += 4;

    if (tokenCount > MAX_TOKENS) {
        throw new Error("Invalid tokenCount value in Config account");
    }

    for (let i = 0; i < tokenCount; i++) {
        const mint = new PublicKey(buffer.slice(offset, offset + 32));
        offset += 32;

        const minTx = buffer.readBigUInt64LE(offset);
        offset += 8;

        const maxTx = buffer.readBigUInt64LE(offset);
        offset += 8;

        const active = buffer.readUInt8(offset) === 1;
        offset += 1;

        const fee = buffer.readBigUInt64LE(offset);
        offset += 8;

        const isOriginChain = buffer.readUInt8(offset) === 1;
        offset += 1;

        tokens.push({
            mint,
            minTx,
            maxTx,
            active,
            fee,
            isOriginChain,
        });
    }

    return {
        admin,
        feeTo,
        defaultFee,
        halt,
        supportedChains,
        txHashes,
        tokens
    };
};