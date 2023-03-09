import { NextResponse } from "next/server";
import { setToken } from "./redux/auth/authSlice";
import { makeStore } from "./redux/store";

export async function middleware(request) {
  // const store = makeStore();

  const cookies = request.cookies;
  const authToken = cookies.get("authToken")?.value;

  // console.log("I am middleware");

  // const requestHeaders = new Headers(request.headers);

  // if (authToken) {
  //   requestHeaders.set("authorization", `Bearer ${authToken}`);
  // }

  // const authHeader = {
  //   request: {
  //     headers: requestHeaders,
  //   },
  // };

  // const response = NextResponse.next(authHeader);

  const response = NextResponse.next();

 

  return response;


  // store.dispatch(setToken(authToken))
  // const authState = store.getState().auth
  // console.log("middleware  authState:", authState);

 

  // response.cookies.set('age', 35)

  // const cookies = request.cookies
  // console.log("middleware  cookies", cookies.get('promo')?.value);

  // const store = makeStore();
  // const { counter } = store.getState().counter;
  // console.log("middleware  =================counter", counter);

  // const { pathname } = request.nextUrl

  // const { isLoggedIn } = store.getState().auth;
  // console.log("middleware  isLoggedIn", isLoggedIn);

  // if (!isLoggedIn) {
  //   return NextResponse.redirect(new URL("/pokemons/statistic", request.url));
  // }

  // if ( pathname === '/blog') {
  //   return NextResponse.redirect(new URL("/pokemons/raiting", request.url));
  // }

  //   const response = NextResponse.next({ //config })
 
}

export const config = {
  matcher: ["/:path*"],
};

// export const config = {
//   matcher: [ '/blog', '/pokemons/proba'],
// };
