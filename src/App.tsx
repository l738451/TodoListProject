import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  // 從 localStorage 載入任務，初始化為空陣列
  const [todos, setTodos] = useState<{ text: string; completed: boolean; createdAt: string; note: string }[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState('');
  const [note, setNote] = useState(''); // 新增註解狀態
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // 用於編輯註解的索引

  // 保存任務到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      const now = new Date().toLocaleString(); // 獲取當前時間
      setTodos([...todos, { text: input, completed: false, createdAt: now, note: '' }]);
      setInput('');
      setNote(''); // 清空註解輸入
    }
  };

  const toggleTodo = (index: number) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const updateNote = (index: number, newNote: string) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, note: newNote } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>我的待辦事項</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="輸入新任務..."
          className="todo-input-field"
        />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="輸入註解（可選）..."
          rows={2}
          className="todo-note-input"
        />
        <button onClick={addTodo} className="add-button">新增</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <div className="todo-content" onClick={() => toggleTodo(index)}>
              <span>{todo.text}</span>
              <div className="todo-meta">
                <small>新增時間: {todo.createdAt}</small>
              </div>
            </div>
            <div className="todo-note">
              <textarea
                value={todo.note}
                onChange={(e) => updateNote(index, e.target.value)}
                placeholder="輸入或編輯註解..."
                rows={2}
                className="todo-note-field"
                onClick={(e) => e.stopPropagation()} // 防止點擊觸發 toggleTodo
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;