import type { DevErrorType } from "./types";

// 使用ES模块导入语法导入图片
import runtimeImg from './emotes/runtime/runtime.jpg';
import domImg from './emotes/dom/dom.jpg';
import hookImg from './emotes/hook/hook.jpg';
import promiseImg from './emotes/promise/promise.jpg';
import hmrImg from './emotes/hmr/hmr.jpg';
import hydrationImg from './emotes/hydration/hydration.png';

export const images: Record<DevErrorType, string> = {
  runtime: runtimeImg,
  dom: domImg,
  hook: hookImg,
  promise: promiseImg,
  hmr: hmrImg,
  hydration: hydrationImg,
  general: runtimeImg, // 复用runtime图片
};