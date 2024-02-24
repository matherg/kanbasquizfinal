import VariablesAndConstants
    from "./variables/VariablesAndConstants";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import TemplateLiterals from "./string/TemplateLiterals";
import JsonStringify from "./json/JsonStringify";
import House from "./json/House";
import Destructing from "./json/Destructing";

function JavaScript() {
    console.log('Hello World!');
    return(
        <div>
            <h1>JavaScript</h1>
            <VariablesAndConstants/>
            <BooleanVariables/>
            <VariableTypes/>
            <IfElse/>
            <TernaryOperator/>
            <WorkingWithFunctions/>
            <TemplateLiterals/>
            <JsonStringify/>
            <House/>
            <Destructing/>
        </div>
    );
}
export default JavaScript