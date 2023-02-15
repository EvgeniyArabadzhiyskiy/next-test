import { logIn } from "@/redux/auth/authSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  //   const {isLoggedIn} = useSelector(st => st.auth)
  //   console.log("LoginPage  isLoggIn", isLoggedIn);

  const onLogin = () => {
    dispatch(logIn());

    document.cookie = 'goit=djon4292; max-age=60'

    const cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith('goit='))
  ?.split('=')[1];
  
  console.log("LoginPage  cookieValue", cookieValue);
  };

  
  
  return (
    <>
      <h1>Login Page</h1>

      <button type="button" onClick={onLogin}>
        LOGIN
      </button>

      <Link href="/">Go Home</Link>
    </>
  );
};

export default LoginPage;
