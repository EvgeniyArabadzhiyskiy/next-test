import Head from "next/head";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "@/components/Counter/Counter";

import {
  getAllTransactions,
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  // getRunningQueriesThunk,
} from "@/redux/walletApi";

import {
  getTransactions,
  setInitialTransactions,
  setNextPage,
} from "@/redux/transactions-slice";
import { getPokemonByName, getRunningQueriesThunk } from "@/redux/pokemonApi";
import { setInitialCounter } from "@/redux/counter/counter";

export const getStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    // const { pageNum } = store.getState().transactions;

    // store.dispatch(getAllTransactions.initiate({ pageNum }));
    // const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

    // store.dispatch(setInitialTransactions(result.data));

    store.dispatch(setInitialCounter(10));

    return { props: {} };
  }
);

const TransactionsList = ({ ddd }) => {
  // console.log("TransactionsList  ddd:", ddd);
  const [isSkip, setIsSkip] = useState(true);
  const { counter } = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const { transactions, pageNum } = useSelector((state) => state.transactions);

  const { data = [] } = useGetAllTransactionsQuery(
    { pageNum },
    { skip: isSkip }
  );

  useEffect(() => {
    if (data.length === 0) return;

    dispatch(getTransactions(data));
  }, [data, dispatch]);

  const [deleteTransactionRTKQ] = useDeleteTransactionMutation();

  const deleteTransaction = (id) => {
    // deleteTransactionRTKQ(id);
  };

  const onNextPage = () => {
    dispatch(setNextPage());

    setIsSkip(false);
  };

  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="Transactions List" />
      </Head>

      <div>
        <h1>Transactions</h1>
        {/* <h2>{ddd}</h2> */}

        <Link href="/"> ← Back to home</Link>

        <button type="button" onClick={onNextPage}>
          Next Page
        </button>
      </div>

      <Counter />

      <ul className="transactions-list">
        {transactions &&
          transactions.map((item) => {
            return (
              <li key={item._id}>
                <span>{item.category}</span>
                <button
                  type="button"
                  onClick={() => deleteTransaction(item._id)}
                >
                  DELETE
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default TransactionsList;



// TransactionsList.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async () => {
//     // console.log("store:", store);
//     // const { pageNum } = store.getState().transactions;
//     const { counter } = store.getState().counter;
//     console.log("counter:================", counter);

//     // console.log("+++++++++++++++++++++++++++++++++++++++");

//     // store.dispatch(getAllTransactions.initiate({ pageNum: 1 }));
//     // const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     // store.dispatch(getPokemonByName.initiate('bulbasaur'));
//     // const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));
//     // console.log("result++++++++++++++++++++++++++++++++++++++:", result);

//     // // console.log("store.getState().transactions:", store.getState().transactions);
//     // // store.dispatch(setInitialTransactions(result?.data));

//     store.dispatch(setInitialCounter(10));

//     // return { ddd: result };
//     //return  {ddd: store.getState().transactions}

//   //   const res = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
//   // const json = await res.json()
//   // console.log("NAME", json);

//   return { ddd: 'pageNum' }
//   }
// );

//================================================================

// import Head from "next/head";
// import Link from "next/link";
// import { wrapper } from "@/redux/store";
// import { useEffect, useState } from "react";

// import {
//   getAllTransactions,
//   useDeleteTransactionMutation,
//   useGetAllTransactionsQuery,
//   getRunningQueriesThunk,
// } from "@/redux/walletApi";

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//   const { pageNum } = store.getState().transactions

//   store.dispatch(getAllTransactions.initiate({ pageNum }));
//   const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

//   return {
//     props: {
//       initialData: result.data,
//     },
//   };
// });

// const TransactionsList = ({ initialData = [] }) => {
//   const [pageNum, setPage] = useState(1);
//   const [isSkip, setIsSkip] = useState(true);
//   const [result, setResult] = useState(initialData);

//   const { data = [] } = useGetAllTransactionsQuery({ pageNum }, { skip: isSkip });

//   useEffect(() => {
//     if (data.length === 0)  return

//     setResult(prev => [...prev, ...data]);
//   }, [data]);

//   const [deleteTransactionRTKQ] = useDeleteTransactionMutation();

//   const deleteTransaction = (id) => {
//     // deleteTransactionRTKQ(id);
//   };

//   const onNextPage = () => {
//     setIsSkip(false);
//     setPage((prev) => prev + 1);
//   };

//   return (
//     <>
//       <Head>
//         <title>Transactions</title>
//         <meta name="description" content="Transactions List" />
//       </Head>

//       <div>
//         <h1>Transactions</h1>

//         <Link href="/"> ← Back to home</Link>
//         <button type="button" onClick={onNextPage}>
//           Next Page
//         </button>
//       </div>

//       <ul className="transactions-list">
//         {result &&
//           result.map((item) => {
//             return (
//               <li key={item._id}>
//                 {item.category}
//                 <button
//                   type="button"
//                   onClick={() => deleteTransaction(item._id)}
//                 >
//                   DELETE
//                 </button>
//               </li>
//             );
//           })}
//       </ul>
//     </>
//   );
// };

// export default TransactionsList;

//===========================================================

// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDeleteTransactionMutation } from "@/redux/walletApi";

// import axios from "axios";
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3NjY2MzEzMSwiZXhwIjoxNjc3ODcyNzMxfQ.W9CvqyVwufke2XcMuWvPBMBJwxLkhYao1TZnJr6YfMg`;
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// export const getStaticProps = async () => {
//   const response = await axios(
//     `https://wallet-backend-xmk0.onrender.com/api/transactions?page=1&limit=5`
//   );

//   return {
//     props: {
//       initialData: response.data.transactions,
//     },
//   };
// };

// const TransactionsList = ({ initialData = [] }) => {
//   const [pageNum, setPage] = useState(1);
//   const [isSkip, setIsSkip] = useState(true);
//   const [result, setResult] = useState(initialData);

//   useEffect(() => {
//     if (isSkip) return;

//     (async () => {
//       const { data } = await axios(
//         `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${pageNum}&limit=5`
//       );

//       setResult((prev) => [...prev, ...data?.transactions]);
//     })();
//   }, [isSkip, pageNum]);

//   const [deleteTransactionRTKQ] = useDeleteTransactionMutation();

//   const deleteTransaction = (id) => {
//     // deleteTransactionRTKQ(id);
//   };

//   const onNextPage = () => {
//     setIsSkip(false);
//     setPage((prev) => prev + 1);
//   };

//   return (
//     <>
//       <Head>
//         <title>Transactions</title>
//         <meta name="description" content="Transactions List" />
//       </Head>

//       <div>
//         <h1>Transactions</h1>

//         <Link href="/"> ← Back to home</Link>
//         <button type="button" onClick={onNextPage}>
//           Next Page
//         </button>
//       </div>

//       <ul className="transactions-list">
//         {result &&
//           result.map((item) => {
//             return (
//               <li key={item._id}>
//                 {item.category}
//                 <button
//                   type="button"
//                   onClick={() => deleteTransaction(item._id)}
//                 >
//                   DELETE
//                 </button>
//               </li>
//             );
//           })}
//       </ul>
//     </>
//   );
// };

// export default TransactionsList;

//========================================================
