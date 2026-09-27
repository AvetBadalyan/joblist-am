import { Outlet } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/SharedLayout";
import SmallSidebar from "../../../components/SmallSidebar/SmallSidebar";
import BigSidebar from "../../../components/BigSliderBar/BigSliderBar";
import Navbar from "../../../components/Navbar/Navbar";

/**
 * CandidateLayout Component
 * Wraps all candidate routes (/candidate/*) with shared layout components
 * 
 * Structure:
 * - Navbar with candidate-specific links (via role-based NavLinks)
 * - SmallSidebar for mobile navigation
 * - BigSidebar for desktop navigation
 * - Outlet for rendering nested candidate routes
 * 
 * @see Requirements: 17.2 - Proper link paths and layout for candidates
 */
const CandidateLayout = () => {
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

export default CandidateLayout;
