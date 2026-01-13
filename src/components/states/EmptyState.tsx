export default function EmptyState() {
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
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="font-semibold text-gray-800">No hay resultados</div>
      <p className="text-xs text-gray-400">
        Prueba con una nueva consulta o ajusta la busqueda.
      </p>
    </div>
  );
}
