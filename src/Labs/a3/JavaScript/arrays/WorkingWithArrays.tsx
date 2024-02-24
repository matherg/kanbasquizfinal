import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindIndex from "./FindIndex";
import FindFunction from "./FindFunction";
import FilterFunction from "./FilterFunction";

function WorkingWithArrays () {
    var functionScoped = 2;
    let blockScoped = 5;
    const constant1 = functionScoped - blockScoped;
    let numberArray1 = [1, 2, 3, 4, 5];
    let stringArray1 = ['string1', 'string2'];

    let variableArray1 = [
        functionScoped,   blockScoped,
        constant1,        numberArray1,   stringArray1
    ];
    return (
        <>
        <h2>Working with Arrays</h2>
            numberArray1 = {numberArray1}
            stringArray1 = {stringArray1}
            variableArray1 = {variableArray1}
            <AddingAndRemovingDataToFromArrays/>
            <ArrayIndexAndLength/>
            <ForLoops/>
            <MapFunction/>
            <FindIndex/>
            <FindFunction/>
            <FilterFunction/>
        </>
    )
}

export default WorkingWithArrays