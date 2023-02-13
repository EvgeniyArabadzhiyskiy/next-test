import { NextResponse } from "next/server";
import { makeStore } from "./redux/store";

export function middleware(request) {
  const store = makeStore();
  const { pathname } = request.nextUrl

  const { isLoggedIn } = store.getState().auth;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/pokemons/statistic", request.url));
  }

  // if ( pathname === '/blog') {
  //   return NextResponse.redirect(new URL("/pokemons/raiting", request.url));
  // }

  //   const response = NextResponse.next({ //config })
  //   return  response
}

export const config = {
  matcher: ['/blog', "/pokemons"],
};
