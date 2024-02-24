import ModuleList from "./List";
function Modules() {
    return (
        <div>
            <div className="wd-button-container">
                <button className="wd-button collapse-all">Collapse All</button>
                <button className="wd-button view-progress">View Progress</button>
                <button className="wd-button publish-all">Publish All</button>
                <button className="wd-button add-module">+ Module</button>
            </div>
            <ModuleList />
        </div>
    );
}
export default Modules;