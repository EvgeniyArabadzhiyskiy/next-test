import Head from "next/head";
import Link from "next/link";
import { wrapper } from "@/redux/store";
import { useEffect, useState } from "react";

import {
  getAllTransactions,
  useDeleteTransactionMutation,
  useGetAllTransactionsQuery,
  getRunningQueriesThunk,
} from "@/redux/walletApi";

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getAllTransactions.initiate());
  const [result] = await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {
      initialData: result.data,
    },
  };
});

const TransactionsList = ({ initialData }) => {
  const { data } = useGetAllTransactionsQuery(undefined,{
    skip: typeof window === "undefined",
  });

  const [result, setResult] = useState(initialData);

  useEffect(() => {
    if (data?.transactions) {
      setResult(data);
    }
  }, [data]);

  const [deleteTransactionRTKQ] = useDeleteTransactionMutation();

  const deleteTransaction = (id) => {
    deleteTransactionRTKQ(id);
  };

  return (
    <>
      <Head>
        <title>Transactions</title>
        <meta name="description" content="Transactions List" />
      </Head>

      <div>
        <h1>Transactions</h1>

        <Link href="/"> ← Back to home</Link>
      </div>

      <ul className="transactions-list">
        {result?.transactions &&
          result?.transactions.map((item) => {
            return (
              <li key={item._id}>
                {item.category}
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
