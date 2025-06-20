import WalletConnect from './WalletConnect';

function TopBar() {
  return (
    <nav className="bg-dark shadow-md px-2 sm:px-4 py-4 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center ">
         <img src="/logo.jpg" alt="Wiz bridge" />
        </a>

        <div>
          <WalletConnect />
        </div>
      </div>
    </nav>
  )
}

export default TopBar;
