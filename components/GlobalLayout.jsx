import { logOut } from "@/redux/auth/authSlice";
import { useUserLogoutMutation } from "@/redux/walletApiService/userApi";
import Link from "next/link";
import { useDispatch } from "react-redux";

const GlobalLayout = ({ children }) => {
  // const dispatch = useDispatch();

  const [userLogoutRTKQ] = useUserLogoutMutation();

  const onLogout = async () => {
    // dispatch(logOut());
    await userLogoutRTKQ();
    console.log("LOGOUT");

    // document.cookie = `authToken=; max-age=-1`
  };
  return (
    <>
      <div style={{ height: "100px", background: "teal" }}>
        HEADER
        <Link href="/login">LOGIN</Link>
        <button type="button" onClick={onLogout}>
          LOGOUT
        </button>
      </div>
      <main>{children}</main>
      <div style={{ height: "100px", background: "teal" }}>FOOTER</div>
    </>
  );
};

export default GlobalLayout;
