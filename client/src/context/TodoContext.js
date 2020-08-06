import React, { createContext, useReducer } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

const BaseURL = window.location.hostname === "locahost" ? "http://localhost:5000" : "https://todos.shohin.vercel.app";

const instanceAPI = axios.create({
  baseURL: BaseURL,
  headers: { 'content-type': 'application/json' }
});

const initialState = {
  loading: false,
  error: "",
  data: []
}

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case "remove":
      return {
        loading: false,
        error: "",
        data: state.data.filter(item => item.id !== action.payload)
      }
    case "edit":
      return {
        loading: true,
        error: "",
        data: [...state.data.map(item => item.id === action.payload.id ? (item = action.payload.val) : item)]
      };
    case "done":
      return {
        loading: false,
        error: "",
        data: [...state.map(item => item.id === action.payload ? { ...item, complete: !item.complete } : item)]
      };
    case "fetch":
      return { loading: true, error: "", data: [...action.payload] };
    default:
      return state;
  }
}


export default function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const fetchTodos = async () => {
    await instanceAPI.get("/todos").then(data => {
      dispatch({ type: "fetch", payload: data.data });
    }).catch(error => {
      console.log(error);
    })
  };
  const addHandler = async (val) => {
    try {
      await instanceAPI.post("/", { title: val, completed: false }).then(data => {
        dispatch({ type: "add", payload: val });
        fetchTodos()
      })

    } catch (error) {
      console.log(error);
    }
  };
  const removeHandler = async (id) => {
    try {
      await instanceAPI.delete(`/${id}`, id)
      dispatch({ type: "remove", payload: id });
      fetchTodos()
    } catch (error) {
      console.log(error)
    }

  };

  const editHandler = async (id, val) => {
    try {
      await instanceAPI.put(`/${id}`, val, id)
      dispatch({ type: "edit", payload: { id, val } });
      fetchTodos()
    } catch (error) {
      console.log(error)
    }
  };

  const completeHandler = id => {
    dispatch({ type: "done", payload: id });
  };

  return (
    <TodoContext.Provider value={{ todos, addHandler, editHandler, completeHandler, removeHandler, fetchTodos }}>
      {children}
    </TodoContext.Provider>
  )
}
