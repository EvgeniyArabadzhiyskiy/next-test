import { logIn } from "@/redux/auth/authSlice";
import { wrapper } from "@/redux/store";
import {
  getRunningMutationsThunk,
  getRunningQueriesThunk,
  userApi,
  userLogin,
  useUserLoginMutation,
} from "@/redux/walletApiService/userApi";
import Link from "next/link";
import { setCookie } from "nookies";
import { useDispatch, useSelector } from "react-redux";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {

//   const credentials = { email: "user100@mail.com", password: "a123456" };
//   store.dispatch(userLogin.initiate(credentials));
//   const [result] = await Promise.all(store.dispatch(getRunningMutationsThunk()));
//   // console.log("getStaticProps  result:", result);
//   // console.log("getStaticProps  store:", store.getState().auth);
// });

// const LoginPage = () => {
//   const { data: session } = useSession()
//   console.log("LoginPage  session:", session);

//   const [userLoginRTKQ] = useUserLoginMutation();

//   const onLogin = async () => {
//     const credentials = {
//       email: "user100@mail.com",
//       password: "a123456",
//     };

//     const currentUser = await userLoginRTKQ(credentials);

//     setCookie(null, 'authToken', `${currentUser.data.token}`, { maxAge: 30 * 24 * 60 * 60})

//     // document.cookie = `authToken=${currentUser.data.token}; max-age=${30*24*60*60}`;
//     // const cookieValue = document.cookie
//     //   .split("; ")
//     //   .find((row) => row.startsWith("goit="))
//     //   ?.split("=")[1];
//   };

//   return (
//     <>
//       <h1>Login Page</h1>

//       <button type="button" onClick={onLogin}>
//         LOGIN
//       </button>

//       <Link href="/">Go Home</Link>
//     </>
//   );
// };

// export default LoginPage;

export default function LoginPage() {
  const { data: session } = useSession();
  // console.log("LoginPage  session:", session);

  const router = useRouter();

  const onSignIn = async () => {
    await signIn('google', { callbackUrl: 'http://localhost:3000/blog' });
    // await router.push("/");
  };

 

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        {/* <button onClick={() => signOut()}>Sign out</button> */}
        <Link href="/server"> ← Back to home</Link>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={onSignIn}>Sign in</button>
    </>
  );
}
