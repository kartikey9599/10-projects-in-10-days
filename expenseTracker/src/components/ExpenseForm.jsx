import { useState } from 'react';
import { useExpensesContext } from '../context/ExpenseContext';

export default function ExpenseForm() {
  const { addExpense } = useExpensesContext();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ title, amount, date });
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="w-full max-w-md p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-100">
      <h1 className="text-2xl font-semibold text-indigo-700 mb-1">
        Add Expense
      </h1>
      <p className="text-sm text-indigo-400 mb-6">Fill the details below</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-indigo-600 mb-1">
            Title
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            value={title}
            placeholder="What did you spend on?"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-indigo-600 mb-1">
            Amount
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="number"
            value={amount}
            placeholder="How much did you spend?"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-indigo-600 mb-1">
            Date
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="date"
            value={date}
            placeholder="Expense date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
