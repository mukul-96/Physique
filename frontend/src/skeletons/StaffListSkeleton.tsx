const StaffListSkeleton = () => {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100 animate-pulse">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="w-16 h-8 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default StaffListSkeleton;
  