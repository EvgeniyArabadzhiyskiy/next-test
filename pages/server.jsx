import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

export default function Page({}) {
  const { data: session } = useSession();
  console.log("Page  session:", session);

  if (session) {
    return (
      <>
        <h1>Protected Page</h1>
        <p>You can view this page because you are signed in.</p>
        <Link href="/"> ← Back to home</Link>
      </>
    );
  }
  return <p>Access Denied</p>;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  /* Так не рекомендовано на стороне сервера
   const session = await getSession({ req: context.req });*/

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.stringify(session, null, 2),
    },
  };
}

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/auth/[...nextauth]";
// import Layout from "../components/layout";

// export default function ServerSidePage({ session }) {
//   // As this page uses Server Side Rendering, the `session` will be already
//   // populated on render without needing to go through a loading stage.
//   return (
//     <Layout>
//       <h1>Server Side Rendering</h1>
//       <p>
//         This page uses the <strong>getServerSession()</strong> method in{" "}
//         <strong>getServerSideProps()</strong>.
//       </p>
//       <p>
//         Using <strong>getServerSession()</strong> in{" "}
//         <strong>getServerSideProps()</strong> is the recommended approach if you
//         need to support Server Side Rendering with authentication.
//       </p>
//       <p>
//         The advantage of Server Side Rendering is this page does not require
//         client side JavaScript.
//       </p>
//       <p>
//         The disadvantage of Server Side Rendering is that this page is slower to
//         render.
//       </p>
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </Layout>
//   );
// }

// // Export the `session` prop to use sessions with Server Side Rendering
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getServerSession(context.req, context.res, authOptions),
//     },
//   };
// }
