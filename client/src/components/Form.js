import React, { useState, useContext, useRef } from "react";
import { TodoContext } from '../context/TodoContext'
import styled from 'styled-components'
import { PlusSquareOutlined } from '@ant-design/icons'

const FormStyle = styled.div`
    form{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input{
      padding-left: 1rem;
      border-radius: 4px;
      border: 1px solid #707070;
      font-size: 1.6rem;
      width: 28rem;
      height: 2.8rem;
    }
    button{
      display: flex;
      border: none;
      background: transparent;
      color: #EEF4ED;
      font-size: 2.6rem;
      &:hover{
        color: #0B2545;
        background: transparent;
      }
    }
`;

const Todo = () => {
  const [value, setValue] = useState("");
  const { addHandler } = useContext(TodoContext)
  const inputRef = useRef(null);
  
   
  const addTodoHandler =(e => {
    e.preventDefault();
    addHandler(value);
    setValue("");
    inputRef.current.focus();
  });


  const handleInput = e => {
    setValue(e.target.value);
  };
  
  return (
    <>
      <FormStyle>
        <form onSubmit={addTodoHandler}>
          <input placeholder="Tidy up your room!" value={value} onChange={handleInput} ref={inputRef} required />
          <button type="submit"><PlusSquareOutlined /></button>
        </form>
      </FormStyle>
    </>
  );
};

export default Todo;
