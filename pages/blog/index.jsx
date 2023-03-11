import Counter from "@/components/Counter/Counter";
import NestedLayout from "@/components/NestedLayout";
import useAuthGuard from "@/lib/useAuthGuard";
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
  const [AuthGuardPage] =  useAuthGuard()
  //   const { data: session } = useSession();
  //   console.log("Blog  session:", session);

  const router = useRouter();
  const authState = useSelector((st) => st.auth);
  // console.log("Blog  authState:", authState);


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
    router.push("/pokemons/proba");
  };

  // if (!session) {
  //   return <h1>Protected</h1>
  // }

  return (
    <AuthGuardPage>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
      <Counter />

      <h3>{props.id}</h3>

      <button type="button" onClick={onProba}>
        PROBA
      </button>
    </AuthGuardPage>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
