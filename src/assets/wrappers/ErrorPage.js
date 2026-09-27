import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-8);

  img {
    max-width: 600px;
    display: block;
    margin-bottom: var(--space-8);
  }

  h3 {
    margin-bottom: var(--space-2);
  }

  p {
    margin-top: 0;
    margin-bottom: var(--space-6);
    color: var(--grey-500);
    max-width: 500px;
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Wrapper;
