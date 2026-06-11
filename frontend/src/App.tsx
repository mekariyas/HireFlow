import { RouterProvider, createBrowserRouter } from "react-router";
import { Toaster } from "sonner";

//shared
import Home from "./shared/pages/Home";
import About from "./shared/pages/About";
import Index from "./shared/pages/Index";
import Pricing from "./shared/pages/Pricing";
import Dashboard from "./shared/pages/dashboard";
import Settings from "./shared/pages/Settings";

//companies
import Signup from "./company/pages/signup";
import Login from "./company/pages/login";
import CompanyProfile from "./company/pages/CompanyProfile";
import Applicants from "./company/pages/Applicants";
import Listings from "./company/pages/Listings";
//user
import UserSignup from "./users/pages/signup";
import UserLogin from "./users/pages/login";
import UserProfile from "./users/pages/UserProfile";
import Jobs from "./users/pages/Jobs";
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
              path: "signup",
              element: <Signup />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: ":companyId/dashboard",
              element: <Dashboard />,
              children: [
                { index: true, element: <CompanyProfile /> },
                {
                  path: "settings",
                  element: <Settings />,
                },
                {
                  path: "listings",
                  element: <Listings />,
                },
                {
                  path: "listings/applicants/?jobId=:jobId",
                  element: <Applicants />,
                },
              ],
            },
          ],
        },
        //ending of company routes

        //start of user routes
        {
          path: "/user",
          children: [
            { path: "signUp", element: <UserSignup /> },
            {
              path: "login",
              element: <UserLogin />,
            },
            {
              path: ":userId/dashboard",
              element: <Dashboard />,
              children: [
                { index: true, element: <UserProfile /> },
                {
                  path: "jobs",
                  element: <Jobs />,
                },
              ],
            },
          ],
        },
        //end of user routes
      ],
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
