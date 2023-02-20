import { getDetails } from "@/redux/pokemonApi";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const getServerSideProps = async (context) => {

  const id = context.query.name

  let result = null;

  try {
    result = await getDetails(id);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { name: result.name },
  };
};

const DetailsPokemn = ({name}) => {
  // const [name, setName] = useState(null);

  // useEffect(() => {
  //   const ddd = async (id) => {
  //     // const result = await getDetails(2);
  //     // setName(result.name);

  //     const response = await axios.post(`http://localhost:3000/api/hello`, {
  //       name: "bulbasaur",
  //     });

  //     setName(response.data.data);
  //   };

  //   ddd(25);
  // }, []);

  return (
    <>
      <h1>Pokemon {name} </h1>
    </>
  );
};

export default DetailsPokemn;
