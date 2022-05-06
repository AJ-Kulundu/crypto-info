import "../theme/style.css";
import theme  from "../theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
