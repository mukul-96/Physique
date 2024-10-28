import { useFetchPlans } from "../../hooks";
import PlanCard from "./PlanCard";


interface PlanDetailsProps {
  branchId: number | null;
}

export default function Plans({ branchId }: PlanDetailsProps) {
  const { plans, loading, error } = useFetchPlans(branchId);

  if (loading) {
    return <div>Loading plans...</div>;
  }

  if (error) {
    return <div>Error loading plans: {error}</div>;
  }

  if (!plans || plans.length === 0) {
    return <div>No plans available</div>;
  }

  return (
    <div className="flex h-full w-full gap-3 overflow-auto p-10">
      {plans.map((plan) => (
        <PlanCard key={plan.planId} plan={plan} branchId={branchId} />
      ))}
    </div>
  );
}
