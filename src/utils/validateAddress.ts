const WAValidator = require("multicoin-address-validator");

export const isValidSolanaAddress = (address: string): boolean => {
    try {
        return WAValidator.validate(address, "Solana")
    } catch (error) {
        return false;
    }
};

export const isValidEvmAddress = (address: string): boolean => {
    try {
        return WAValidator.validate(address, "Ethereum")
    } catch (error) {
        return false;
    }
};
