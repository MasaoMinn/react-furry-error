import { useState } from "react";

export default function App() {

  const triggerHookError = () => {
    if (Math.random() < 0.5) {
      const [stat, setStat] = useState(0);
      setStat(stat + 1);
    }
  };

  const triggerDomError = () => {
    const element = document.getElementById("non_existent_id");
    element!.innerText = "This will cause an error";
  };

  const triggerSearchingError = () => {
    fetch("/unavailable_file.json") // 必然失败
      .then(res => res.json())
      .catch(() => {
        throw new Error("Failed to fetch unavailable file");
      });
  };

  const triggerConfusedError = () => {
    // 执行一个无意义的逻辑错误
    JSON.parse("invalid JSON");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>🐾 Furry Error Trigger Panel</h2>
      <p>点击按钮分别触发不同类型错误：</p>

      <button
        onClick={triggerHookError}
      >
        🪝 触发 Hook 错误
      </button>

      <button
        onClick={triggerDomError}
      >
        🧱 触发 DOM 错误
      </button>

      <button
        onClick={triggerSearchingError}
      >
        🔎 触发 Searching 资源错误
      </button>

      <button
        onClick={triggerConfusedError}
      >
        ❓ 触发 Confused 兜底错误
      </button>
    </div>
  );
}