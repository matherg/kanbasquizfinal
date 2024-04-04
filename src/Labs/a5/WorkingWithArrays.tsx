import React, {useEffect, useState} from "react";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const [todos, setTodos] = useState<any[]>([]);




const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: { id: any; }) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };

    const deleteTodo = async (todo: any) => {
        try {
            const response = await axios.delete(
                `${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setErrorMessage(error.response.data.message);
        }
    };
    const updateTodo = async () => {
        try {
            const response = await axios.put(
                `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
                t.id === todo.id ? todo : t)));
        } catch (error) {
            console.log(error);
            // @ts-ignore
            setErrorMessage(error.response.data.message);
        }
    };



        const API = "${API_BASE}/a5/todos";
    return (
        <div>
            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2">
                    {errorMessage}
                </div>
            )}
            <h3>Working with Arrays</h3>
            <input type="number" value={todo.id}
                   onChange={(e) => setTodo({
                       ...todo, id: Number(e.target.value) })}/>
            <input type="text" value={todo.title}
                   onChange={(e) => setTodo({
                       ...todo, title: e.target.value })}/>
            <button onClick={updateTitle} >
                Update Title
            </button>
            <textarea value={todo.description}
                      onChange={(e) => setTodo({ ...todo,
                          description: e.target.value })} />
            <input value={todo.due} type="date"
                   onChange={(e) => setTodo({
                       ...todo, due: e.target.value })} />
            <label>
                <input checked={todo.completed} type="checkbox"
                       onChange={(e) => setTodo({
                           ...todo, completed: e.target.checked })} />
                Completed
            </label>
            <button onClick={postTodo}> Post Todo </button>
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>
            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>
            <h4>Retrieving an Item from an Array by ID</h4>
            <input value={todo.id}
                   onChange={(e) => setTodo({ ...todo,
                       id: Number(e.target.value)})}/>
            <a href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>
            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                Get Completed Todos
            </a>
            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                Create Todo
            </a>
            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>
            <h3>Set Completed</h3>
            <input type="checkbox"
                   onChange={(e) => setTodo({ ...todo,
                       completed: Boolean(e.target.checked)})}/>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Update Completed
            </a>
            <h3>Set Description</h3>
            <input type="text"
                   onChange={(e) => setTodo({ ...todo,
                       description: e.target.value})}/>
            <a href={`${API}/${todo.id}/description/${todo.description}`}>
                Update Description
            </a>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input checked={todo.completed}
                               type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>
                        <button onClick={() => removeTodo(todo)} >
                            Remove
                        </button>
                        <button onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={createTodo} >
                Create Todo
            </button>
            <button onClick={() => deleteTodo(todo)}
                    className="btn btn-danger float-end ms-2">
                Delete Todo
            </button>
            <button onClick={postTodo}>
                Post Todo
            </button>
            <button onClick={updateTodo}>
                Update Todo
            </button>
        </div>
    );
}
export default WorkingWithArrays;