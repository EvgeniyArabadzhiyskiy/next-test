import { setToken } from "@/redux/auth/authSlice";

const { useRouter } = require("next/router");
const { useEffect } = require("react");
const { useSelector, useDispatch } = require("react-redux");

const PrivateRoute = ({protectedRoutes, children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((s) => s.auth);

  const router = useRouter();

  const isProtected = protectedRoutes.indexOf(router.pathname) !== -1
  // const isProtected = protectedRoutes?.some((path) => router.pathname === path);
  // console.log("PrivateRoute  isProtected:", isProtected);

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    dispatch(setToken(token));
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn && isProtected) {
      router.push("/login");
      // console.log("PROTECT");
    }
  }, [isLoggedIn, isProtected, router]);

  if (!isLoggedIn && isProtected) {
    return <h1>Loading...</h1>;
  }

  return children
};

export default PrivateRoute;
