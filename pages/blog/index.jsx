import Counter from "@/components/Counter/Counter";
import NestedLayout from "@/components/NestedLayout";
import { makeStore } from "@/redux/store";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  console.log("Blog  session:", session);
  // console.log("Blog  props:", props);
  
  const router = useRouter();

  const authState = useSelector((st) => st.auth);
  // console.log("Blog  authState:", authState);
  
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

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }

  // },[router, session]);

  const onProba = () => {
    router.push('/pokemons/proba')
  }

  if (!session) {
    // router.push('/login')
    return <h1>Protected</h1>
  }

  return (
    <>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
      <Counter />

      <h3>{props.id}</h3>

      <button type="button" onClick={onProba}>PROBA</button>

    
      {/* <Link href="/">GO HOME</Link>
      <Link href="/pokemons/proba">PROBA</Link> */}
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


