import Button from "@/components/atoms/Button";

type OfflineBannerProps = {
  onRetry?: () => void;
};

export default function OfflineBanner({ onRetry }: OfflineBannerProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
      <span>Sin conexión. Algunas acciones están deshabilitadas.</span>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      ) : null}
    </div>
  );
}
