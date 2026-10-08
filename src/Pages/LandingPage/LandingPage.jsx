import { lazy, Suspense } from "react";
import Wrapper from "../../assets/wrappers/LandingPage";
import HeroSection from "../../components/landing/HeroSection/HeroSection";
import PublicNav from "../../components/PublicNav/PublicNav";

// Everything below the hero loads after first paint, as one chunk.
const BelowTheFold = lazy(() => import("./BelowTheFold"));

const LandingPage = () => {
  return (
    <>
      {/* PublicNav renders as <nav> — must live outside <main> (req 13.7) */}
      <PublicNav />
      <Wrapper as="main" id="main-content" tabIndex={-1}>
        <HeroSection />
        <Suspense
          fallback={<div style={{ minHeight: "100vh" }} aria-hidden="true" />}
        >
          <BelowTheFold />
        </Suspense>
      </Wrapper>
    </>
  );
};

export default LandingPage;