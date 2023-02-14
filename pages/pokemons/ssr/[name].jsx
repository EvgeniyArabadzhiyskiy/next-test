import { getPokemonByName, getRunningQueriesThunk } from "@/redux/pokemonApi";
import { wrapper } from "@/redux/store";
import PokemonOne from "../new/[name]";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;

    if (typeof name === "string") {
      store.dispatch(getPokemonByName.initiate(name));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default PokemonOne;
