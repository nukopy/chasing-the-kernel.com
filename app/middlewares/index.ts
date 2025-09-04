import type { unstable_MiddlewareFunction } from "react-router";
import { errorMiddleware } from "./error";
import { i18nextMiddleware } from "./i18next";
import { loggingMiddleware } from "./logging";

export const rootMiddlewares: unstable_MiddlewareFunction[] = [
  errorMiddleware,
  loggingMiddleware,
  i18nextMiddleware as unstable_MiddlewareFunction,
];
