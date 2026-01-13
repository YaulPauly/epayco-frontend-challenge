import Link from "next/link";
import Button from "@/components/atoms/Button";
import EmptyState from "@/components/states/EmptyState";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <EmptyState />
      <Button asChild>
        <Link href="/posts">Volver a posts</Link>
      </Button>
    </div>
  );
}
