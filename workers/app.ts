import { cloudflareContext } from "app/contexts/cloudflareContext";
import { requestIdContext } from "app/contexts/requestIdContext";
import {
  createRequestHandler,
  type unstable_RouterContext,
  unstable_RouterContextProvider,
} from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    // initalize contexts
    const map = new Map<unstable_RouterContext, unknown>();

    // set cloudflare context to get Env and ExecutionContext
    map.set(cloudflareContext, { env, ctx });

    // set request id context
    map.set(requestIdContext, crypto.randomUUID());

    // initialize context provider
    const provider = new unstable_RouterContextProvider(map);

    return requestHandler(request, provider);
  },
} satisfies ExportedHandler<Env>;
