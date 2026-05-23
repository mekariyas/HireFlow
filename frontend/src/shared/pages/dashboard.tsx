import { Outlet } from "react-router";
import DashboardNav from "../components/DashboardNav";

const Dashboard = () => {
  return (
    <>
      <DashboardNav />
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default Dashboard;
