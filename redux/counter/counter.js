import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const counterSlise = createSlice({
  name: "counter",

  initialState: {
    counter: {
      amount: 0,
      type: "init",
    },
  },

  reducers: {
    setInitialCounter: (state, action) => {
      state.counter = action.payload;
    },

    incrementCounter: (state) => {
      state.counter.amount += 1;
      state.counter.type = "start"
    },

    decrementCounter: (state) => {
      state.counter.amount -= 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("builder.addCase  HYDRATE:", HYDRATE);
      const nextState = {
        ...state,
        ...action.payload.counter,
      };
    
      if (state.counter.type === "start") {
        nextState.counter = JSON.parse(JSON.stringify(state.counter));

        // nextState.counter = {
        //   ...nextState.counter,
        //   amount: state.counter.amount,
        // };

        // nextState.counter = {
        //   ...nextState.counter,
        //   type: state.counter.type,
        // };
      }
      
      return nextState;

      // if (action.payload.counter.counter === 0) delete action.payload.counter.counter;
    });
  },
});

export const { incrementCounter, decrementCounter, setInitialCounter } =
  counterSlise.actions;

export const counterReduser = counterSlise.reducer;




//===========================================================================
// export const getServerSideProps = async (context) => {
//   const { req, res } = context;

//   // Получаем JWT токен из cookies
//   const token = req.cookies.token;

//   if (!token) {
//     // Если токен не найден, редиректим пользователя на страницу логина
//     res.writeHead(302, { Location: "/login" });
//     res.end();
//     return { props: {} };
//   }

//   try {
//     // Проверяем токен на сервере, чтобы убедиться, что пользователь авторизован
//     const decodedToken = await verifyToken(token);
//     const userId = decodedToken.userId;

//     // Получаем данные пользователя из базы данных или из другого источника
//     const user = await getUserById(userId);

//     // Возвращаем данные пользователя в качестве пропсов
//     return { props: { user } };
//   } catch (err) {
//     // Если токен недействителен, редиректим пользователя на страницу логина
//     res.writeHead(302, { Location: "/login" });
//     res.end();
//     return { props: {} };
//   }
// };



/* Да, в этом случае можно использовать проверку авторизации на
сервере при рендеринге страницы с помощью getServerSideProps.
В функции getServerSideProps можно получить данные авторизации
пользователя из cookies или передать их через заголовки запроса.
Если пользователь не авторизован, можно редиректнуть его на страницу
логина или выдать ошибку 401 Unauthorized.

Например, вот так может выглядеть код для проверки авторизации на
сервере в getServerSideProps:
Этот код проверяет, есть ли у пользователя JWT токен в cookies. 
Если токен не найден, пользователь редиректится на страницу логина. 
Если токен найден, он проверяется на сервере, и если он действительный, 
возвращаются данные пользователя в качестве пропсов. Если токен 
недействительный, пользователь также редиректится на страницу логина.  */