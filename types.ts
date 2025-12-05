export type DevErrorType =
  | "runtime"
  | "dom"
  | "hook"
  | "promise"
  | "hmr"
  | "hydration"
  | "general";

// 添加语言类型
export type Language = "zh" | "en" | "ja";

// 添加配置接口
export interface FurryDevOverlayConfig {
  enabled: boolean; // 开关
  language: Language; // 语言
  type: 'image' | 'video'; // 媒体类型
}

export interface DevOverlayMessage {
  type: DevErrorType;
  message: string;
  filename?: string;
  line?: number;
  column?: number;
  stack?: string;
}