import Counter from "@/components/Counter/Counter";
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

const Blog = (props) => {
  const router = useRouter();

  const { isLoggedIn } = useSelector((st) => st.auth);
  // const { transactions, pageNum } = useSelector((state) => state.transactions);
  // console.log("Blog  transactions:", transactions);

  // useEffect(() => {
  //   // if (!isLoggedIn) {
  //   //   router.push("/pokemons");
  //   // }

  //   const { pathname } = router

  //   if(pathname == '/blog' ){
  //     router.push('/pokemons')
  //   }
  // },[router]);

  const onProba = () => {
    router.push('/pokemons/proba')
  }

  return (
    <>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
      <Counter />

      <h3>{props.id}</h3>

      <button type="button" onClick={onProba}>PROBA</button>
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


