// import GlobalLayout from "@/components/GlobalLayout";
// // import "@/styles/globals.css";
// import { GlobalStyles } from "@/styles/globalStyles";
// // import './_app.css'
// import AbortController from "abort-controller";
// import { Provider } from "react-redux";

// globalThis.AbortController = AbortController;
// // import { wrapper } from "@/redux/store";     // НЕ РАБОТАЕТ С ТАКИМ IMPORT
// const { wrapper } = require("../redux/store"); //  ТОЛЬКО ТАКОЙ IMPORT И ТОЛЬКО  после AbortController

// const MyApp = ({ Component, ...rest }) => {

//   const { store, props } = wrapper.useWrappedStore(rest);

//   const getLayout = Component.getLayout || ((page) => page);

//   return (
//     <Provider store={store}>
//       <GlobalLayout>
//         {getLayout(<Component {...props.pageProps} />)}
//       </GlobalLayout>
//       <GlobalStyles />
//     </Provider>
//   );
// };

// export default MyApp;

//=============================================================

import App from "next/app";
// import "../styles/globals.css";
// import { wrapper } from "@/redux/store";
import GlobalLayout from "@/components/GlobalLayout";
import { GlobalStyles } from "@/styles/globalStyles";
import AbortController from "abort-controller";

globalThis.AbortController = AbortController;
const { wrapper } = require("../redux/store");

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
      <GlobalStyles />
    </>
  );
}

export default wrapper.withRedux(MyApp);

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
