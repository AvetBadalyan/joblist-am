import { Outlet } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/SharedLayout";
import SmallSidebar from "../../../components/SmallSidebar/SmallSidebar";
import BigSidebar from "../../../components/BigSliderBar/BigSliderBar";
import Navbar from "../../../components/Navbar/Navbar";

/**
 * EmployerLayout component - Wraps all /employer/* routes with shared layout
 * Includes Navbar with employer links, BigSidebar/SmallSidebar (role-based), and Outlet for nested routes
 * @see Requirements: 17.3
 */
const EmployerLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default EmployerLayout;
