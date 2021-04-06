import { PokeProvider } from "../lib/appContext";
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <PokeProvider>
      <Component {...pageProps} />
    </PokeProvider>
  );
};

export default App;
