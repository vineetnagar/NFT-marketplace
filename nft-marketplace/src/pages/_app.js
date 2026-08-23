import "@/styles/globals.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { NFTMarketplaceProvider } from "../../Context/NFTMarketplaceContext";

const App = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />;
      <Footer />
    </NFTMarketplaceProvider>
  </div>
);

export default App;
