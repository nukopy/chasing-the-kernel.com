import { unstable_createContext } from "react-router";

export const cloudflareContext = unstable_createContext<{
  env: Env;
  ctx: ExecutionContext;
}>({
  env: {} as Env,
  ctx: {} as ExecutionContext,
});
