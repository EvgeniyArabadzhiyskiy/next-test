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
  useUserRefreshQuery,
} from "@/redux/walletApiService/userApi";
import { parseCookies } from "nookies";
import PrivateRoute from "@/components/PrivateRoute";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCounter } from "@/redux/counter/counter";

globalThis.AbortController = AbortController;
const { wrapper } = require("../redux/store");

const protectedRoutes = [
    "/blog",
    "/pixabay",
    "/pokemons",
    // "/pokemons/raiting",
    "/pokemons/new/[name]",
  ];

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <GlobalLayout>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          {getLayout(<Component {...pageProps} />)}
        </PrivateRoute>
      </GlobalLayout>
      <GlobalStyles />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (appCtx) => {
    const { authToken } = parseCookies(appCtx.ctx);

    if (authToken) {
      store.dispatch(setToken(authToken));
      await store.dispatch(userRefresh.initiate());
    }

    const childrenGip = await App.getInitialProps(appCtx);

    return {
      pageProps: {
        ...childrenGip.pageProps,
      },
    };
  }
);

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   const getLayout = Component.getLayout || ((page) => page);

//   const protectedRoutes = [ "/pixabay", "/blog", "/pokemons", "/pokemons/proba", "/pokemons/new/[name]"];
//   // const protectedRoutes = [ "/blog", "/pokemons", ];

//   const dispatch = useDispatch();
//   const { isLoggedIn, token } = useSelector((state) => state.auth);
//   // console.log("MyApp  isLoggedIn:", isLoggedIn);
//   // console.log("APPPPPPPPPPPPPPPPPPPPPPPPPP");

//   // const { isError, isLoading } = useUserRefreshQuery(undefined, {
//   //   skip: !token,
//   // });

//   // useEffect(() => {
//   //   const { authToken } = parseCookies();

//   //   if (authToken) {
//   //     dispatch(setToken(authToken));
//   //   }

//   //   // const authToken = window.localStorage.getItem("authToken");
//   //   // dispatch(setToken(authToken));
//   // }, [dispatch]);

//   // if (isLoading) {
//   //   return <h1>Loading APP...</h1>;
//   // }

//   return (
//     <>
//       <GlobalLayout>
//         {getLayout(
//           // <SessionProvider session={session}>
//           // <PrivateRoute protectedRoutes={protectedRoutes}>
//             <Component {...pageProps} />
//           // </PrivateRoute>
//           //  </SessionProvider>
//         )}
//       </GlobalLayout>
//       <GlobalStyles />
//     </>
//   );
// }

// MyApp.getInitialProps = wrapper.getInitialAppProps(
//   (store) => async (appCtx) => {
//     // const req = appCtx.ctx.req

//     // const { authToken } = parseCookies(appCtx.ctx);
//     // if (authToken) {
//     //   store.dispatch(setToken(authToken));

//     //   store.dispatch(userRefresh.initiate());
//     //   const [result] = await Promise.all(
//     //     store.dispatch(getRunningQueriesThunk())
//     //   );
//     // }

//     // let userToken = null;

//     // if (appCtx.ctx.req) {
//     //   const authToken = appCtx.ctx.req?.cookies.authToken;
//     //   // console.log("authToken&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&:", authToken);
//     //   userToken = authToken;
//     // }
//     // else {
//     //   const cookieValue = document.cookie
//     //     .split("; ")
//     //     .find((row) => row.startsWith("authToken="))
//     //     ?.split("=")[1];
//     //   console.log("cookieValue:", cookieValue);

//     //   userToken = cookieValue;
//     // }

//     const childrenGip = await App.getInitialProps(appCtx);

//     return {
//       pageProps: {
//         ...childrenGip.pageProps,
//       },
//     };
//   }
// );

export default wrapper.withRedux(MyApp);
