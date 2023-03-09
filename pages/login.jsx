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

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  
//   const credentials = { email: "user100@mail.com", password: "a123456" };
//   store.dispatch(userLogin.initiate(credentials));
//   const [result] = await Promise.all(store.dispatch(getRunningMutationsThunk()));
//   // console.log("getStaticProps  result:", result);
//   // console.log("getStaticProps  store:", store.getState().auth);
// });

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, token } = useSelector((st) => st.auth);

  const [userLoginRTKQ] = useUserLoginMutation();

  const onLogin = async () => {
    const credentials = {
      email: "user100@mail.com",
      password: "a123456",
    };

    const currentUser = await userLoginRTKQ(credentials);

    setCookie(null, 'authToken', `${currentUser.data.token}`, { maxAge: 30 * 24 * 60 * 60})

    // dispatch(logIn());

    // document.cookie = `authToken=${currentUser.data.token}; max-age=${30*24*60*60}`;
    // const cookieValue = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("goit="))
    //   ?.split("=")[1];
  };

  return (
    <>
      <h1>Login Page</h1>
      {/* <h2>User {token || 'DEFAULT'}</h2> */}

      <button type="button" onClick={onLogin}>
        LOGIN
      </button>

      <Link href="/">Go Home</Link>
    </>
  );
};

export default LoginPage;
