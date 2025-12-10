import React, { useEffect, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const STORAGE_KEY = 'react_todo_tasks_v1';

const Todo = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTasks(JSON.parse(raw));
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  }, []);

  // persist tasks on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  }, [tasks]);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString(), // simple unique id
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((s) => [newTask, ...s]);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    // if we were editing the deleted item, cancel edit
    if (editingId === id) {
      setEditingId(null);
      setEditText('');
    }
  };

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) {
      // optional: do not allow empty text; you can show UI feedback here
      return;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-2 gap-2">
        <img src={todo_icon} alt="Icon" className="w-8" />
        <h1 className="font-semibold text-3xl">To-Do List</h1>
      </div>

      <div className="flex items-center my-6 bg-gray-100 rounded-full px-3">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-4 pr-2 placeholder:text-slate-600"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add your task"
          aria-label="New task"
        />
        <button
          onClick={addTask}
          className="border-none rounded-full bg-orange-600 w-32 h-12 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <TodoItems
          tasks={tasks}
          onToggle={toggleComplete}
          onDelete={deleteTask}
          onStartEdit={startEdit}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
        <div>
          {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={clearCompleted}
            className="px-3 py-1 rounded-md bg-gray-200"
            aria-label="Clear completed tasks"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
