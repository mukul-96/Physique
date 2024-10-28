const ManagerNavbarSkeleton = () => {
    return (
      <div className="flex flex-col h-screen items-center p-4 bg-white w-64">
        <div className="text-2xl font-bold mb-6 text-black bg-gray-300 animate-pulse w-24 h-8 rounded"></div>
  
        <div className="flex-grow"></div>
  
        <div className="flex flex-col space-y-4 w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center py-3 px-4 rounded w-full justify-start text-lg font-semibold bg-gray-300 animate-pulse"
            >
              <div className="mr-3 bg-gray-400 w-6 h-6 rounded-full"></div>
              <div className="bg-gray-400 w-3/4 h-4 rounded"></div>
            </div>
          ))}
        </div>
  
        <div className="flex-grow"></div>
  
        <div className="flex flex-col items-center w-full space-y-4">
          <div className="bg-gray-300 w-12 h-12 rounded-full animate-pulse"></div>
  
          <div className="flex items-center bg-gray-300 py-3 px-4 rounded w-40 shadow-lg shadow-slate-300 justify-start text-lg font-semibold text-white drop-shadow-md animate-pulse">
            <div className="bg-gray-400 w-6 h-6 rounded-full mr-3"></div>
            <div className="bg-gray-400 w-3/4 h-4 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ManagerNavbarSkeleton;
  