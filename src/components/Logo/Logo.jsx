import styled from "styled-components";
import logoImg from "./../../assets/images/logo.png";

/**
 * App logo. Self-sizing: constrains by height and preserves aspect ratio so it
 * fits any header/navbar without overflowing. Consuming layouts can override
 * the height via the `.logo` class (this uses a class, not inline styles, so
 * those overrides win).
 */
const Logo = () => {
  return <Img src={logoImg} alt="JobList.am logo" className="logo" />;
};

const Img = styled.img`
  height: 2.5rem;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
`;

export default Logo;
