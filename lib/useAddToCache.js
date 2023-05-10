import { walletApi } from "@/redux/walletApiService/walletApi";
import { useDispatch, useSelector } from "react-redux";

export const useAddToCache = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);

  const addTransactionCache = (data) => {
    
    const PAGE_LIMIT = 5;
    const page = Math.ceil(data.position / PAGE_LIMIT);
    const allPages = transactions.length / PAGE_LIMIT;
    
        let newData = data;
        for (let i = page; i <= allPages; i += 1) {
            dispatch(
                walletApi.util.updateQueryData("getAllTransactions",{ pageNum: i },
                    (prev) => {
                    const newCache = [newData, ...JSON.parse(JSON.stringify(prev))]
                    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
                    
                    newData = newCache.pop();
                    return  newCache;
                    }
                )
            );
        }
    };

    return { addTransactionCache }
  
};
