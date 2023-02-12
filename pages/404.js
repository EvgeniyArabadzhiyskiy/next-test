import Link from "next/link";

const PageError = () => {
  return (
    <>
      <h1>Sorry there was an error</h1>
      <Link href="/">Back to home</Link>
    </>
  );
};

export default PageError;
