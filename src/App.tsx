import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: string;
    checked: boolean;
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // // console.log(e.target.value);
  //   setInputValue(e.target.value);
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  
  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // 新しいTodoを作成
    const newTodo: Todo = {
      inputValue: inputValue,
      id: uuidv4(),
      checked: false,
    };
    if (inputValue.length >= 1) {
    setTodos([newTodo, ...todos]);
    setInputValue("");
    }
  };
  

  // チェックボックス
const handleEdit = (id: string, inputValue: string) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.inputValue = inputValue;
    }
    return todo;
  });

  setTodos(newTodos);
};

const handleChecked = (id: string ,checked: boolean) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.checked = !checked;
    }
    return todo;
  });

  setTodos(newTodos);
};

const handleDelete = (id: string) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  setTodos(newTodos);
};

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with Typescript</h2>
        <form onSubmit={handleSubmit}>
        <TextField id="required" label="TODOを入力" variant="outlined"
          size="small"
          value={inputValue}
          onChange={(e) => {handleChange(e)}}
          >
          </TextField>
          {/* <input
            value={inputValue}
            type = "text"
            onChange={(e) => handleChange(e)}
            /> */}
          <Button variant="contained" 
          onClick={(e) => {handleSubmit(e)}}>作成</Button>
        </form>
        <ul className='todoList'
        >
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
            type = "text"
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            className="inputText"
            value={todo.inputValue}
            disabled={todo.checked}
            />
               <input
            type = "checkbox"
            onChange={(e) => handleChecked(todo.id, todo.checked)}
            />
            <button onClick = {() => handleDelete(todo.id)}>消</button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default App;
