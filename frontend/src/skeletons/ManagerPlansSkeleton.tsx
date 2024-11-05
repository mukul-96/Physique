
export default function ManagerPlansSkeleton() {
  return (
    <div className="flex">
      <div className="border shadow-lg rounded-lg w-full">
        <li className="relative bg-white border rounded-lg p-6 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
            </div>

            <h3 className="mt-10 h-6 bg-gray-300 rounded w-3/4"></h3>

            <p className="text-3xl font-semibold text-custom-brown mt-2">
                <span className="h-8 bg-gray-300 rounded w-16 inline-block"></span>
                <button className="ml-2 h-6 bg-gray-300 rounded w-12"></button>
            </p>
            <p className="h-6 bg-gray-300 rounded w-1/2 mt-2"></p>

            <hr className="my-4 border-gray-300" />

            <ul className="space-y-2">
                {Array.from({ length: 8 }, (_, index) => (
                    <li key={index} className="flex items-center">
                        <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                        <span className="h-6 bg-gray-300 rounded w-3/4"></span>
                    </li>
                ))}
            </ul>
        </li>
    </div>
        <div className="border shadow-lg rounded-lg w-full">
            <li className="relative bg-white border rounded-lg p-6 animate-pulse">
                <div className="flex justify-between items-center">
                    <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
                </div>

                <h3 className="mt-10 h-6 bg-gray-300 rounded w-3/4"></h3>

                <p className="text-3xl font-semibold text-custom-brown mt-2">
                    <span className="h-8 bg-gray-300 rounded w-16 inline-block"></span>
                    <button className="ml-2 h-6 bg-gray-300 rounded w-12"></button>
                </p>
                <p className="h-6 bg-gray-300 rounded w-1/2 mt-2"></p>

                <hr className="my-4 border-gray-300" />

                <ul className="space-y-2">
                    {Array.from({ length: 8 }, (_, index) => (
                        <li key={index} className="flex items-center">
                            <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
                            <span className="h-6 bg-gray-300 rounded w-3/4"></span>
                        </li>
                    ))}
                </ul>
            </li>
        </div>
    </div>
    
);
}
