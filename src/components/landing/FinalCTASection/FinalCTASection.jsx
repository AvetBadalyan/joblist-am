import { Link } from "react-router-dom";
import useScrollAnimation from "../../../hooks/useScrollAnimation";
import WaveDivider from "../WaveDivider/WaveDivider";
import {
  CTABtnPrimary,
  CTABtnSecondary,
  CTAButtons,
  CTAContent,
  FinalCTAWrapper,
} from "./FinalCTASection.styles";

/**
 * FinalCTASection
 *
 * The closing call-to-action section displayed before the footer.
 * Features a visually striking gradient background with a prominent
 * headline and two action buttons, with a zoom-and-fade entrance animation
 * and a WaveDivider at the top edge.
 */
function FinalCTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <FinalCTAWrapper>
      {/* Wave divider at top edge — color matches the section above (#f8fafc / grey-50)
          so it appears to "dip into" the gradient from the lighter background */}
      <WaveDivider position="top" color="#f8fafc" />
      <CTAContent ref={ref} $isVisible={isVisible}>
        <h2 className="cta-headline">Ready to Take the Next Step?</h2>
        <p className="cta-subheadline">
          Join thousands of job seekers and employers on JobList.am
        </p>

        <CTAButtons>
          {/* Primary: white background, dark text — stands out against gradient */}
          <CTABtnPrimary as={Link} to="/register">
            Get Started
          </CTABtnPrimary>

          {/* Secondary: outlined — subtler, still legible on gradient */}
          <CTABtnSecondary as={Link} to="/jobs">
            Browse Jobs
          </CTABtnSecondary>
        </CTAButtons>
      </CTAContent>
    </FinalCTAWrapper>
  );
}

export default FinalCTASection;
