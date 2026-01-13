import type { HTMLAttributes } from "react";

type LabelProps = HTMLAttributes<HTMLSpanElement>;

export default function Label({ className = "", ...props }: LabelProps) {
  return (
    <span className={`font-medium text-gray-800 ${className}`} {...props} />
  );
}
