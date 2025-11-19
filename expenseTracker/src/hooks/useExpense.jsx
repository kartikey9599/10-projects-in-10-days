import { useEffect, useState } from 'react';

const useExpense = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify('expenses'));
  }, [expenses]);
};
