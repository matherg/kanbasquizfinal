import React from "react";
import CounterReducer from "./CounterRedux/counterReducer";
import CounterRedux from "./CounterRedux";
import HelloRedux from "./helloRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";


const ReduxExamples = () => {

    return(
        <div>
            <h2>Redux Examples</h2>
            <CounterRedux/>
            <AddRedux/>
            <HelloRedux/>
            <TodoList/>
        </div>
    );
};

export default ReduxExamples