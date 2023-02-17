import axios from "axios";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3NTQ0OTY4OCwiZXhwIjoxNjc2NjU5Mjg4fQ.6gFkCNr2veCVA_bftvsuTlcezKNgwWJ9vQ6MI99zZIQ`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default async function deleteTransaction(req, res) {
  // console.log("BODY", req.body);
  console.log("QUERY", req.query);

  const { id } = req.query;

  const result = await axios.delete(`${BASE_URL}/transactions/${id}`);

  res.status(200).json({ data: result.data });
}
