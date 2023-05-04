import axios from "axios";

const BASE_URL = "https://wallet-backend-xmk0.onrender.com/api";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3NjY2MzEzMSwiZXhwIjoxNjc3ODcyNzMxfQ.W9CvqyVwufke2XcMuWvPBMBJwxLkhYao1TZnJr6YfMg`;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

console.log("=====================================", axios.defaults.headers);
export default async function handler(req, res) {
  //   console.log("BODY", req.body);
  //   console.log("QUERY", req.query);

  if (req.method === "GET") {
    const { limit } = req.query;

    const result = await axios.get(
      `${BASE_URL}/transactions?page=1&limit=10`
    );

    res.status(200).json({ data: result.data });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    const result = await axios.delete(`${BASE_URL}/transactions/${id}`);

    res.status(200).json({ data: result.data });
  }
}
