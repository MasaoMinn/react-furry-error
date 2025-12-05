import type { DevErrorType } from "./types";

/**
 * 错误分类函数，根据错误文本识别错误类型
 * @param errorText 错误文本内容
 * @returns 识别出的错误类型
 */
export function classifyError(errorText: string): DevErrorType {
  if (!errorText || typeof errorText !== 'string') {
    return 'general';
  }

  const txt = errorText.toLowerCase();

  // 1. Hook 错误（常见且有明确特征）
  if (
    txt.includes("invalid hook call") ||
    txt.includes("hooks can only be called") ||
    txt.includes("rendered fewer hooks") ||
    txt.includes("rendered more hooks") ||
    txt.includes("use of hook") && txt.includes("outside of component") ||
    (txt.includes("useeffect") || txt.includes("usestate") || txt.includes("usecallback") ||
      txt.includes("usememo") || txt.includes("useref")) &&
    txt.includes("error")
  ) {
    return "hook";
  }

  // 2. DOM / React Node 错误
  if (
    txt.includes("invalid element") ||
    txt.includes("invalid react") ||
    txt.includes("cannot render") ||
    txt.includes("element type is invalid") ||
    txt.includes("objects are not valid as a react child") ||
    txt.includes("domexception") ||
    txt.includes("failed to execute") ||
    txt.includes("__html") && txt.includes("dangerouslysetinnerhtml") ||
    txt.includes("child is not valid") ||
    txt.includes("cannot appear as a child")
  ) {
    return "dom";
  }

  // 3. Promise / 网络 / 权限 错误
  if (
    txt.includes("failed to fetch") ||
    txt.includes("network error") ||
    txt.includes("axios") ||
    txt.includes("request failed") ||
    txt.includes("forbidden") ||
    txt.includes("unauthorized") ||
    txt.includes("permission") ||
    txt.includes("timeout") ||
    txt.includes("promise rejection") ||
    txt.includes("unhandled rejection") ||
    txt.includes("fetch failed") ||
    txt.includes("connection refused") ||
    txt.includes("network request failed") ||
    txt.includes("status code 4") ||
    txt.includes("status code 5")
  ) {
    return "promise";
  }

  // 4. Runtime 错误（常见错误类型）
  if (
    txt.includes("referenceerror") ||
    txt.includes("typeerror") ||
    txt.includes("rangeerror") ||
    txt.includes("cannot read property") ||
    txt.includes("cannot read properties") ||
    txt.includes("is not a function") ||
    txt.includes("is not defined") ||
    txt.includes("is not an object") ||
    txt.includes("is not an array") ||
    txt.includes("division by zero") ||
    txt.includes("maximum call stack") ||
    txt.includes("infinite recursion")
  ) {
    return "runtime";
  }

  // 5. SSR / Hydration 错误
  if (
    txt.includes("hydration") ||
    txt.includes("did not match") && txt.includes("server") ||
    txt.includes("expected server html") ||
    txt.includes("ssr") && txt.includes("error") ||
    txt.includes("mismatch") && txt.includes("server")
  ) {
    return "hydration";
  }

  // 6. HMR 错误
  if (
    txt.includes("hmr") ||
    txt.includes("hot module replacement") ||
    (txt.includes("vite") || txt.includes("webpack")) && txt.includes("hmr") ||
    txt.includes("hot update")
  ) {
    return "hmr";
  }

  // 7. 资源加载错误
  if (
    txt.includes("resource") ||
    txt.includes("load failed") ||
    txt.includes("failed to load") ||
    txt.includes("cannot find module") ||
    txt.includes("module not found") ||
    txt.includes("script error")
  ) {
    return "runtime"; // 资源加载错误归类到运行时错误
  }

  // 默认错误类型
  return "general";
}