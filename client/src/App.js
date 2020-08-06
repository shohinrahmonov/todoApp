import React from 'react';
import './App.css';
import Todo from './Todo'
import Provider from './context/TodoContext'
function App() {
  return (
    <Provider>
      <Todo />
    </Provider>
  );
}

export default App;
