import { setToken } from "@/redux/auth/authSlice";
import { useUserRefreshQuery } from "@/redux/walletApiService/userApi";

const { useRouter } = require("next/router");
const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");

const PrivateRoute = ({ protectedRoutes, children }) => {
  // const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn, token } = useSelector((s) => s.auth);

  const isProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  // const isProtected = protectedRoutes?.some((path) => router.pathname === path);

  // const { isError, isLoading } = useUserRefreshQuery(undefined, { skip: !token });

  useEffect(() => {
    if (!isLoggedIn && isProtected) {
      router.push("/login");
    }

    if (isLoggedIn && router.pathname === "/login") {
      router.push("/");
    }
  }, [isLoggedIn, isProtected, router]);

  if (isLoggedIn && router.pathname === "/login") {
    return <h1>Loading...</h1>;
  }

  if (!isLoggedIn && isProtected) {
    return <h1>Loading...</h1>;
  }

  return children;
};

export default PrivateRoute;
