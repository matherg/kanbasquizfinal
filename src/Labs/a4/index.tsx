import React from "react";
import ReduxExamples from "./ReduxExamples";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateSateVariable from "./DateSateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import StringStateVariables from "./StringStateVariables";

const Assignment4 = () => {
    function sayHello() {
        alert("Hello");
    }
    return(
        <>
            <h1>Assignment 4</h1>
            <ArrayStateVariable/>
            <BooleanStateVariables/>
            <ClickEvent/>
            <Counter/>
            <DateSateVariable/>
            <EventObject/>
            <ObjectStateVariable/>
            <ParentStateComponent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <PassingDataOnEvent/>
            <StringStateVariables/>
            <ReduxExamples/>

        </>
    );
};
export default Assignment4;