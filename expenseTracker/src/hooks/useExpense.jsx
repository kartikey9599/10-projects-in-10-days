import { useEffect, useState } from 'react';

const useExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      id: crypto.randomUUID(),
      ...expense,
    };
    setExpenses((prev) => [...prev, newExpense]);
  };
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };
  const editExpense = (id, updatedData) => {
    setExpenses((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updatedData } : exp))
    );
  };
  return { expenses, addExpense, deleteExpense, editExpense };
};

export default useExpense;
