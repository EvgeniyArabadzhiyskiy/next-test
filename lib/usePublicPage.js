import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePublicPage = () => {
  const { isLoggedIn } = useSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/blog");
    }
  }, [isLoggedIn, router]);

  const PublicPage = ({ children }) => {
    if (isLoggedIn) {
      return <h1>Loading...</h1>;
    }
    return children;
  };

  return { PublicPage };
};

export default usePublicPage;