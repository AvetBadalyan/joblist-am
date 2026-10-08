import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import CompanyLogoStrip from "../../components/landing/CompanyLogoStrip/CompanyLogoStrip";
import FeatureShowcase from "../../components/landing/FeatureShowcase/FeatureShowcase";
import FinalCTASection from "../../components/landing/FinalCTASection/FinalCTASection";
import HowItWorks from "../../components/landing/HowItWorks/HowItWorks";
import StatsSection from "../../components/landing/StatsSection/StatsSection";
import TestimonialSection from "../../components/landing/TestimonialSection/TestimonialSection";

const BelowTheFold = () => (
  <>
    <StatsSection />
    <FeatureShowcase />
    <CompanyLogoStrip />
    <HowItWorks />
    <TestimonialSection />
    <FeaturedJobs showBookmark={false} />
    <FinalCTASection />
  </>
);

export default BelowTheFold;