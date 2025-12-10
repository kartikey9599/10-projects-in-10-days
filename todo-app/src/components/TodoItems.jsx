import React from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react'; // optional: remove if you don't have lucide

const TodoItems = ({
  tasks,
  onToggle,
  onDelete,
  onStartEdit,
  editingId,
  editText,
  setEditText,
  onSaveEdit,
  onCancelEdit,
}) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-slate-500 mt-6">
        No tasks yet — add your first task!
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 rounded"
              aria-label={`Mark ${task.text} ${
                task.completed ? 'incomplete' : 'complete'
              }`}
            />

            {/* editing input */}
            {editingId === task.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSaveEdit(task.id);
                  if (e.key === 'Escape') onCancelEdit();
                }}
                className="flex-1 bg-transparent outline-none text-sm truncate"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 text-sm truncate ${
                  task.completed
                    ? 'line-through text-slate-400'
                    : 'text-slate-800'
                }`}
              >
                {task.text}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-3">
            {editingId === task.id ? (
              <>
                <button
                  onClick={() => onSaveEdit(task.id)}
                  className="px-3 py-1 rounded-md bg-green-600 text-white text-sm"
                  aria-label="Save edit"
                >
                  Save
                </button>
                <button
                  onClick={onCancelEdit}
                  className="px-3 py-1 rounded-md bg-gray-200 text-sm"
                  aria-label="Cancel edit"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onStartEdit(task.id, task.text)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Edit task"
                >
                  {/* fallback to simple emoji if you don't use lucide */}
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Delete task"
                >
                  <span role="img" aria-label="delete">
                    🗑️
                  </span>
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoItems;
