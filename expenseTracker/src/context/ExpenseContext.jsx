import { createContext, useContext } from 'react';
import useExpense from '../hooks/useExpense';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const value = useExpense();

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpensesContext = () => useContext(ExpenseContext);
