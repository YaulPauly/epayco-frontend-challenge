"use client";

import ErrorState from "@/components/states/ErrorState";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <ErrorState
      message="Ocurrio un error inesperado."
      description="Intenta recargar la pagina o vuelve mas tarde."
      onRetry={() => reset()}
    />
  );
}
