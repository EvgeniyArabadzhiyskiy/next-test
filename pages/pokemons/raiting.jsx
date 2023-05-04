import { wrapper } from "@/redux/store";
import { setNextPage, setPrevPage } from "@/redux/transactions-slice";
import {
  useGetAllTransactionsQuery,
  getAllTransactions,
  getRunningQueriesThunk,
  walletApi,
  useAddTransactionMutation,
} from "@/redux/walletApiService/walletApi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

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
  ({ dispatch }) =>
    async () => {
      const res = await dispatch(getAllTransactions.initiate({ pageNum: 1 }));

      // const [result] = await Promise.all(
      //   dispatch(getRunningQueriesThunk())
      // );

      return { props: {} };
    }
);

const RaitingPage = () => {
  const dispatch = useDispatch();
  const { transactions, pageNum } = useSelector((state) => state.transactions);

  const [addTransactionRTKQ] = useAddTransactionMutation();

  const ddd = walletApi.endpoints.getAllTransactions.useQuery({pageNum});
  // console.log("RaitingPage  ddd:", ddd);
  // const { data = [] } = useGetAllTransactionsQuery({ pageNum });

  const onNextPage = () => {
    dispatch(setNextPage());

    // setIsSkip(false);
  };

  const onPrevPage = () => {
    dispatch(setPrevPage());
  };

  const addTransaction = () => {
    addTransactionRTKQ(transData);
  };

  return (
    <>
      <Link href="/"> ← Back to home</Link>

      <button type="button" onClick={onNextPage}>
        Next Page
      </button>

      <button type="button" disabled={pageNum <= 1} onClick={onPrevPage}>
        Prev Page
      </button>

      <ul className="transactions-list">
        {ddd.data &&
          ddd.data.map((item) => {
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

export default RaitingPage;

// RaitingPage.getLayout = function getLayout(page) {
//   return <PokemonPageLayout>{page}</PokemonPageLayout>;
// };
