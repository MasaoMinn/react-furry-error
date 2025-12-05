import { patchWebSocket } from "./websocket";
import { showOverlay, removeExistingOverlay, setLanguage, setConfig } from "./overlay";
import { classifyError } from "./classify";
import type { DevOverlayMessage, FurryDevOverlayConfig } from "./types";

// 默认配置
const defaultConfig: FurryDevOverlayConfig = {
  enabled: true,
  language: "zh",
  type: 'video',
};

export function initFurryDevOverlay(config?: Partial<FurryDevOverlayConfig>): void {
  // 合并默认配置和用户配置
  const mergedConfig = { ...defaultConfig, ...config };

  // 设置语言
  setLanguage(mergedConfig.language);
  // 设置全局配置
  setConfig(mergedConfig);

  // 初始化WebSocket补丁（无论enabled为何值都保留）
  patchWebSocket();

  // 根据enabled状态决定错误处理方式
  if (mergedConfig.enabled) {
    // 启用时：使用自定义错误覆盖层
    window.addEventListener("error", (event) => {
      const err = event.error;
      if (!err) return;

      const type = classifyError(err.message);
      const msg: DevOverlayMessage = {
        type,
        message: err.message,
        stack: err.stack,
      };

      showOverlay(msg);
    });

    window.addEventListener("unhandledrejection", (event) => {
      const reason = event.reason;
      if (!reason) return;

      const errorMessage = reason.message ?? String(reason);
      const type = classifyError(errorMessage);
      const msg: DevOverlayMessage = {
        type,
        message: errorMessage,
        stack: reason.stack,
      };

      showOverlay(msg);
    });
  } else {
    // 禁用时：让浏览器默认显示错误信息，不阻止原有的错误显示机制
    // 这里不添加自定义错误监听器，保持浏览器默认行为
  }
}

export { showOverlay, removeExistingOverlay };
export type { FurryDevOverlayConfig, Language, DevErrorType, DevOverlayMessage } from "./types";