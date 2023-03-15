import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useAuthGuard = () => {
  const { isLoggedIn } = useSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  const AuthGuardPage = ({ children }) => {
    if (!isLoggedIn) {
      return <h1>Loading...</h1>;
    }
    return children;
  };

  return { AuthGuardPage };
};

export default useAuthGuard;
