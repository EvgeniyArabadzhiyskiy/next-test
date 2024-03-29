import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  getPokemonByName,
  getPokemonList,
  getRunningQueriesThunk,
  useGetPokemonByNameQuery,
} from "@/redux/pokemonApi";
import { makeStore, wrapper } from "@/redux/store";
import Layout from "@/components/layout";
import Image from "next/image";
import mobileImg from "../../../images/mobile.webp";
import walletImg from "../../../public/ewallet-2.webp";

// export async function getStaticPaths() {
//   const store = makeStore();
//   const result = await store.dispatch(getPokemonList.initiate());

//   // const arrayPath =  result.data.map((p) => `/pokemons/new/${p.name}`)

//   const arrayPath = result.data.map((p) => ({
//     params: { name: p.name },
//   }));
  
//   return {
//     paths: arrayPath,
//     fallback: false,
//   };
// }

// export const getStaticProps = wrapper.getStaticProps(
//   (store) => async (context) => {
//     const name = context.params?.name;

//     store.dispatch(getPokemonByName.initiate(name));
//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const name = context.params?.name;

    store.dispatch(getPokemonByName.initiate(name));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

export default function PokemonOne() {
  const router = useRouter();
  const name = router.query.name;
  console.log('Rerender');

  const result = useGetPokemonByNameQuery(name);
  const { isLoading, error, data } = result;

  return (
    <Layout>
      <Head>
        <title>{data?.species.name ?? ""}</title>
      </Head>
      <article>
        {error ? (
          <>Oh no, there was an error</>
        ) : router.isFallback || isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            {/* <Image src={walletImg} alt="mob" /> */}

            <h3>{data.species.name}</h3>
            {/* <img src={data.sprites.front_shiny} alt={data.species.name} /> */}
            <div className="image-wrapper">
              <Image
                src={data.sprites.front_shiny}
                alt={data.species.name}
                // width={96}
                // height={96}
                // placeholder="blur"
                // blurDataURL={data.sprites.front_shiny}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>

            <style jsx>{`
              .image-wrapper {
                position: relative;
                width: 200px;
                height: 200px;
                background: tomato;
              }
            `}</style>
          </>
        ) : null}
      </article>
    </Layout>
  );
}
