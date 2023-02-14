import Counter from "@/components/Counter/Counter";
import PokemonPageLayout from "@/components/PokemonPageLayout";
import Raiting from "@/components/Raiting";
import Statistic from "@/components/Statistic/Statistic";
import Link from "next/link";
import { useSelector } from "react-redux";

const StatisticPage = () => {
  // const {isLoggedIn} = useSelector(st => st.auth)
  // console.log("LoginPage  isLoggIn", isLoggedIn);

  return <>
  <Statistic />
  <Link href="/">GO HOME</Link>
  {/* <Counter /> */}
  </>
};

export default StatisticPage;

StatisticPage.getLayout = function getLayout(page) {
  return (
    <PokemonPageLayout>
      {page}
    </PokemonPageLayout>
  );
};
