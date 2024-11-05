import { useFetchBranchDetails } from "../hooks";
import BranchManagerCard from "../components/BranchManagerCard";
import FeaturesCard from "../components/FeaturesCard";
import Plans from "../components/Plans";
import Trainers from "../components/Trainers";

import { useParams } from "react-router-dom";

import Images from "../components/Images";
import { Testimonial } from "../components/Testimonial";
import Navbar from "../components/head/Navbar";

export default function BranchPage() {
  const { id } = useParams<{ id: string }>();
  const safeId = id || null;

  const { branchDetails, loading, error } = useFetchBranchDetails(safeId);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20">Error loading branch details: {error}</div>;
  if (!branchDetails) return <div className="text-center mt-20">No branch details available</div>;

  const manager = branchDetails.manager || null;
  const reviews = branchDetails.reviews;
  const trainers = branchDetails.staff.filter(
    (staff) => staff.designation === "Trainer"
  );

  return (
    <div className="min-h-screen overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex justify-center">
        <Navbar branchId={id} />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-10">
        <Images />
      </div>

      <div className="z-10 p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto">
        <div className="flex flex-col w-full lg:w-2/3 border-b-2 p-4">
          <h1 className="text-3xl font-bold mb-1 font-serif">PHYSIQUE</h1>
          <h2 className="text-xl font-semibold mb-1">{branchDetails.name}</h2>
          <div className="flex items-center gap-4">
            <span>Rating</span>
            <button className="text-blue-600 underline">Reviews</button>
          </div>
        </div>
        <div className="flex items-center w-full lg:w-1/3 mt-4 lg:mt-0">
          {manager ? (
            // @ts-ignore
            <BranchManagerCard manager={manager} />
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600">No manager assigned yet.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 lg:col-span-2">
          <section className="bg-white p-6 rounded-lg shadow-lg w-full">
            <FeaturesCard />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-lg w-full">
            <Plans plans={branchDetails.plans} />
          </section>
        </div>
      </div>

      <section id="team" className="trainers-section p-4 sm:p-6 lg:p-8">
        <Trainers trainers={trainers} />
      </section>

      {reviews.length > 0 && (
        <div className="max-w-6xl mt-14 mx-auto p-4 sm:p-6 lg:p-8">
          <Testimonial reviews={reviews} />
        </div>
      )}
    </div>
  );
}
