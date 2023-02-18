// import { useState } from "react";
import { decrementCounter, incrementCounter } from "@/redux/counter/counter";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const dispatch = useDispatch()
    const {counter} = useSelector(st => st.counter)
    // const [counter , setCounter] = useState()

    const onIncrement = () => {
        dispatch(incrementCounter())
    }

    const onDecrement = () => {
        dispatch(decrementCounter())
    }

    return <>
    <h1>Counter</h1>
    <h2>{counter}</h2>
    <button onClick={onIncrement} > Добавить </button>
    <button onClick={onDecrement}> Отнять </button>
    </>
}
 
export default Counter;