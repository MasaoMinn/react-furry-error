import ReactDOM from "react-dom/client";
import type { DevOverlayMessage } from "./types";
import ErrorOverlay from "./ErrorOverlay";
import React from "react";

let root: ReactDOM.Root | null = null;
let container: HTMLElement | null = null;

export function showOverlay(error: DevOverlayMessage): void {
  removeExistingOverlay();

  container = document.createElement("div");
  container.id = "furry-dev-overlay";
  document.body.appendChild(container);

  root = ReactDOM.createRoot(container);

  root.render(
    React.createElement(ErrorOverlay, { error })
  );
}

export function removeExistingOverlay(): void {
  // 1) 卸载 React Root
  if (root) {
    root.unmount();
    root = null;
  }

  // 2) 移除容器
  if (container) {
    container.remove();
    container = null;
  }
}
