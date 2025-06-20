import BigNumber from "bignumber.js";

interface IProps {
  supplyVal: BigNumber;
  amount: BigNumber;
  mintable: boolean;
}

function VaultHealth({ supplyVal, amount, mintable }: IProps) {
  return (
    <span>
      {supplyVal.lt(amount) && !mintable && (
        <h1 className="text-red-400 text-center pb-8 underline">
          Vault Needs to refill!!
        </h1>
      )}
    </span>
  );
}

export default VaultHealth;
