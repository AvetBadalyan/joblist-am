import { companyLogos } from "../../../data/landingData";
import { LogoItem, LogoStripWrapper } from "./CompanyLogoStrip.styles";

/**
 * CompanyLogoStrip
 *
 * Displays a "Trusted by Leading Companies" heading and a horizontal row of
 * styled logo placeholders. Logos are duplicated so the infinite CSS scroll
 * animation has a seamless loop.
 *
 * Accessibility notes:
 *  - The section is labelled by its visible heading via aria-labelledby.
 *  - The scrolling logo track is aria-hidden because it is purely decorative
 *    (duplicate names, no interactive purpose).
 *
 * Requirements: 4.1, 4.2, 13.1, 13.7
 */
function CompanyLogoStrip() {
  // Build one "half" dense enough to fill wide screens, then duplicate it so the
  // marquee's translateX(-50%) loops seamlessly (two identical halves).
  const half =
    companyLogos.length >= 6
      ? companyLogos
      : Array(Math.ceil(6 / companyLogos.length))
          .fill(companyLogos)
          .flat();
  const logoSet = [...half, ...half];

  return (
    <LogoStripWrapper aria-labelledby="logo-strip-heading">
      <div className="logo-strip-header">
        {/* Proper heading element for semantic structure (req 13.7) */}
        <h2 className="logo-strip-heading" id="logo-strip-heading">
          Companies Hiring on JobList.am
        </h2>
      </div>

      {/* The scrolling track is decorative — hide from AT (req 13.1) */}
      <div className="logo-track">
        <div className="logo-slider" aria-hidden="true">
          {logoSet.map((name, index) => (
            <LogoItem key={`${name}-${index}`}>
              <span className="logo-name">{name}</span>
            </LogoItem>
          ))}
        </div>
      </div>
    </LogoStripWrapper>
  );
}

export default CompanyLogoStrip;
