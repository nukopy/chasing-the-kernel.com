import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import { requestIdContext } from "../contexts/requestIdContext";

const DURATION_UNIT = "ms";

/**
 * リクエストの処理結果をログに記録するミドルウェア
 */
export const loggingMiddleware: MiddlewareFunction = async (
  { request, context },
  next,
) => {
  // get request id from context
  const requestId = context.get(requestIdContext);

  // get response
  const start = performance.now();
  const response = (await next()) as Response;
  const duration = performance.now() - start;

  // logging request
  const path = new URL(request.url).pathname;
  console.info({
    requestId,
    level: "INFO",
    method: request.method,
    url: request.url, // e.g. http://localhost:5173/contents
    path,
    headers: {
      // ...request.headers,
      host: request.headers.get("host"),
      userAgent: request.headers.get("user-agent"),
    },
    message: `${response.status} ${request.method} ${path} (${duration}${DURATION_UNIT})`,
    status: response.status,
    duration: duration,
    durationUnit: DURATION_UNIT,
    timestamp: new Date().toISOString(),
  });

  return response;
};
