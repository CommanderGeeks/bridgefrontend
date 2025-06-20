import React from "react";
import ReactDOM from "react-dom/client";
import { StateContextProvider } from "./context/state";
import { RefreshContextProvider } from "./context/RefreshContext";
import './index.css';
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { Web3ModalProvider } from "./provider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Web3ModalProvider>
      <StateContextProvider>
        <RefreshContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RefreshContextProvider>
      </StateContextProvider>
    </Web3ModalProvider>
  </React.StrictMode>
);

reportWebVitals();
