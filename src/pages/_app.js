import "../theme/style.css";
import "../styles/Loader.scss";
import theme from "../theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Header />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
