type ToastVariant = "success" | "error" | "warning" | "info";

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
};

const variantStyles: Record<ToastVariant, string> = {
  success: "border-green-200 bg-green-50 text-green-800",
  error: "border-red-200 bg-red-50 text-red-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

export default function Toast({ message, variant = "success", onClose }: ToastProps) {
  return (
    <div
      className={`fixed right-6 top-6 z-50 max-w-xs rounded-md border px-4 py-3 text-sm shadow-lg ${variantStyles[variant]}`}
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <span>{message}</span>
        <button
          type="button"
          className="text-xs font-semibold text-inherit opacity-70 hover:opacity-100"
          aria-label="Cerrar"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
