import Wrapper from "../../assets/wrappers/LandingPage";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import CompanyLogoStrip from "../../components/landing/CompanyLogoStrip/CompanyLogoStrip";
import FeatureShowcase from "../../components/landing/FeatureShowcase/FeatureShowcase";
import FinalCTASection from "../../components/landing/FinalCTASection/FinalCTASection";
import HeroSection from "../../components/landing/HeroSection/HeroSection";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import StatsSection from "../../components/landing/StatsSection/StatsSection";
import TestimonialSection from "../../components/landing/TestimonialSection/TestimonialSection";
import PublicNav from "../../components/PublicNav/PublicNav";

const LandingPage = () => {
  return (
    <>
      {/* PublicNav renders as <nav> — must live outside <main> (req 13.7) */}
      <PublicNav />
      <Wrapper>
        <HeroSection />
        <StatsSection />
        <FeatureShowcase />
        <CompanyLogoStrip />
        <HowItWorks />
        <TestimonialSection />
        <FeaturedJobs showBookmark={false} />
        <FinalCTASection />
      </Wrapper>
    </>
  );
};

export default LandingPage;
