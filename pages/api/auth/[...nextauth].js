import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // secret: process.env.AUTH_SECRET,

  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    //     // redirect console developer http://localhost:3000/api/auth/callback/google
    //   }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text", placeholder: "E-mail" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("authorize  credentials:", credentials);
        delete credentials.csrfToken;
        delete credentials.callbackUrl;
        delete credentials.json;

        const res = await fetch(
          "https://wallet-backend-xmk0.onrender.com/api/users/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log("authorize+++++++++++++++++++++++++++++++++  user:", user);

        if (res.ok && user) {
          return {
            email: user.user.email,
            name: user.user.firstName,
            image: "https://lh3.googleusercontent.com/a/AGNmyxaH1ShEcTREU_Cw3r0hkMjLydj7y1BX30KyZ1ga=s96-c",
            id: 'Test-ID'
          };
        }

        return null;
      },
    }),
  ],

  // pages: {
  //   signIn: "/login",
  // },

  // session: {
  //   strategy: "jwt",
  // },

  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     user && (token.user = user);
  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     session.user = token.user;  // Setting token in session
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/login", //Need to define custom login page (if using)
  // },

  //   session: {
  //     jwt: true,
  //     maxAge: 30 * 24 * 60 * 60 // 30 days
  //   },
  //   debug: true
};
export default NextAuth(authOptions);

// https://wallet-backend-xmk0.onrender.com/api/auth-google/google-redirect
