import "@/styles/globals.css";
import NavBar from "../../components/NavBar/NavBar";

const App = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />;
  </div>
);

export default App;
