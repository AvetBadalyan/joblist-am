import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-6);
  background: linear-gradient(180deg, var(--grey-50) 0%, var(--white) 100%);

  img {
    width: 100%;
    max-width: 400px;
    display: block;
    margin-bottom: var(--space-8);
  }

  h3 {
    margin-bottom: var(--space-2);
    font-size: var(--fs-xl);
    font-weight: 700;
    color: var(--grey-900);
  }

  p {
    margin-top: 0;
    margin-bottom: var(--space-6);
    color: var(--grey-500);
    max-width: 500px;
    font-size: var(--fs-base);
  }

  a {
    color: var(--primary-600);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    padding: var(--space-8);

    img {
      max-width: 500px;
    }

    h3 {
      font-size: var(--fs-2xl);
    }
  }
`;

export default Wrapper;
