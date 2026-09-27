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

  /* CTA buttons container */
  .cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
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
      background: var(--primary-50, #eff6ff);
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
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }

  /* features section */
  .features {
    background: var(--grey-50, #f8fafc);
    padding: 4rem 0 5rem;
    border-top: 1px solid var(--grey-100, #f1f5f9);
  }

  .features-heading {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--grey-900, #0f172a);
    margin-bottom: 2.5rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    background: var(--white, #fff);
    border-radius: var(--border-radius, 0.5rem);
    padding: 2rem 1.75rem;
    box-shadow: var(--shadow-1, 0 1px 3px rgba(0, 0, 0, 0.08));
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--grey-900, #0f172a);
      margin: 0.75rem 0 0.5rem;
    }

    p {
      color: var(--grey-500, #64748b);
      line-height: 1.6;
      margin: 0;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-3, 0 4px 15px rgba(0, 0, 0, 0.12));
    }
  }

  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: var(--primary-100, #dbeafe);
    color: var(--primary-500, #2563eb);
    font-size: 1.25rem;
  }

  @media (min-width: 640px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .features-heading {
      font-size: 1.75rem;
    }
  }
`;
export default Wrapper;
