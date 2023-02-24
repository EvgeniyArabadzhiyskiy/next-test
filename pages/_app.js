import GlobalLayout from "@/components/GlobalLayout";
// import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/globalStyles";
// import './_app.css'
import AbortController from "abort-controller";
import { Provider } from "react-redux";

globalThis.AbortController = AbortController;
// import { wrapper } from "@/redux/store";     // НЕ РАБОТАЕТ С ТАКИМ IMPORT
const { wrapper } = require("../redux/store"); //  ТОЛЬКО ТАКОЙ IMPORT И ТОЛЬКО  после AbortController

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  // const Layout = Component.Layout || (({ children }) => <>{children}</>)

  // return (
  //   <Provider store={store}>
  //     {/* <GlobalLayout> */}
  //     <Layout>
  //       <Component {...props.pageProps} />
  //     </Layout>
  //     {/* </GlobalLayout> */}
  //   </Provider>
  // );

  
  const getLayout = Component.getLayout || ((page) => page);
  
   return (
    <Provider store={store}>
      <GlobalLayout>
        { getLayout(<Component {...props.pageProps} />) }
      </GlobalLayout>
      <GlobalStyles />
    </Provider>
  );

  // return (
  //   <Provider store={store}>
  //     <div style={{height:"100px", background: "teal"}} >HEADER</div>
  //     <Component {...props.pageProps} />
  //     <div style={{height:"100px", background: "teal"}} >FOOTER</div>
  //   </Provider>
  // );
};

export default App;

// const EmptyLayout = ({ children }) => <>{children}</>;

// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
// export default wrapper.withRedux(App);
