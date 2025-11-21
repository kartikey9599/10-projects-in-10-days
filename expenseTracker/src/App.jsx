import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalCard from './components/TotalCard';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-10 flex flex-col items-center gap-10">
        <div className="w-full max-w-3xl">
          <TotalCard />
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
          <ExpenseForm />
          <ExpenseList />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
