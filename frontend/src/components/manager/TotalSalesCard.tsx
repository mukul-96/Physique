
interface TotalSalesCardProp{
    count:number
  }
  
  const TotalSalesCard = ({ count }:TotalSalesCardProp) => {
    return (
      <div className="max-w-sm mx-auto  bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6">
          <h3 className="text-white text-lg font-bold text-center">Sales Figures</h3>
        </div>
        <div className="p-6 flex items-center justify-center">
          <span className="text-5xl font-bold text-gray-800">{count}</span>
        </div>
       
      </div>
    );
  };
  
  export default TotalSalesCard;
  