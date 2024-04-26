import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    const [moduleList, setModuleList] = useState<any[]>([])
    const [module, setModule] = useState({ name: "", description: "",
        _id: "1234"});

    useEffect(() => {
        // Fetch modules for the course from the backend
        client.findModulesForCourse(String(courseId))
            .then((modules) => {
            console.log(modules)   ;
                setModuleList(modules);
            });
    }, [courseId]);

    const handleDeleteModule = (moduleId: string) => {
        // Call the backend function to delete the module
        client.deleteModule(moduleId)
            .then(() => {
                // Remove the deleted module from the module list
                setModuleList(moduleList.filter((module) => module._id !== moduleId));
            });
    };

    const handleAddModule = () => {
        // Call the backend function to create a new module
        client.createModule(courseId, module)
            .then((createdModule) => {
                // Add the created module to the module list
                setModuleList([...moduleList, createdModule]);
            });
    };

    const handleUpdateModule = async () => {
        // Call the backend function to update the module
        await client.updateModule(module);
        // Update the module in the module list
        setModuleList(moduleList.map((m) => (m._id === module._id ? module : m)));
    };

    return (
        <ul className="list-group">
            <li className="list-group-item">
                {/* Input fields for adding/updating module */}
                <button onClick={handleAddModule}>Add</button>
                <button onClick={handleUpdateModule}>Update</button>
                <input
                    value={module.name}
                    onChange={(e) => setModule({ ...module, name: e.target.value })}
                />
                <textarea
                    value={module.description}
                    onChange={(e) => setModule({ ...module, description: e.target.value })}
                />
            </li>
            {/* List of modules */}
            {moduleList
                .filter((m) => m.course === courseId)
                .map((m, index) => (
                    <li key={index} className="list-group-item">
                        <button onClick={() => setModule(m)}>Edit</button>
                        <button onClick={() => handleDeleteModule(m._id)}>Delete</button>
                        <h3>{m.name}</h3>
                        <p>{m.description}</p>
                    </li>
                ))}
        </ul>
    );
}

export default ModuleList;