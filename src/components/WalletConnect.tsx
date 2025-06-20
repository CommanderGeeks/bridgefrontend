function WalletConnect() {
  return (
    <div className="z-20 pt-4 md:pt-0">
      <div className="flex items-center ">
        <div>
          <w3m-network-button />
        </div>
        <div className="pl-4">
          <w3m-button />
        </div>
      </div>
    </div>
  );
}

export default WalletConnect;
