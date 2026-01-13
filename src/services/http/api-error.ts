export type ApiErrorKind = "offline" | "timeout" | "http" | "unknown";

export type ApiError = {
  kind: ApiErrorKind;
  status?: number;
  message: string;
  details?: unknown;
};

export function isOfflineError(error: unknown): error is ApiError {
  return Boolean((error as ApiError)?.kind === "offline");
}

export function isTimeoutError(error: unknown): error is ApiError {
  return Boolean((error as ApiError)?.kind === "timeout");
}
