import { BASE_URL } from "@/constants/apiPath";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTM0ZGFhMTQyNGVhZDExNWVhNTJhNSIsImlhdCI6MTY3Nzk0NTcxOSwiZXhwIjoxNjc5MTU1MzE5fQ.QSy4e8Qtlmu4tKzK9-i5WfRUhDSrdGjdRx7Cnfb3sac`;

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // console.log("token*****************************", token);
    
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
