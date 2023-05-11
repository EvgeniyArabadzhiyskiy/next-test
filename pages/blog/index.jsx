import Counter from "@/components/Counter/Counter";
import NestedLayout from "@/components/NestedLayout";
import { BASE_URL, USER_LOGIN } from "@/constants/apiPath";
import useAuthGuard from "@/lib/useAuthGuard";
import { makeStore, wrapper } from "@/redux/store";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Router from 'next/router';
import { useEffect } from "react";
import { useSelector } from "react-redux";

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const {isLoggedIn} = store.getState().auth
//   console.log("getStaticProps  isLoggedIn", isLoggedIn);

//   if (!isLoggedIn) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {}
//   }
//   }
// );

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

const Blog = () => {
  // const { data: session, status  } = useSession();
  // console.log("Blog  status:", status);
  // console.log("Blog  session:", session);

  const router = useRouter();
  // const { AuthGuardPage } = useAuthGuard();
  const { isLoggedIn } = useSelector((st) => st.auth);
  console.log("RE-RENDER");

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/login");
  //   }

  // },[router, isLoggedIn]);

  const onProba = async () => {
    // router.push("/pokemons/proba");

    // const credentials = {
    //   email: "user100@mail.com",
    //   password: "a123456",
    // };

    // const { data } = await axios.post(`${BASE_URL}${USER_LOGIN}`, credentials);

    const aaa = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(333);
      }, 1000);
    });

    console.log("aaa  aaa:", aaa);

    const bbb = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(555);
      }, 1000);
    });
    console.log("bbb  bbb:", bbb);

    // try {
    //   const bbb = await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       reject(555)
    //     }, 3000);
    //   })
    //   console.log("bbb  bbb:", bbb);
    // } catch (error) {
    //   console.log("onProba  error:", error);

    // }

    const ccc = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(777);
      }, 1000);
    });

    console.log("ccc  ccc:", ccc);

    // try {
    //   const result = await Promise.all([aaa, bbb, ccc]);
    //   console.log("onProba  result:", result);
    // } catch (error) {
    //   console.log("onProba  error:", error);
    // }
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>
  // }

  // if (!session) {
  //   return <h1>Protected</h1>
  // }

  //  if (!isLoggedIn) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <>
      <h1>Page Blog</h1>
      <Link href="/">GO HOME</Link>
      <Counter />

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
