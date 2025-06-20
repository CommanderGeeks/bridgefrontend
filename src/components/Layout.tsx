import WalletConnect from "./WalletConnect";

function Layout({ children }: any) {
    return (
        <>
            <div className="min-h-screen">
                <nav className="bg-dark shadow-md px-2 sm:px-4 py-4 rounded">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <a href="/" className="flex items-center ">
                            <img src="/logo.png" alt="Wiz bridge" />
                        </a>

                        <div>
                            <WalletConnect />
                        </div>
                    </div>
                </nav>

                {children}
            </div>
        </>
    )
}

export default Layout;
