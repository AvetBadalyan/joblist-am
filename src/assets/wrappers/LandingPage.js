import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;

    img {
      width: 10%;
    }
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;

    span {
      color: var(--primary-500);
    }
  }

  p {
    color: var(--grey-600);
    line-height: 1.6;
  }

  .main-img {
    display: none;
  }

  .cta-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }

  .btn-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-6);
    font-size: var(--fs-base);
    font-weight: 500;
    text-decoration: none;
    border-radius: var(--borderRadius);
    transition: var(--transition);
    min-width: 140px;
  }

  .btn-hero:not(.btn-secondary) {
    background: var(--primary-500);
    color: var(--white);

    &:hover {
      background: var(--primary-700);
      box-shadow: var(--shadow-2);
    }
  }

  .btn-secondary {
    background: var(--white);
    color: var(--primary-500);
    border: 2px solid var(--primary-500);

    &:hover {
      background: var(--primary-50);
      box-shadow: var(--shadow-1);
    }
  }

  @media (min-width: 576px) {
    .cta-buttons {
      flex-direction: row;
    }
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: var(--space-12);
    }
    .main-img {
      display: block;
    }
  }

  .features {
    background: var(--grey-50);
    padding: var(--space-16) 0 var(--space-16);
    border-top: 1px solid var(--grey-100);
  }

  .features-heading {
    text-align: center;
    font-size: var(--fs-xl);
    font-weight: 700;
    color: var(--grey-900);
    margin-bottom: var(--space-10);
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .feature-card {
    background: var(--white);
    border-radius: var(--radius-md);
    padding: var(--space-8) var(--space-6);
    box-shadow: var(--shadow-1);
    transition: transform var(--transition-base), box-shadow var(--transition-base);

    h3 {
      font-size: var(--fs-md);
      font-weight: 600;
      color: var(--grey-900);
      margin: var(--space-3) 0 var(--space-2);
    }

    p {
      color: var(--grey-500);
      line-height: 1.6;
      margin: 0;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-3);
    }
  }

  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--radius-full);
    background: var(--primary-100);
    color: var(--primary-500);
    font-size: var(--fs-lg);
  }

  @media (min-width: 640px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .features-heading {
      font-size: var(--fs-2xl);
    }
  }
`;

export default Wrapper;
