import type { ReactNode } from "react";
import Label from "@/components/atoms/Label";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export default function Field({ label, error, hint, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-gray-700">
      <Label>{label}</Label>
      {children}
      {hint ? <span className="text-xs text-gray-400">{hint}</span> : null}
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
    </label>
  );
}
