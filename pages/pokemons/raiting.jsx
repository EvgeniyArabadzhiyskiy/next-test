import Counter from "@/components/Counter/Counter";
import PokemonPageLayout from "@/components/PokemonPageLayout";
import Raiting from "@/components/Raiting";
import { incrementCounter } from "@/redux/counter/counter";
import { wrapper } from "@/redux/store";
import { useSelector } from "react-redux";

// export const getStaticProps = wrapper.getStaticProps(
//   (store) => async () => {

    

//     store.dispatch(incrementCounter());

//     return { props: {} };
//   }
// );

const RaitingPage = () => {
  const { counter } = useSelector(state => state.counter);
    // console.log("RaitingPage  counter:", counter);
    return ( <><Raiting /><Counter /></> );
}
 
export default RaitingPage;

RaitingPage.getLayout = function getLayout(page) {
  return <PokemonPageLayout>{page}</PokemonPageLayout>;
  
}