import Head from "next/head";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import { useEffect, createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Counter from "@/components/Counter/Counter";

import {
  getAllTransactions,
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  getRunningQueriesThunk,
  useAddTransactionMutation,
  walletApi,
} from "@/redux/walletApiService/walletApi";

import {
  getTransactions,
  setInitialTransactions,
  setNextPage,
  setPrevPage,
} from "@/redux/transactions-slice";

import { setInitialCounter } from "@/redux/counter/counter";

import { setToken } from "@/redux/auth/authSlice";
import axios from "axios";
import { useServerRedirect } from "@/lib/useServerRedirect";
import { parseCookies } from "nookies";
import { useAddToCache } from "@/lib/useAddToCache";
import { useRemoveFromCache } from "@/lib/useRemoveFromCache";

const transData = {
  amount: 500,
  category: "WODA",
  typeOperation: "expense",
  comment: "Fruits",
  // date: "Wed Apr 05 2023 21:43:29 GMT+0300 (Восточная Европа, летнее время)",
  // Wed Apr 05 2023 21:43:44 GMT+0300 //==15==
  date: "Wed Apr 05 2023 21:41:36 GMT+0300 (Восточная Европа, летнее время)",
  // date: new Date().toString(),
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    // const { authToken } = parseCookies(context);

    // const { isLoggedIn } = store.getState().auth;
    // console.log("isLoggedIn:", isLoggedIn);

    // if (!isLoggedIn) {
    //   return {
    //     redirect: {
    //       destination: "/login",
    //     },
    //   };
    // }

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

    // if (authToken) {
    // store.dispatch(setToken(authToken));

    const { pageNum } = store.getState().transactions;
    store.dispatch(getAllTransactions.initiate({ pageNum }));
    const [result] = await Promise.all(
      store.dispatch(getRunningQueriesThunk())
    );
    // console.log("result:", result);
    // store.dispatch(setInitialTransactions(result.data || []));
    // }

    store.dispatch(setInitialCounter({ amount: 10, type: "start" }));

    return { props: {} };
  }
);

const TransactionsList = () => {
  // const [isSkip, setIsSkip] = useState(true);

  const dispatch = useDispatch();
  const { transactions, pageNum } = useSelector((state) => state.transactions);

  const { addTransactionCache } = useAddToCache();
  const [addTransactionRTKQ] = useAddTransactionMutation();

  const { removeTransactionCache } = useRemoveFromCache();
  const [deleteTransactionRTKQ] = useDeleteTransactionMutation();

  const { data = [] } = useGetAllTransactionsQuery(
    { pageNum }
    // { skip: isSkip }
  );

  
  const  onUpdateCache = async () => {

  };

  // useEffect(() => {
  //   if (data.length === 0) return;

  //   dispatch(getTransactions(data));
  // }, [data, dispatch]);

  
  const onNextPage = () => {
    dispatch(setNextPage());

    // setIsSkip(false);
  };

  const onPrevPage = () => {
    dispatch(setPrevPage());
  };

  const addTransaction = async () => {
    const { data } = await  addTransactionRTKQ(transData);
    addTransactionCache(data);
  };

  const deleteTransaction = async (id) => {
    const { data } = await deleteTransactionRTKQ(id);
    removeTransactionCache(data);
  };

  // const visiblePage = () => {
  //   const PAGE_LIMIT = 5;
  //   const startNum = (pageNum - 1) * PAGE_LIMIT;
  //   const endNum = pageNum * PAGE_LIMIT;

  //   const visiblePage = transactions.slice(startNum, endNum);

  //   if (visiblePage.length === 0) {
  //     return transactions.slice(startNum - PAGE_LIMIT, endNum - PAGE_LIMIT);
  //   }

  //   return visiblePage;
  // };

  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="Transactions List" />
      </Head>


      <div>
        <h1>Transactions</h1>
        <Link href="/"> ← Back to home</Link> <Link href="/blog">TO BLOG</Link>
        <button type="button" onClick={onNextPage}>
          Next Page
        </button>
        <button type="button" disabled={pageNum <= 1} onClick={onPrevPage}>
          Prev Page
        </button>
        <button onClick={onUpdateCache}>Add post to cache</button>
      </div>

      <Counter />

      <ul className="transactions-list">
        {data &&
          data.map((item) => {
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
      <button type="button" onClick={addTransaction}>
        NEW TRANSACTION
      </button>
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

// import axios from "axios";
// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDeleteTransactionMutation } from "@/redux/walletApiService/walletApi";

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

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3Nzk0NTcxOSwiZXhwIjoxNjc5MTU1MzE5fQ.QSy4e8Qtlmu4tKzK9-i5WfRUhDSrdGjdRx7Cnfb3sac`;
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// const getTransact = async (pageNum) => {
//   const { data } = await axios(
//     `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${pageNum}&limit=5`
//   );
//   return data;
// };

// const TransactionsContext = createContext();

// const TransactionsProvider = ({ children }) => {
//   const [isSkip, setIsSkip] = useState(true);
//   const [transactions, setTransactions] = useState([]);
//   const [pageNum, setPageNum] = useState(1);
//   // console.log("TransactionsProvider  pageNum:", pageNum);

//   useEffect(() => {
//     if (isSkip) return;
//     const fetchData = async () => {
//       const  data  = await getTransact(pageNum);
//       // console.log("fetchData  data:", data);
//       // setTransactions(data?.transactions);
//       setTransactions((prev) => [...prev, ...data?.transactions]);
//     };

//     fetchData();
//   }, [isSkip, pageNum]);

//   const handleNextPage = () => {
//     setIsSkip(false)
//     setPageNum(pageNum + 1);
//   };

//   return (
//     <TransactionsContext.Provider
//       value={{
//         transactions,
//         handleNextPage,
//         setTransactions,
//       }}
//     >
//       {children}
//     </TransactionsContext.Provider>
//   );
// };

// const TransactionsList = () => {
//   // const [isSkip, setIsSkip] = useState(true);
//   const { transactions, handleNextPage, setTransactions } = useContext(TransactionsContext)

//   // useEffect(() => {
//   //   (async () => {
//   //     // const data = await getTransact(1)
//   //     const res = await fetch(
//   //       `https://wallet-backend-xmk0.onrender.com/api/transactions?page=${1}&limit=5`,{
//   //         headers: {
//   //           ["Authorization"]: `Bearer ${token}`,
//   //         }
//   //       }
//   //     );

//   //     const data = await res.json()
//   //     // console.log("getTransact  data:", data);

//   //     // setResult(data?.transactions);
//   //   })();
//   // }, []);

//   return (
//     <>
//       <Head>
//         <title>Transactions</title>
//         <meta name="description" content="Transactions List" />
//       </Head>

//       <div>
//         <h1>Transactions</h1>
//         <Link href="/"> ← Back to home</Link> <Link href="/blog">TO BLOG</Link>
//         <button type="button" onClick={handleNextPage}>
//           Next Page
//         </button>
//       </div>

//       <Counter />

//       <ul className="transactions-list">
//         {transactions &&
//           transactions.map((item) => {
//             return (
//               <li key={item._id}>
//                 <span>{item.category}</span>
//                 <button type="button">DELETE</button>
//               </li>
//             );
//           })}
//       </ul>
//     </>
//   );
// };

// const WrappedTransactionsList = () => (
//   <TransactionsProvider>
//     <TransactionsList />
//   </TransactionsProvider>
// )

// export default WrappedTransactionsList

// export default TransactionsList;
