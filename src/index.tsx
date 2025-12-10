import { patchWebSocket, setInitialized } from "./websocket";
import { removeExistingOverlay, showOverlay } from "./overlay";
import { classifyFurryType } from "./classify";
import type { DevOverlayMessage } from "./types";


export function initFurryDevOverlay(): void {
  // 标记已经初始化
  setInitialized();

  // 初始化WebSocket补丁（无论enabled为何值都保留）
  patchWebSocket();
  // 启用时：使用自定义错误覆盖层
  window.addEventListener("error", (event) => {
    const err = event.error;
    if (!err) return;

    const type = classifyFurryType(err.message);
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
    const type = classifyFurryType(errorMessage);
    const msg: DevOverlayMessage = {
      type,
      message: errorMessage,
      stack: reason.stack,
    };

    showOverlay(msg);
  });

}

export { removeExistingOverlay };
export type { FurryImageType, DevOverlayMessage } from "./types";