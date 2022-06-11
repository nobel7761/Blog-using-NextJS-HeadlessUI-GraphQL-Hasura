import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import NavMenu from "../components/NavMenu/NavMenu";
import Layout from "./../components/Layout/Layout";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
