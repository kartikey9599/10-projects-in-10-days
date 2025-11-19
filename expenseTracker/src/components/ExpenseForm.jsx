import { useState } from 'react';

export default function ExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  let addExpense = (e) => {
    e.preventDefault();
    const newExpense = { title, amount, date };
    console.log(newExpense);
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Expense Tracker
      </h1>
      <p className="text-sm text-gray-500 mb-6">Add your expenses here</p>
      <form onSubmit={addExpense} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Title
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Date
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 active:scale-95 transition-transform">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
