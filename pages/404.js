import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";

const PageError = () => {
  const router = useRouter();
  console.log("PageError  router", router.pathname);

  const timeoutId = useRef(null);

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timeoutId.current);
  }, [router]);

  return (
    <>
      <h1>Sorry there was an error</h1>
      <Link href="/">Back to home</Link>
    </>
  );
};

export default PageError;
