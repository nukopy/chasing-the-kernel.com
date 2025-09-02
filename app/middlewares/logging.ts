import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";
import { requestIdContext } from "../contexts/requestIdContext";

export const loggingMiddleware: MiddlewareFunction = async (
  { request, context },
  next,
) => {
  // get request id
  const requestId = context.get(requestIdContext);

  // TODO: ロガーライブラリ入れて JSON Lines 化 (UA とか IP アドレスとか諸々出力)
  console.info({
    requestId,
    level: "INFO",
    method: request.method,
    url: request.url,
    message: `Request ${request.method} ${request.url}`,
    timestamp: new Date().toISOString(),
    ua: request.headers.get("user-agent"),
    ip: request.headers.get("x-forwarded-for"),
    cf: request.headers.get("cf-ipcountry"),
  });

  const start = performance.now();
  const response = (await next()) as Response;
  const duration = performance.now() - start;

  console.info({
    requestId,
    level: "INFO",
    method: request.method,
    url: request.url,
    message: `Response with status code ${response.status}`,
    timestamp: new Date().toISOString(),
    status: response.status,
    duration: duration,
    durationUnit: "ms",
  });

  return response;
};
