import Counter from "@/components/Counter/Counter";
import NestedLayout from "@/components/NestedLayout";
import useAuthGuard from "@/lib/useAuthGuard";
import { makeStore, wrapper } from "@/redux/store";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Router from 'next/router';
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

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const session = await getSession({ req: context.req });
//     console.log("session:", session);

//     if (!session) {
//       return {
//         redirect: {
//           destination: "/login",
//           permanent: false,
//         },
//       };
//     }
//     return {
//       props: {
//         session,
//       },
//     };
//   }
// );

const Blog = (props) => {
    // const { data: session, status  } = useSession();
    // console.log("Blog  status:", status);
    // console.log("Blog  session:", session);

  const router = useRouter();
  // const { AuthGuardPage } = useAuthGuard();
  const { isLoggedIn } = useSelector((st) => st.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }

  },[router, isLoggedIn]);

  const onProba = () => {
    router.push("/pokemons/proba");
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>
  // }

  // if (!session) {
  //   return <h1>Protected</h1>
  // }

   if (!isLoggedIn) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
      <Counter />

      <h3>{props.id}</h3>

      <button type="button" onClick={onProba}>
        PROBA
      </button>
    </>
  );
};

// Blog.getInitialProps = wrapper.getInitialAppProps(
//   (store) => ({ res }) => {

//   const state = store.getState()
//   const {isLoggedIn} = state.auth

//   if (!isLoggedIn) {
//     res.writeHead(302, { Location: '/pokemons' });
//     res.end();
//   }
//   //  else {
//     // Router.push('/pokemons');
//   // }

//   return {};
// })

export default Blog;

Blog.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
