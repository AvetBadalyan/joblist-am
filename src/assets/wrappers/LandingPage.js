import styled from "styled-components";

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(180deg, var(--grey-50) 0%, var(--white) 100%);

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    padding: var(--space-8) 0 var(--space-16);
  }

  .info {
    max-width: 600px;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, var(--fs-4xl));
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--space-6);
    color: var(--grey-900);

    span {
      background: var(--gradient-accent);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    color: var(--grey-600);
    font-size: var(--fs-lg);
    line-height: 1.7;
    margin-bottom: var(--space-8);
  }

  .main-img {
    display: none;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
  }

  .cta-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .btn-hero {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: var(--fs-base);
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--radius-xl);
    transition: var(--transition);
    gap: var(--space-2);
  }

  .btn-hero:not(.btn-secondary) {
    background: var(--gradient-accent);
    color: var(--white);
    box-shadow: var(--shadow-2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3), var(--shadow-glow);
    }
  }

  .btn-secondary {
    background: var(--white);
    color: var(--grey-700);
    border: 2px solid var(--grey-200);
    box-shadow: var(--shadow-sm);

    &:hover {
      border-color: var(--primary-300);
      background: var(--primary-50);
      color: var(--primary-700);
    }
  }

  @media (min-width: 576px) {
    .cta-buttons {
      flex-direction: row;
    }
  }

  @media (min-width: 1024px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: var(--space-16);
    }

    .main-img {
      display: block;
    }
  }

  /* Features section */
  .features {
    background: var(--white);
    padding: var(--space-20) 0;
    border-top: 1px solid var(--grey-100);
  }

  .features-heading {
    text-align: center;
    font-size: var(--fs-2xl);
    font-weight: 800;
    color: var(--grey-900);
    margin-bottom: var(--space-4);
  }

  .features-subheading {
    text-align: center;
    color: var(--grey-500);
    font-size: var(--fs-md);
    margin-bottom: var(--space-12);
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .feature-card {
    background: var(--grey-50);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    border: 1px solid var(--grey-100);
    transition: var(--transition);

    h3 {
      font-size: var(--fs-lg);
      font-weight: 700;
      color: var(--grey-900);
      margin: var(--space-4) 0 var(--space-2);
    }

    p {
      color: var(--grey-500);
      line-height: 1.6;
      margin: 0;
      font-size: var(--fs-sm);
    }

    &:hover {
      background: var(--white);
      border-color: var(--primary-200);
      transform: translateY(-4px);
      box-shadow: var(--shadow-card);
    }
  }

  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-xl);
    background: var(--gradient-accent);
    color: var(--white);
    font-size: var(--fs-xl);
    box-shadow: var(--shadow-2);
  }

  @media (min-width: 768px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .features-heading {
      font-size: var(--fs-3xl);
    }
  }

  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default Wrapper;
