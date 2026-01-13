import Button from "@/components/atoms/Button";

type ErrorStateProps = {
  message?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = "No pudimos cargar los posts.",
  description = "Ha ocurrido un problema al intentar obtener la lista de posts.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center text-sm text-gray-500">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <path d="M7.5 7.5a6 6 0 0 1 9 0" />
          <path d="M9 15a3 3 0 0 1 6 0" />
        </svg>
      </div>
      <div className="font-semibold text-gray-800">{message}</div>
      <p className="text-xs text-gray-400">{description}</p>
      {onRetry ? (
        <Button onClick={onRetry}>Reintentar</Button>
      ) : null}
    </div>
  );
}
