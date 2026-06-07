import { NavLink } from "react-router";
import { Button } from "../../components/ui/button";
import {
  Search,
  FileText,
  User,
  LogOut,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";
import { useParams } from "react-router";
const DashboardNav = () => {
  const { userId, companyId } = useParams();

  return (
    <section className="w-full h-20  text-white bg-gray-900 shadow-2xl flex  justify-evenly items-center sticky top-16 z-50">
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
      >
        <User />
        <span className="hidden lg:inline-block">Profile</span>
      </NavLink>
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
      >
        <Search />
        <span className="hidden lg:inline-block">Search</span>
      </NavLink>
      {companyId && (
        <>
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <FileText />
            <span className="hidden lg:inline-block">Posts</span>
          </NavLink>
        </>
      )}
      {userId && (
        <>
          <NavLink
            to="/"
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <BriefcaseBusiness />
            <span className="hidden lg:inline-block">Jobs</span>
          </NavLink>
        </>
      )}
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
      >
        <Settings />
        <span className="hidden lg:inline-block">Settings</span>
      </NavLink>
      <section>
        <Button className="border-2 border-blacks cursor-pointer hover:text-indigo-300 transition-colors">
          <LogOut /> <span className="hidden lg:inline-block">Log out</span>
        </Button>
      </section>
    </section>
  );
};

export default DashboardNav;
