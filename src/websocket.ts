import { classifyFurryType } from "./classify";
import type { DevOverlayMessage } from "./types";
import { showOverlay } from "./overlay";

// 标记是否已经调用了initFurryDevOverlay
let isInitialized = false;

// 导出初始化标记函数
export function setInitialized(): void {
  isInitialized = true;
}

export function patchWebSocket(): void {
  if (!isInitialized) {
    return;
  }

  const OriginalWS = window.WebSocket;

  class InterceptedWS extends OriginalWS {
    constructor(url: string | URL, protocols?: string | string[]) {
      super(url, protocols);

      this.addEventListener("message", (event: MessageEvent) => {
        try {
          const data = typeof event.data === "string"
            ? JSON.parse(event.data)
            : null;

          if (!data) return;

          // --- Vite ---
          if (data.type === "error") {
            const msg = data.err.message ?? "Unknown error";
            handleDevError(msg, data.err.stack);
          }

          // --- CRA / webpack-hot-middleware ---
          if (data.errors && Array.isArray(data.errors)) {
            handleDevError(data.errors[0], undefined);
          }

          // --- Next.js ---
          if (data.event === "client-error") {
            handleDevError(data.error.message, data.error.stack);
          }

        } catch {
          // ignore
        }
      });
    }
  }

  (window as unknown as { WebSocket: typeof WebSocket }).WebSocket = InterceptedWS;
}

function handleDevError(message: string, stack?: string): void {


  const type = classifyFurryType(message);

  const info: DevOverlayMessage = {
    type,
    message,
    stack,
  };

  showOverlay(info);
}