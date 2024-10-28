
interface expenseDetails {
  title: string;
  cost: number;
}

interface ExpenseLogCardProps {
  expenses: expenseDetails[];
}

export default function ExpenseLogCard({ expenses }: ExpenseLogCardProps) {
  

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg mt-6">
      {expenses && expenses.length > 0 ? (
        <table className="w-full text-left table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border-b-2">S. No.</th>
              <th className="px-4 py-2 border-b-2">Category</th>
              <th className="px-4 py-2 border-b-2">Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{expense.title}</td>
                <td className="px-4 py-2 border-b">${expense.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600 py-4">
          No expenses to display.
        </div>
      )}
    </div>
  );
}
