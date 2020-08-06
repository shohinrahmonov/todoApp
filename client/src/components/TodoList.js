import React, { useContext, useEffect } from "react";
import Item from "./Item";
import { TodoContext } from '../context/TodoContext'
import styled from 'styled-components';

const TodoStyle = styled.div`
    padding-top: 3rem;
    ol{
      list-style: none;
      text-align: left;
      padding-left: 0;
    }
`;

const Todo = () => {
  const {todos, editHandler, completeHandler, removeHandler, fetchTodos} = useContext(TodoContext)

  useEffect(()=>{
    fetchTodos()
  },[])

  if( todos && todos.data.length === 0) return <h2>The List is empty</h2> 
  return (
    <TodoStyle>
      <ol>
        {todos.data.map(todo => {
          return (
            <Item
              key={todo._id}
              id={todo._id}
              title={todo.title}
              edit={editHandler}
              complete={todo.complete}
              handleDone={completeHandler}
              removeHandler={removeHandler}
            />
          );
        })}
      </ol>
    </TodoStyle>
  );
};

export default Todo;
