import { NavLink } from "react-router";
import { AxiosError } from "axios";
import { queryClient } from "../../main";
import { Button } from "../../components/ui/button";
import {
  Search,
  FileText,
  User,
  LogOut,
  Settings,
  BriefcaseBusiness,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useParams } from "react-router";
import api from "../../api/axios";
const DashboardNav = () => {
  const { userId, companyId } = useParams();
  const navigate = useNavigate();

  queryClient.clear();
  const handleCompanyLogOut = async () => {
    try {
      await api.get("/company/logout");
      navigate("/companies/login", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(error.response?.data.message);
      }
      if (error instanceof Error) {
        return toast(error.message);
      }
    }
  };
  const handleUserLogOut = async () => {
    try {
      await api.get("/user/logout");
      queryClient.clear();
      navigate("/companies/login", { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(error.response?.data.message);
      }
      if (error instanceof Error) {
        return toast(error.message);
      }
    }
  };

  return (
    <section className="w-full h-20  text-white bg-gray-900 shadow-2xl flex  justify-evenly items-center sticky top-16 z-50">
      <NavLink
        to={
          companyId
            ? `/companies/${companyId}/dashboard`
            : `/user/${userId}/dashboard`
        }
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
            to={`/companies/${companyId}/dashboard/listings`}
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <FileText />
            <span className="hidden lg:inline-block">My Listings</span>
          </NavLink>
        </>
      )}
      {userId && (
        <>
          <NavLink
            to={`/user/${userId}/dashboard/jobs`}
            className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
          >
            <BriefcaseBusiness />
            <span className="hidden lg:inline-block">Jobs</span>
          </NavLink>
        </>
      )}
      <NavLink
        to={
          companyId
            ? `/companies/${companyId}/dashboard/settings`
            : `/user/${userId}/dashboard/settings`
        }
        className="flex items-center gap-2 hover:text-indigo-300 transition-colors"
      >
        <Settings />
        <span className="hidden lg:inline-block">Settings</span>
      </NavLink>
      <section>
        <Button
          className="border-2 border-blacks cursor-pointer hover:text-indigo-300 transition-colors"
          onClick={() => (userId ? handleUserLogOut() : handleCompanyLogOut())}
        >
          <LogOut /> <span className="hidden lg:inline-block">Log out</span>
        </Button>
      </section>
    </section>
  );
};

export default DashboardNav;
