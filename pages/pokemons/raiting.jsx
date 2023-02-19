import PokemonPageLayout from "@/components/PokemonPageLayout";
import Raiting from "@/components/Raiting";

const RaitingPage = () => {
    return ( <Raiting /> );
}
 
export default RaitingPage;

RaitingPage.getLayout = function getLayout(page) {
  return <PokemonPageLayout>{page}</PokemonPageLayout>;
  
}