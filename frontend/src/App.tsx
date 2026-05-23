import { RouterProvider, createBrowserRouter } from "react-router";

//shared
import Home from "./shared/pages/Home";
import About from "./shared/pages/About";
import Index from "./shared/pages/Index";
import Pricing from "./shared/pages/Pricing";
import Dashboard from "./shared/pages/dashboard";
import Profile from "./shared/pages/Profile";
import Settings from "./shared/pages/Settings";

//companies
import Signup from "./company/pages/signup";
import Login from "./company/pages/login";

//user
import UserSignup from "./users/pages/signup";
import UserLogin from "./users/pages/login";

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
        { path: "/about", element: <About /> },
        {
          path: "/pricing",
          element: <Pricing />,
        },
        //Starting of company routes
        {
          path: "/companies",
          children: [
            {
              path: "/companies/signup",
              element: <Signup />,
            },
            {
              path: "/companies/login",
              element: <Login />,
            },
            {
              path: "/companies/company/profile",
              element: <Dashboard />,
              children: [{ index: true, element: <Profile /> }],
            },
            {
              path: "/companies/company/Settings",
              element: <Settings />,
            },
          ],
        },
        //ending of company routes

        //start of user routes
        {
          path: "/user",
          children: [
            { path: "/user/signUp", element: <UserSignup /> },
            {
              path: "/user/login",
              element: <UserLogin />,
            },
            {
              path: "/user/profile",
              element: <Dashboard />,
            },
          ],
        },
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
