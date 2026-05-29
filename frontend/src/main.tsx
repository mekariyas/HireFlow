import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Loading from "./Loading";

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById("root")!).render(
  <>
    <Suspense fallback={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </>,
);
