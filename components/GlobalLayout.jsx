import { logOut } from "@/redux/auth/authSlice";
import { useUserLogoutMutation } from "@/redux/walletApiService/userApi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useDispatch } from "react-redux";

const GlobalLayout = ({ children }) => {
  // const dispatch = useDispatch();
  const router = useRouter();

  const [userLogoutRTKQ] = useUserLogoutMutation();

  const onLogout = async () => {
    await userLogoutRTKQ();
    console.log("LOGOUT");

    destroyCookie(null, "authToken", { path: "/" });
    router.replace('/login')
    
    // document.cookie = `authToken=; max-age=-1`
  };

  // const onNextAuthOut = () => {
  //   signOut({ redirect: false, callbackUrl: "/login" });
  //   router.push('/login')
  // };

  return (
    <>
      <div style={{ height: "100px", background: "teal" }}>
        HEADER
        <Link href="/login">LOGIN</Link>
        <button type="button" onClick={onLogout}>
          LOGOUT
        </button>
        {/* <button onClick={onNextAuthOut}>Sign Out</button> */}
      </div>
      <main>{children}</main>
      <div style={{ height: "100px", background: "teal" }}>FOOTER</div>
    </>
  );
};

export default GlobalLayout;
