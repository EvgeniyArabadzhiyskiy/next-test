import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangeUsername = ({ target: { value } }) => {
    setUsername(value);
  }

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  }

  const handleLogin = () => {
    signIn("credentials", {
      username,
      password,
      //   callbackUrl: `${window.location.origin}/profil`,
    })
      .then((res) => {
        console.log("form::res -> ", res);
        router.back();
      })
      .catch((e) => {
        console.log("form::e -> ", e);
        setError("login error");
      });
  };

  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
      setUsername(router.query.username);
    }
  }, [router]);

  return (
    <form onSubmit={handleLogin}>
      <input
        name="username"
        type="text"
        value={username}
        onChange={handleChangeUsername}
      />
      <input name="password" type="password" onChange={handleChangePassword} />
      {error && <div>{error}</div>}
      <button type="submit">connexion</button>
    </form>
  );
};

// AuthenticationForm.getInitialProps = async (context) => {
//   return {
//     csrf: await csrfToken(context),
//   };
// };

export default AuthForm;
