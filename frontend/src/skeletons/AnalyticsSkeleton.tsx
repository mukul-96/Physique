export default function AnalyticsSkeleton() {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Turnover Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="h-4 bg-blue-300 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-blue-400 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-blue-200 rounded w-1/2"></div>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-orange-300 text-white p-6 rounded-lg shadow-md animate-pulse">
              <div className="h-4 bg-orange-300 rounded w-1/3 mb-4"></div>
              <div className="h-8 bg-orange-400 rounded w-2/3 mb-2"></div>
              <div className="h-6 bg-orange-200 rounded w-1/2"></div>
            </div>
          </div>
  
          {/* Charts Section */}
          <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
  
          {/* Subscription Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow-md rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="p-4 bg-white shadow-md rounded-lg animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
  
          {/* Bar Chart Section */}
          <div className="mt-8">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  