import React, { useState } from 'react';
import './App.css';

function App() {
    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim() !== '') {
            setTodos([...todos, input]);
            setInput('');
        }
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h1>我的待辦事項</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="輸入新任務..."
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button onClick={addTodo}>添加</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <span>{todo}</span>
                        <button onClick={() => deleteTodo(index)}>刪除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;