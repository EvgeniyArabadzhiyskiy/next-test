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
  getRunningQueriesThunk,
} from "@/redux/walletApiService/walletApi";

import {
  getTransactions,
  setInitialTransactions,
  setNextPage,
} from "@/redux/transactions-slice";

import { setInitialCounter } from "@/redux/counter/counter";



import { setToken } from "@/redux/auth/authSlice";
import axios from "axios";

export const getServerSideProps = wrapper.getServerSideProps((store) =>  async (context) => {
  // let authSetHeader = context.req.headers
  // console.log("getServerSideProps  authSetHeader:", authSetHeader);

  //   const response = await fetch(
  //   `https://wallet-backend-xmk0.onrender.com/api/transactions?page=1&limit=5`, {
  //     headers: {
  //       ["authorization"]: authSetHeader
  //     }
  //   }
  // );
  //  const data = await response.json()
  //  console.log("getServerSideProps  response:", response?.data.userBalance);


  // let authSetHeader = context.req.headers["authorization"] || null
  // store.dispatch(setToken(authSetHeader))

  // const { token } = store.getState().auth;
  // console.log("++++++++++++++++++++++token+++++++++++++++++++++++++:", token);
  
  const { pageNum } = store.getState().transactions;
  store.dispatch(getAllTransactions.initiate({ pageNum }));
  const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

  // if (result.isError) {
  //   const errorMessage = result.error;
  //   return { props: {error: result.error} };
  // }

  store.dispatch(setInitialTransactions(result.data || []));
  store.dispatch(setInitialCounter({ amount: 10, type: "start" }));

  // return { props: {} };
})



const TransactionsList = ({ id}) => {
  // console.log("TransactionsList  id:", id);
  // if (error) {
  //   console.log("TransactionsList  error:", error);
  // }

  const [isSkip, setIsSkip] = useState(true);
  // const { counter } = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  const { transactions, pageNum } = useSelector((state) => state.transactions);

  const { data = [] } = useGetAllTransactionsQuery(
    { pageNum },
    { skip: isSkip }
  );

  useEffect(() => {
    (async () => {
      // const response = await fetch(`https://pokeapi.co/api/v2/pokemon`, {
      //   headers:
      //   {
      //     "DDDDDD": "KIWI"
      //   }
      // });
      // const data = await response.json();
      // console.log("getStaticProps  data", data);

      // const response = await fetch(
      //   `https://wallet-backend-xmk0.onrender.com/api/transactions?page=1&limit=5`, {
      //     headers: {
      //       ["authorization"]: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3ODM3MTc2MywiZXhwIjoxNjc5NTgxMzYzfQ.NwpniKvSo3I6-NO0KwIca2b9FGCHBn23XsbKRF4lDtE",
      //     }
      //   }
      // );
      // const data = await response.json()
      // console.log("getServerSideProps  data:", data);
    })()
  })

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

      {/* <h2>User {token}</h2> */}

      <div>
        <h1>Transactions</h1>
        <Link href="/"> ← Back to home</Link> <Link href="/blog">TO BLOG</Link>
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
//    const { pageNum } = store.getState().transactions;

//    store.dispatch(setInitialCounter({amount:10, type: 'start'}));

//     // store.dispatch(getAllTransactions.initiate({ pageNum: 1 }));
//     // const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     // store.dispatch(getPokemonByName.initiate('bulbasaur'));
//     // const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     // // console.log("store.getState().transactions:", store.getState().transactions);
//     // // store.dispatch(setInitialTransactions(result?.data));

//     // return { ddd: result };

//     // const res = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
//     // const json = await res.json()
//     // console.log("NAME", json);

//     return { ddd: 'pageNum' }
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
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3Nzk0NTcxOSwiZXhwIjoxNjc5MTU1MzE5fQ.QSy4e8Qtlmu4tKzK9-i5WfRUhDSrdGjdRx7Cnfb3sac`;
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

// ========================================================
