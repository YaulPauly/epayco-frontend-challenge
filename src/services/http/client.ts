import axios, { AxiosError } from "axios";
import type { ApiError } from "@/services/http/api-error";
import { isOfflineError, isTimeoutError } from "@/services/http/api-error";

const httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(mapToApiError(error));
  }
);

function mapToApiError(error: AxiosError): ApiError {
  if (error.code === "ECONNABORTED") {
    return {
      kind: "timeout",
      message: "La solicitud tardó demasiado. Intenta de nuevo.",
      details: error.toJSON(),
    };
  }

  if (error.code === "ERR_NETWORK") {
    const offline =
      typeof navigator !== "undefined" ? navigator.onLine === false : false;
    return {
      kind: offline ? "offline" : "unknown",
      message: offline
        ? "Sin conexión a internet."
        : "No se pudo conectar al servidor.",
      details: error.toJSON(),
    };
  }

  if (error.response) {
    return {
      kind: "http",
      status: error.response.status,
      message: "Ocurrió un error al procesar la solicitud.",
      details: error.response.data,
    };
  }

  return {
    kind: "unknown",
    message: "Ocurrió un error inesperado.",
    details: error.toJSON?.(),
  };
}

export { httpClient, isOfflineError, isTimeoutError };
