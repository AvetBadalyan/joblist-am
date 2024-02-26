import React from "react";
import mainImage from "./../../assets/images/main.jpg";
import Wrapper from "./../../assets/wrappers/LandingPage";
import Logo from "../../components/Logo/Logo";

const LandingPage = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>some text</p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img src={mainImage} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default LandingPage;
