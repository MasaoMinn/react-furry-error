// classify.ts

import type { FurryImageType } from "./types";

export function classifyFurryType(message: string): FurryImageType {
  const text = message.toLowerCase();

  // hook 类错误（优先级最高）
  if (
    text.includes("invalid hook call") ||
    text.includes("too many re-renders") ||
    text.includes("maximum update depth") ||
    text.includes("hooks can only be used") ||
    text.includes("dependency cycle") ||
    text.includes("cannot update a component while rendering")
  ) {
    return "hook-error";
  }

  // dom/hydration 错误（第二）
  if (
    text.includes("hydration") ||
    text.includes("markup") ||
    text.includes("unmounted") ||
    text.includes("container is null") ||
    text.includes("invalid react element")
  ) {
    return "dom-broken";
  }

  // searching 类（资源缺失、找不到、执行失败）
  if (
    text.includes("not found") ||
    text.includes("cannot resolve") ||
    text.includes("failed to load") ||
    text.includes("failed to fetch") ||
    text.includes("undefined is not a function") ||
    text.includes("is not defined")
  ) {
    return "searching";
  }

  // 默认兜底
  return "confused";
}
