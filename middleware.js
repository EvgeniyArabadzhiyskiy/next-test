import { NextResponse } from "next/server";
import { makeStore } from "./redux/store";

export function middleware(request) {
  // console.log(global.localStorage);



  // const cookies = request.cookies
  // console.log("middleware  cookies", !!cookies.get('goit')?.value);
  

  const response = NextResponse.next();
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
  return response;
}

export const config = {
  matcher: ['/blog', "/pokemons"],
};
