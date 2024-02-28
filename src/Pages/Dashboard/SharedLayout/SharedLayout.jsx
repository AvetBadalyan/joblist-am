import { Outlet } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/SharedLayout";
import SmallSidebar from "../../../components/SmallSidebar/SmallSidebar";
import BigSidebar from "../../../components/BigSliderBar/BigSliderBar";
import Navbar from "../../../components/Navbar/Navbar";
const SharedLayout = () => {
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
export default SharedLayout;
