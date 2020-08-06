import React, { useState, useRef } from "react";
import styled from 'styled-components'
import { EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons'
const ItemStyle = styled.div`
    color: #8DA9C4;
    &:not(:last-child){
      margin-bottom: 1rem;
    }
    p{
      margin-bottom: 0;
      width: 30%;
      font-size: 1.6rem;
    }
    .list{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    form{
      display: flex;
    }
    input{
      font-size: 1.6rem;
      border: none;
      background: transparent;
      width: 100%;
    }
    button{
      background: none;
      border: none;
      margin-left: auto;
      cursor: pointer;
    }
`;

const Item = ({ id, title, edit, complete, handleDone, removeHandler }) => {
  const [input, setInput] = useState(title);
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(null);
  const saveItem = e => {
    e.preventDefault();
    const item = {title: input, completed: false };
    edit(id, item);
    setEditable(!editable);
  };
  const editHandler = ()=>{
    setTimeout(()=>{
      inputRef.current.focus()
    }, 100)
    setEditable(!editable)
  }
  const edidContent = () => {
    return editable ? (
      <form onSubmit={saveItem}>
        <input value={input} onChange={e => setInput(e.target.value)} ref={inputRef}/>
        <button type="submit"><SaveOutlined style={{fontSize: '2rem'}} /></button>
      </form>
    ) : (
      <div className="list">
        <p
          style={complete ? { textDecoration: "line-through" } : {}}
          onClick={() => handleDone(id)}>
          {title}
        </p>
        <div className="icons">
          <EditOutlined style={{fontSize: '2rem', marginRight: "1rem" }} 
            onClick={editHandler}/>
          <DeleteOutlined style={{fontSize: '2rem'}} 
            onClick={() => removeHandler(id)}/>
        </div>
      </div>
    );
  };
  return (
        <ItemStyle>
          <li>{edidContent()}</li>
        </ItemStyle>
        );
};

export default Item;
