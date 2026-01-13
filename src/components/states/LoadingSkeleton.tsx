export default function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="space-y-2 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="h-2 w-16 rounded bg-gray-200" />
          <div className="h-3 w-3/4 rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-100" />
          <div className="h-2 w-2/3 rounded bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
