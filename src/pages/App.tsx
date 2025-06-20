import MainPortal from "./Portal/MainPortal";
import Footer from "../components/Footer";
import Layout from "./Layout";
import { useEffect } from "react";
import { clearOldVersionCache } from "../utils/clearCache";
import { Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    clearOldVersionCache();
  }, []);

  return (
    <span>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPortal />} />
          <Route path="/transactions" element={<MainPortal />} />
          <Route path="/gasstation" element={<MainPortal />} />
        </Routes>
      </Layout>
      <Footer />
    </span>
  );
}

export default App;
