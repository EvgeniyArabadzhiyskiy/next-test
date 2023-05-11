import axios from "axios";
import { NextResponse } from "next/server";
import { BASE_URL, USER_CURRENT } from "./constants/apiPath";

export async function middleware(request) {
  const cookies = request.cookies;
  const authToken = cookies.get("authToken")?.value;

  if (!authToken) {
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  // const options = {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${authToken}`,
  //   },
  // };

  // const resFetch = await fetch(`${BASE_URL}${USER_CURRENT}`, options);
  // const data = await resFetch.json();
  // console.log("middleware  data:", data.email);

}

export const config = {
  matcher: ["/blog", "/pokemons/raiting"],
};

//========================================================================

// export async function middleware(request) {

//   // const cookies = request.cookies;
//   // const authToken = cookies.get("authToken")?.value;

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

//   // response.cookies.set('age', 35)

//   // const cookies = request.cookies
//   // console.log("middleware  cookies", cookies.get('promo')?.value);

//   // const { pathname } = request.nextUrl

//   //   return NextResponse.redirect(new URL("/pokemons/statistic", request.url));

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
