"use client";

import ErrorState from "@/components/states/ErrorState";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return <ErrorState onRetry={() => reset()} />;
}
