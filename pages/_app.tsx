import "../styles/globals.css";
import Leiout from "../components/Leiout";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Leiout>
      <Component {...pageProps} />;
    </Leiout>
  );
}

export default MyApp;
