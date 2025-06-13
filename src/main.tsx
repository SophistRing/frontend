import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  // // 일시적으로 모킹 비활성화
  // async function enableMocking() {
  //   if (import.meta.env.VITE_NODE_ENV !== "development") {
  //     return;
  //   }

  //   const { worker } = await import("./mocks/browsers");
  //   return worker.start();
  // }

  // enableMocking().then(() => {
  //   root.render(<App />);
  // });

  root.render(<App />);
}
