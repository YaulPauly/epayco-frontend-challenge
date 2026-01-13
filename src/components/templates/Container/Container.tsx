import type { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-200 p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
