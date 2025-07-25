export function parseFastApiError(errorDetail: unknown): string {
  if (Array.isArray(errorDetail)) {
    // Si es una lista de errores de validación (típico en FastAPI con Pydantic)
    return errorDetail
      .map((err) => {
        if (typeof err === "object" && err !== null && "msg" in err) {
          return (err as { msg: string }).msg;
        }
        return "Error desconocido";
      })
      .join(" | ");
  }

  if (typeof errorDetail === "string") {
    return errorDetail;
  }

  return "Error inesperado en la solicitud";
}
