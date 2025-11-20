import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseProvider>
          <ExpenseForm />
          <ExpenseList />
        </ExpenseProvider>
      </div>
    </div>
  );
}

export default App;
