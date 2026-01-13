import Link from "next/link";
import Button from "@/components/atoms/Button";
import EmptyState from "@/components/states/EmptyState";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <EmptyState />
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </div>
  );
}
