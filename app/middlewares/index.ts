import type { unstable_MiddlewareFunction } from "react-router";
import { errorMiddleware } from "./error";
import { i18nextMiddleware } from "./i18next";
import { loggingMiddleware } from "./logging";

// add middlewares
export const rootMiddlewares: unstable_MiddlewareFunction[] = [
  loggingMiddleware,
  errorMiddleware,
  i18nextMiddleware as unstable_MiddlewareFunction,
];
