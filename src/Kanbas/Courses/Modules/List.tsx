import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteModule,
    addModule,  updateModule,  setModule,  setModules,
} from "./reducer";
import * as client from "./client";

import { KanbasState } from "../../store";
function ModuleList() {
    const { courseId  } = useParams();

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    useEffect(() => {
        client.findModulesForCourse(Number(courseId))
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };


    const dispatch = useDispatch();
    return (
        <ul className="list-group">
            <li className="list-group-item">
                <button onClick={handleAddModule}>Add</button>
                <button onClick={handleUpdateModule}>Update</button>
                <input
                    value={module.name}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, name: e.target.value }))
                    }/>
                <textarea
                    value={module.description}
                    onChange={(e) =>
                        dispatch(setModule({ ...module, description: e.target.value }))
                    }/>
            </li>
            {moduleList
                .filter((module) => module.course === courseId)
                .map((module, index) => (
                    <li key={index} className="list-group-item">
                        <button
                            onClick={() => dispatch(setModule(module))}>
                            Edit
                        </button>
                        <button
                            onClick={() =>  handleDeleteModule(module._id)}>
                            Delete
                        </button>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                    </li>
                ))}
        </ul>
    );
}
export default ModuleList;