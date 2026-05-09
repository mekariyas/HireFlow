import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";

import Home from "./shared/pages/Home";
import Index from "./shared/pages/Index";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {},
    {},
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
