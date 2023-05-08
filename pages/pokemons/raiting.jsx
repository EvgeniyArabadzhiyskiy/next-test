import useAuthGuard from "@/lib/useAuthGuard";
import { wrapper } from "@/redux/store";
import { setNextPage, setPrevPage } from "@/redux/transactions-slice";
import { userApi } from "@/redux/walletApiService/userApi";
import {
  useGetAllTransactionsQuery,
  getAllTransactions,
  getRunningQueriesThunk,
  walletApi,
  useAddTransactionMutation,
} from "@/redux/walletApiService/walletApi";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
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
    async (context) => {
      const { authToken } = parseCookies(context);

      if (!authToken) {
        return { redirect: { destination: "/login", permanent: false } };
      }

      const res = await dispatch(getAllTransactions.initiate({ pageNum: 1 }));

      return { props: {} };
    }
);

const RaitingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const {AuthGuardPage} = useAuthGuard()

  const { token } = useSelector((state) => state.auth);
  const { transactions, pageNum } = useSelector((state) => state.transactions);

  const [addTransactionRTKQ] = useAddTransactionMutation();

  const { data = [] } = useGetAllTransactionsQuery(
    { pageNum },
    { skip: !token }
  );
  // console.log("RE-RENDER");

  const onNextPage = async () => {
    dispatch(setNextPage());
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

export default RaitingPage;

// RaitingPage.getLayout = function getLayout(page) {
//   return <PokemonPageLayout>{page}</PokemonPageLayout>;
// };
