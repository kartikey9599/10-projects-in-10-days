import React, { useState } from 'react';
import { useExpensesContext } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, deleteExpense, editExpense } = useExpensesContext();
  const [editingId, setEditingId] = useState(null);
  const [temp, setTemp] = useState({ title: '', amount: '', date: '' });

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setTemp(expense);
  };

  const handleEditSave = () => {
    editExpense(temp);
    setEditingId(null);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Your Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="text-gray-500 text-sm">No expenses added yet.</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center"
            >
              {editingId === expense.id ? (
                <div className="w-full space-y-2">
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={temp.title}
                    onChange={(e) =>
                      setTemp({ ...temp, title: e.target.value })
                    }
                  />
                  <input
                    className="w-full px-3 py-2 border rounded-lg"
                    value={temp.amount}
                    onChange={(e) =>
                      setTemp({ ...temp, amount: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={temp.date}
                    onChange={(e) => setTemp({ ...temp, date: e.target.value })}
                  />

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleEditSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-gray-800 font-medium">{expense.title}</p>
                    <p className="text-gray-500 text-sm">{expense.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-indigo-600 font-semibold text-lg">
                      ₹{expense.amount}
                    </span>

                    <button
                      onClick={() => startEdit(expense)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
