import axios from "axios";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
  const res = await axios.get(`http://localhost:3000/api/transactions?limit=10`);

  return {
    props: { transactions: res.data.data.transactions },
  };
};

const Operations = ({ transactions }) => {
  //   console.log("Operations  transactions", transactions);
  //   const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   const ddd = async () => {
  //     const res = await axios.post(`http://localhost:3000/api/transactions?limit=10&city=kiev`, {limit: 10});
  //   console.log("ddd  res", res.data.data.transactions);
  //   setTransactions(res.data.data.transactions)
  //   };

  //   ddd();
  // }, []);

  const deleteTrans = async (id) => {
    const res = await axios.delete(
      `http://localhost:3000/api/transactions?id=${id}`
    );

    console.log("deleteTrans  res", res.data.data);
  };

  return (
    <>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((item) => (
          <li onClick={() => deleteTrans(item._id)} key={item._id}>
            {item.category}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Operations;

// const yyy = {
//   amount: 240,
//   category: "Regular Income",
//   comment: "Tort",
//   createdAt: "2023-01-06T15:03:44.772Z",
//   date: "Fri Jan 06 2023 17:03:25 GMT+0200 (Восточная Европа, стандартное время)",
//   typeOperation: "income",
// };
