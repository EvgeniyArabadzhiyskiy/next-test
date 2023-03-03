import GlobalLayout from "@/components/GlobalLayout";
// import "@/styles/globals.css";
import { GlobalStyles } from "@/styles/globalStyles";
// import './_app.css'
import AbortController from "abort-controller";
import { Provider } from "react-redux";

import App from "next/app";
import { incrementCounter, setInitialCounter } from "@/redux/counter/counter";
import { setInitialTransactions } from "@/redux/transactions-slice";

globalThis.AbortController = AbortController;
// import { wrapper } from "@/redux/store";     // НЕ РАБОТАЕТ С ТАКИМ IMPORT
const { wrapper } = require("../redux/store"); //  ТОЛЬКО ТАКОЙ IMPORT И ТОЛЬКО  после AbortController

const MyApp = ({ Component, ...rest }) => {
  
  // const { store, props } = wrapper.useWrappedStore(rest);
  const result = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={result.store}>
      <GlobalLayout>
        {getLayout(<Component {...result.props.pageProps} />)}
      </GlobalLayout>
      <GlobalStyles />
    </Provider>
  );
};

// MyApp.getInitialProps = wrapper.getInitialAppProps(
//   (store) => async (appCtx) => {
//     // console.log("appCtx:========================", appCtx.Component);

//     // const propData = appCtx.Component.getInitialProps
//     // ? await appCtx.Component.getInitialProps({...appCtx.ctx, store}) 
//     // : {}
//     // console.log("propData:", propData);
    
//     // store.dispatch(setInitialCounter(10));

//     // const ddd = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
//     // const data = await ddd.json()
//     // console.log("data:========================", data);

//     const childrenGip = await App.getInitialProps(appCtx);

//     return {
//       pageProps: {
//         ...childrenGip.pageProps,
//         id: 42,
//       },
//     };

    
//   }
// );

export default MyApp;

//=============================================================

// import "../styles/globals.css";
// import App from "next/app";
// import { wrapper } from "@/redux/store";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// MyApp.getInitialProps = wrapper.getInitialAppProps(
//   (store) => async (appCtx) => {
//     const childrenGip = await App.getInitialProps(appCtx);

//     return {
//       pageProps: {
//         ...childrenGip.pageProps,
//         id: 42,
//       },
//     };
//   }
// );

// export default wrapper.withRedux(MyApp);
