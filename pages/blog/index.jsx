import NestedLayout from "@/components/NestedLayout";
import { makeStore } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// export const getStaticProps = () => {
//   const store = makeStore();

//   const {isLoggedIn} = store.getState().auth
//   console.log("getStaticProps  isLoggedIn", isLoggedIn);

//   if (!isLoggedIn) {
//     return {
//       redirect: {
//         destination: '/pokemons',
//         // permanent: false,
//       },
//     }
//   }

//   return {
//     props: {}
//   }
// }

const Blog = () => {
  const router = useRouter();

  const { isLoggedIn } = useSelector((st) => st.auth);

  // useEffect(() => {
  //   // if (!isLoggedIn) {
  //   //   router.push("/pokemons");
  //   // }

  //   const { pathname } = router

  //   if(pathname == '/blog' ){
  //     router.push('/pokemons')
  //   }
  // },[router]);

  return (
    <>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
    </>
  );
};

export default Blog;


Blog.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};

// import { NextResponse } from "next/server";
// import { makeStore } from "./redux/store";

// export function middleware(request) {
//   const store = makeStore();

//   const {isLoggedIn} = store.getState().auth
//   console.log("getStaticProps  isLoggedIn", isLoggedIn);

//   if (!isLoggedIn) {
//     return NextResponse.redirect(new URL("/pokemons/statistic", request.url));

//   }

//   return NextResponse.next()

// }

// export const config = {
//   matcher: ["/blog", "/pokemons"],
// };

//============================================================================

// import { NextResponse } from 'next/server'

// export async function middleware(req) {
//     const { pathname } = req.nextUrl

//     if (pathname === '/') {
//         return NextResponse.redirect('http://localhost:3000/pokemons')
//     }
//     return NextResponse.next()
// }

// eslint-disable-next-line import/no-anonymous-default-export
// export default () => {}
