import { useExpensesContext } from '../context/ExpenseContext';

export default function TotalCard() {
  const { expenses } = useExpensesContext();

  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-white/30 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-white/90">
            Total Expenses
          </h2>
          <p className="text-5xl font-extrabold text-white drop-shadow-lg mt-2">
            ₹{total}
          </p>
        </div>

        <div className="text-6xl">💸</div>
      </div>
    </div>
  );
}
