interface TotalCustomersCardProp {
  count: number;
}

const TotalCustomersCard = ({
  count
}: TotalCustomersCardProp) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-neutral-500">Total Customers</p>
          <h3 className="text-2xl font-bold text-neutral-800 mt-1">{count}</h3>
        </div>
        <div className="p-2 bg-emerald-100 rounded-lg">
          <svg
            className="w-6 h-6 text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TotalCustomersCard;
