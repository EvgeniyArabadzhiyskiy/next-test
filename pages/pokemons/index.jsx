import Head from "next/head";
import Link from "next/link";
import { wrapper } from "@/redux/store";
// import {
//   getPokemonList,
//   getRunningQueriesThunk,
//   useGetPokemonListQuery,
// } from "@/redux/pokemonApi";
import { useRouter } from "next/router";
import PokemonPageLayout from "@/components/PokemonPageLayout";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";


import { getAllTransactions, useDeleteTransactionMutation, useGetAllTransactionsQuery, getRunningQueriesThunk } from "@/redux/walletApi";
import axios from "axios";
import Counter from "@/components/Counter/Counter";

export const getStaticProps = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await response.json();
  console.log("getStaticProps  data", data);

  return {
    props: {
      initialTodos: data.results,
    }
  }
};

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   const { counter } = store.getState().counter 
//   store.dispatch(getPokemonList.initiate(counter));
//   await Promise.all(store.dispatch(getRunningQueriesThunk()));

//   return {
//     props: {},
//   };
// });



// export const getStaticProps = wrapper.getStaticProps((store) => async () => {

//   const { counter } = store.getState().counter  // Для примера
  
//   store.dispatch(getPokemonList.initiate(counter));
//   await Promise.all(store.dispatch(getRunningQueriesThunk()));

//   return {
//     props: {},
//   };
// });


// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   store.dispatch(getAllTransactions.initiate());
//   const result =   await Promise.all(store.dispatch(getRunningQueriesThunk()));

//   console.log('==============SERVER=STATIC=PROPS============================');
 
//   return {
//     props: {
//       response: result[0] 
//     },
//   };
// });

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3NjY2MzEzMSwiZXhwIjoxNjc3ODcyNzMxfQ.W9CvqyVwufke2XcMuWvPBMBJwxLkhYao1TZnJr6YfMg`;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const Pokemons = ({ response, initialTodos }) => {
  const [pokemons, setTodos] = useState(initialTodos);

  const deletePokemon = (namePok) => {
    setTodos((prevTodos) =>
      prevTodos.filter(({ name }) => name !== namePok)
    )
  }

  // const { data: pokemons, isError, isLoading } = response
  
  const { counter } = useSelector(st => st.counter)

  // const [pokemons, setPokemons] = useState(null);
  // console.log("Pokemons  pokemons", pokemons);

  // useEffect(() => {
  //   const getTransactions = async () => {
  //     const response = await axios(`https://wallet-backend-xmk0.onrender.com/api/transactions?page=1&limit=10`);
  //     // const data = await response.json();
  //     // console.log("getTransactions  response", response);
  //     setPokemons(response.data);
  //   };
  //   getTransactions();
  // }, []);

  
  // const [trans, setTrans] = useState(null);
  // const {data: result} = useGetAllTransactionsQuery()

  //  useEffect(() => {
  //   if (result) {
  //     setTrans(result)
      
  //   }
  // }, [result]);
  // console.log("Pokemons  result", result);


  // const [deleteTrRTKQ] = useDeleteTransactionMutation()


  // const deleteTrans = () => {
  //   deleteTrRTKQ('63b840fd3474cbf1d3e930a5')
  // }

  // const { data: pokemons = [], isLoading } = useGetPokemonListQuery(counter);
  // console.log("Pokemons  pokemons", pokemons);

  // console.log("Pokemons  result", pokemons?.results);
  // const pokemons = data?.result
  // console.log("Pokemons  pokemons", pokemons);

  // if (isLoading) {
  //   return <h1>HELLO</h1>
  // }

  return (
    <>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="Pokemons List" />
      </Head>
      {/* {isLoading && <h1>Loading...</h1>} */}
      <div>
        <h1>Pokemons</h1>
        {/* <Counter /> */}

        <ul>
          {pokemons &&
            pokemons.map((pokemon) => {
              return (
                // <Link key={pokemon.name} href={`/pokemons/new/${pokemon.name}`}>
                // <Link  key={pokemon.name} href={`/pokemons/details?name=${pokemon.name}`}>
                  <li key={pokemon.name} onClick={() => deletePokemon(pokemon.name)} >{pokemon.name}</li>
                // </Link>
              );
            })}
        </ul>

        <Link href="/"> ← Back to home</Link>
        <Link href="/pokemons/statistic">Go Statistic</Link>
       
      </div>

      {/* <ul>
        {trans?.transactions &&
          trans?.transactions.map((pokemon) => {
            return <li key={pokemon._id}>{pokemon.category}</li>;
          })}
      </ul> */}

      {/* <button type="button" onClick={deleteTrans} >DELETE</button> */}
    </>
  );
};

export default Pokemons;

Pokemons.getLayout = function getLayout(page) {
  return <PokemonPageLayout>{page}</PokemonPageLayout>;
};
