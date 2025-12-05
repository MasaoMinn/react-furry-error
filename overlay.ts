import type { DevOverlayMessage, Language, FurryDevOverlayConfig } from "./types";
import { images } from "./images";
import { getLocaleText } from "./locales";

// 存储当前配置
let currentLanguage: Language = "zh";
let config: FurryDevOverlayConfig = {
  enabled: true,
  language: "zh",
  type: 'video',
};

// 设置全局语言配置
export function setLanguage(language: Language): void {
  currentLanguage = language;
}

// 设置全局配置
export function setConfig(newConfig: Partial<FurryDevOverlayConfig>): void {
  config = { ...config, ...newConfig };
}

// 获取当前配置
export function getConfig(): FurryDevOverlayConfig {
  return config;
}

export function showOverlay(error: DevOverlayMessage): void {
  removeExistingOverlay();

  const wrapper = document.createElement("div");
  wrapper.id = "furry-dev-overlay";
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = "100vw";
  wrapper.style.height = "100vh";
  wrapper.style.background = "rgba(0, 0, 0, 0.85)";
  wrapper.style.color = "white";
  wrapper.style.zIndex = "999999";
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "center";
  wrapper.style.fontFamily = "monospace";

  const img = images[error.type];
  const localeText = getLocaleText(currentLanguage);

  // 根据配置类型生成媒体元素HTML
  let mediaHtml = '';
  if (config.type === 'video') {
    // 生成视频标签，并添加错误处理
    const videoPath = img.replace(/\.(jpg|png)$/, '.mp4');
    mediaHtml = `
      <div style="text-align:center;margin-bottom:20px;">
        <div id="media-container" style="position: relative; display: inline-block;">
          <!-- 视频元素 -->
          <video 
            src="${videoPath}" 
            style="width:220px;max-height:200px;" 
            autoplay 
            loop 
            muted 
            playsinline
            onerror="this.style.display='none'; document.getElementById('fallback-image').style.display='block';"
          ></video>
          <!-- 备用图片 -->
          <img 
            id="fallback-image" 
            src="${img}" 
            style="position: absolute; top: 0; left: 0; width:220px; display: none;"
            alt="Error icon"
          />
        </div>
      </div>`;
  } else {
    // 显示图片
    mediaHtml = `
      <div style="text-align:center;margin-bottom:20px;">
        <img src="${img}" style="width:220px"/>
      </div>`;
  }

  wrapper.innerHTML = `
    <div style="
      background: #1a1a1a;
      border: 2px solid #ff3333;
      border-radius: 12px;
      padding: 32px;
      max-width: 800px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    ">
      ${mediaHtml}

      <div style="
        font-size: 24px;
        font-weight: bold;
        color: #ff3333;
        margin-bottom: 16px;
        text-align: center;
      ">
        ${error.message}
      </div>

      ${error.filename ?
      `<div style="
          background: #2a2a2a;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 16px;
        ">${localeText.fileLabel}: <strong>${error.filename}</strong>:${error.line}:${error.column}</div>` :
      ""}
        
      ${error.stack ?
      `<pre style="
          white-space: pre-wrap;
          background: #2a2a2a;
          padding: 16px;
          border-radius: 6px;
          border-left: 4px solid #ff3333;
          margin: 16px 0;
          max-height: 300px;
          overflow: auto;
        ">${error.stack}</pre>` :
      ""}
        
      <div style="text-align: center; margin-top: 24px;">
        <button id="furry-reload-btn" style="
          background: #ff3333;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        ">${localeText.reloadButton}</button>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // 添加重新加载按钮的点击事件
  const reloadBtn = document.getElementById("furry-reload-btn");
  if (reloadBtn) {
    reloadBtn.addEventListener("click", () => {
      window.location.reload();
    });

    // 添加悬停效果
    reloadBtn.addEventListener("mouseenter", () => {
      reloadBtn.style.background = "#cc0000";
    });

    reloadBtn.addEventListener("mouseleave", () => {
      reloadBtn.style.background = "#ff3333";
    });
  }
}

export function removeExistingOverlay(): void {
  const old = document.getElementById("furry-dev-overlay");
  if (old) old.remove();
}