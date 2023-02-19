import PokemonOne from "../new/[name]";
import { getPokemonByName, getPokemonList, getRunningQueriesThunk } from "@/redux/pokemonApi";
import { makeStore, wrapper } from "@/redux/store";



export async function getStaticPaths() {
  const store = makeStore();
  const result = await store.dispatch(getPokemonList.initiate());
  
  const ddd = {
    paths: result.data
      .map((p) => `/pokemons/ssg/${p.name}`)
      .slice(0, 10),
    fallback: true,
  }
 
  return  ddd;
 
}






export const getStaticProps = wrapper.getStaticProps(
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
