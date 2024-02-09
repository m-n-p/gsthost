import "@/styles/globals.css";
import "../components/Loader/loader.scss";
import "../components/MariaPlay/founders.scss";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}
