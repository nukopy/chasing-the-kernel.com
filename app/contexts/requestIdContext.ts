import { unstable_createContext } from "react-router";
import type { RequestId } from "../types";

export const requestIdContext = unstable_createContext<RequestId | null>(null);

// // 後でミドルウェア/ローダーで
// context.set(userContext, user); // User型である必要があります
// const user = context.get(userContext); // User型を返します

// // ❌ 古い方法（型安全なし）
// // context.user = user; // 何でもあり得る
