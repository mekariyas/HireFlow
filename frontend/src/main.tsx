import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Loading from "./Loading";

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </>,
);
