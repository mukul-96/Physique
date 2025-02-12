interface TotalSalesCardProp {
  count: number;
  
}

const TotalSalesCard = ({
  count,
  }: TotalSalesCardProp) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-neutral-200/20">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-neutral-500">Total Sales</p>
          <h3 className="text-2xl font-bold text-neutral-800 mt-1">${count}</h3>
          
        </div>
        <div className="p-2 bg-blue-100 rounded-lg" id="el-klk3wx8b">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" id="el-0lz7hu71">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" id="el-dfjjrkx8"></path>
                </svg>
            </div>
      </div>
    </div>
  );
};

export default TotalSalesCard;
