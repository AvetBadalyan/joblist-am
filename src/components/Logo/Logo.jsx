import styled from "styled-components";
import logoImg from "./../../assets/images/logo.webp";

/**
 * App logo. Self-sizing: constrains by height and preserves aspect ratio so it
 * fits any header/navbar without overflowing. Consuming layouts can override
 * the height via the `.logo` class (this uses a class, not inline styles, so
 * those overrides win).
 *
 * The width/height attributes match the actual source file dimensions (500x500)
 * to prevent layout shift. CSS scales it down to the display size (2.5rem).
 */
const Logo = ({ priority = false }) => {
  return (
    <Img
      src={logoImg}
      alt="JobList.am logo"
      className="logo"
      width={500}
      height={500}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
    />
  );
};

const Img = styled.img`
  height: 2.5rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
`;

export default Logo;
