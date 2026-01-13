import LoadingSkeleton from "@/components/states/LoadingSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-gray-900">Posts</h1>
      </div>
      <div className="mt-4">
        <LoadingSkeleton />
      </div>
    </div>
  );
}
