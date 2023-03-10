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

import { SessionProvider } from "next-auth/react";
// import "../styles/globals.css";
// import { wrapper } from "@/redux/store";
import GlobalLayout from "@/components/GlobalLayout";
import { GlobalStyles } from "@/styles/globalStyles";
import AbortController from "abort-controller";
import { setToken } from "@/redux/auth/authSlice";
import {
  getRunningQueriesThunk,
  userRefresh,
} from "@/redux/walletApiService/userApi";
import { parseCookies } from "nookies";
import PrivateRoute from "@/components/PrivateRoute";

globalThis.AbortController = AbortController;
const { wrapper } = require("../redux/store");

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  const protectedRoutes = ["/blog", '/pokemons'];

  return (
    <>
      <GlobalLayout>
        {getLayout(
          // <SessionProvider session={session}>
           // <PrivateRoute protectedRoutes={protectedRoutes}> 
            <Component {...pageProps} />
           // </PrivateRoute> 
          //  </SessionProvider>
        )}
      </GlobalLayout>
      <GlobalStyles />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appCtx) => {
    // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP", appCtx.ctx.pathname);

    // const res = appCtx.ctx.pathname
    // const isLoggedIn = store.getState().isLoggedIn;
    // if (!isLoggedIn) {
    //   res.writeHead(302, { Location: '/pokemons' });
    //   res.end();
    // }

    const { authToken } = parseCookies(appCtx.ctx);
    // console.log("authToken:", authToken);

    if (authToken) {
      store.dispatch(setToken(authToken));
    }

    // let userToken = null;

    // if (appCtx.ctx.req) {
    //   const authToken = appCtx.ctx.req?.cookies.authToken;
    //   // console.log("authToken&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&:", authToken);
    //   userToken = authToken;
    // }
    // else {
    //   const cookieValue = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("authToken="))
    //     ?.split("=")[1];
    //   console.log("cookieValue:", cookieValue);

    //   userToken = cookieValue;
    // }

    // store.dispatch(setToken(userToken || null));

    // console.log("hello world");

    if (authToken) {
      store.dispatch(userRefresh.initiate());
      const [result] = await Promise.all(
        store.dispatch(getRunningQueriesThunk())
      );
      // console.log("result>>>>>>>>>>>>>>>>", result);
    }

    // const state = store.getState();
    // console.log("state:", state.auth);

    const childrenGip = await App.getInitialProps(appCtx);

    return {
      pageProps: {
        ...childrenGip.pageProps,
        id: 42,
      },
    };
  }
);

export default wrapper.withRedux(MyApp);
