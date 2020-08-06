import React from 'react';
import Form from './components/Form'
import { Wrapper } from './elements/Wrapper'
import TodoList from './components/TodoList'
import styled from 'styled-components'

const TodoStyle = styled.div`
    text-align: center;
    height: 100vh;
    h1{
        color: #8DA9C4;
        font-weight: bold;
        font-size: 2.6rem;
        padding-bottom: 2rem;
    }
    h2{
        font-size: 1.6rem;
        color: #8DA9C4;
        padding-top: 1rem;
    }
`;
const TodoApp = () => {
  
    return ( 
        <>
            <TodoStyle>
                <Wrapper>
                    <h1>Todo App</h1>
                    <Form />
                    <TodoList />
                </Wrapper>
            </TodoStyle>
        </>
     );
}
 
export default TodoApp;