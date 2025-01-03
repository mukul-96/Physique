export default function BranchPageSkeleton() {
  return (
    <div id="page" className="flex items-center justify-center h-screen bg-gray-100">
      <div id="container" className="relative flex flex-col items-center space-y-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            id="ring"
            className="w-16 h-16 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"
          ></div>
        ))}
        <h3 id="h3" className="text-lg font-medium text-gray-700">
          Loading
        </h3>
      </div>
    </div>
  );
}
