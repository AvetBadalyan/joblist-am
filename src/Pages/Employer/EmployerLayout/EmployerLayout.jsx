import { Outlet } from "react-router-dom";
import PublicNav from "../../../components/PublicNav/PublicNav";

/**
 * EmployerLayout
 *
 * Wraps every /employer/* route in the single app shell used across the whole
 * site (public + authenticated): the shared top nav plus one centered
 * container. Keeping the same shell as the public pages means there is no
 * layout shift when moving between Browse Jobs and the dashboard.
 *
 * Role-based navigation lives in the header (PublicNav) itself.
 */
const EmployerLayout = () => {
  return (
    <>
      <PublicNav />
      <main className="dashboard">
        <div className="dashboard-page">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default EmployerLayout;
