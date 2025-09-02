import { requestIdContext } from "app/contexts/requestIdContext";
import type { unstable_MiddlewareFunction as MiddlewareFunction } from "react-router";

export const errorMiddleware: MiddlewareFunction = async (
  { context },
  next,
) => {
  try {
    return await next();
  } catch (error) {
    const requestId = context.get(requestIdContext);

    // エラーをログに記録
    console.error({
      requestId,
      level: "ERROR",
      message: `Route error: ${error}`,
      timestamp: new Date().toISOString(),
      errorType: error?.constructor?.name,
      error,
    });

    // React Routerに処理させるために再スロー
    throw error;
  }
};
