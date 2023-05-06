import { NextResponse } from "next/server";
import { parseCookies } from "nookies";
import { fetchImages } from "./lib/fetch-images";
import { setToken } from "./redux/auth/authSlice";
import { makeStore } from "./redux/store";
import { userApi } from "./redux/walletApiService/userApi";

export async function middleware(request) {
  // console.log("middleware  request:", request);
  // console.log("Middleware");

  // const data =  fetchImages()
  // console.log("middleware  data:", data);


  const cookies = request.cookies;
  const authToken = cookies.get("authToken")?.value;
  // console.log("middleware  authToken:", authToken);

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // const response = NextResponse.next();

  // return response;
}

export const config = {
  matcher: ["/blog", "/pokemons/raiting"],
};

//========================================================================

// export async function middleware(request) {
//   // const store = makeStore();

//   console.log('Middleware');

//   // const cookies = request.cookies;
//   // const authToken = cookies.get("authToken")?.value;

//   // console.log("I am middleware");

//   // const requestHeaders = new Headers(request.headers);

//   // if (authToken) {
//   //   requestHeaders.set("authorization", `Bearer ${authToken}`);
//   // }

//   // const authHeader = {
//   //   request: {
//   //     headers: requestHeaders,
//   //   },
//   // };

//   // const response = NextResponse.next(authHeader);

//   const response = NextResponse.next();

//   // const {pathname} = request.nextUrl;
//   // const protectedPaths = ['/blog'];
//   // const isPathProtected = protectedPaths?.some((path) => pathname === path);
//   // const response = NextResponse.next();

//   // if (isPathProtected) {
//   //   const cookies = request.cookies;
//   //   const authToken = cookies.get("authToken")?.value;
//   //   if (!authToken) {
//   //     const url = new URL(`/login`, request.url);
//   //     // url.searchParams.set("callbackUrl", pathname);
//   //     return NextResponse.redirect(url);
//   //   }
//   // }

//   return response;

//   // store.dispatch(setToken(authToken))
//   // const authState = store.getState().auth
//   // console.log("middleware  authState:", authState);

//   // response.cookies.set('age', 35)

//   // const cookies = request.cookies
//   // console.log("middleware  cookies", cookies.get('promo')?.value);

//   // const store = makeStore();
//   // const { counter } = store.getState().counter;
//   // console.log("middleware  =================counter", counter);

//   // const { pathname } = request.nextUrl

//   // const { isLoggedIn } = store.getState().auth;
//   // console.log("middleware  isLoggedIn", isLoggedIn);

//   // if (!isLoggedIn) {
//   //   return NextResponse.redirect(new URL("/pokemons/statistic", request.url));
//   // }

//   // if ( pathname === '/blog') {
//   //   return NextResponse.redirect(new URL("/pokemons/raiting", request.url));
//   // }

//   //   const response = NextResponse.next({ //config })

// }

// export const config = {
//   matcher: ["/:path*"],
// };

// export const config = {
//   matcher: ["/blog", "/pokemons/raiting"],
// };

//==========================================================
// Protected Path

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const pathname = req.nextUrl.pathname;
//   const protectedPaths = ["/", '/blog'];

//   const isPathProtected = protectedPaths?.some((path) => pathname == path);
//   const res = NextResponse.next();

//   if (isPathProtected) {
//     const token = await getToken({ req });

//     if (!token) {
//       const url = new URL(`/login`, req.url);
//       url.searchParams.set("callbackUrl", pathname);
//       return NextResponse.redirect(url);
//     }
//   }

//   return res;
// }
