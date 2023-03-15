export const useServerRedirect = (store) => {
  const { isLoggedIn } = store.getState().auth;
  console.log("getStaticProps  isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
};
