import { classifyError } from "./classify";
import type { DevOverlayMessage } from "./types";
import { showOverlay, getConfig } from "./overlay";

export function patchWebSocket(): void {
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
  // 获取全局配置
  const config = getConfig();

  // 只有在enabled为true时才显示自定义错误覆盖层
  if (config?.enabled !== false) {
    const type = classifyError(message);

    const info: DevOverlayMessage = {
      type,
      message,
      stack,
    };

    showOverlay(info);
  }
  // enabled为false时，不做任何处理，让框架原有的错误遮罩显示
}