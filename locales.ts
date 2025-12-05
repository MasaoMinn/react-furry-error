import type { Language } from "./types";

// 定义语言包接口
interface LocaleTexts {
  reloadButton: string;
  fileLabel: string;
  errorTitle: string;
}

// 多语言文本配置
const locales: Record<Language, LocaleTexts> = {
  zh: {
    reloadButton: "重新加载页面",
    fileLabel: "文件",
    errorTitle: "发生错误"
  },
  en: {
    reloadButton: "Reload Page",
    fileLabel: "File",
    errorTitle: "Error Occurred"
  },
  ja: {
    reloadButton: "ページを再読み込み",
    fileLabel: "ファイル",
    errorTitle: "エラーが発生しました"
  }
};

// 获取当前语言的文本
export function getLocaleText(language: Language): LocaleTexts {
  return locales[language] || locales.en; // 默认为中文
}