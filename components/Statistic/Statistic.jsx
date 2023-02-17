import { Title, Wrapper } from "./Statistic.styled";
import { Poppins } from "@next/font/google";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Statistic = () => {
  return (
    <div>
      {/* <h1 className={poppins.className}>Pokemon Statistic</h1> */}
      <Title className={poppins.className}>Pokemon Statistic</Title>
      <Wrapper>Statistic</Wrapper>
    </div>
  );
};

export default Statistic;
