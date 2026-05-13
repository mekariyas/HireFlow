import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";


//shared 
import Home from "./shared/pages/Home";
import About from "./shared/pages/About";
import Index from "./shared/pages/Index";
import Pricing from "./shared/pages/Pricing";


//companies
import Signup from "./company/pages/signup";
import Login from "./company/pages/login";
import Profile from "./company/pages/profile";


//user


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
        { path: "/about",
          element: <About/>,
        },
        {
          path: "/pricing",
          element: <Pricing/>
        },
        //Starting of company routes
        {
          path:"/company",
          children:[]
        }
        //ending of company routes

        //start of user routes

        //end of user routes
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
