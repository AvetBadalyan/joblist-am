import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .page-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--grey-100);
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-500);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: var(--letterSpacing);
    margin-bottom: 1rem;
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
    }

    svg {
      font-size: 1rem;
    }
  }

  .page-title {
    font-size: 1.75rem;
    margin: 0 0 0.5rem 0;
    color: var(--grey-900);
  }

  .job-info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    color: var(--grey-600);
    font-size: 0.9rem;

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: var(--grey-400);
        font-size: 1rem;
      }
    }
  }

  .applicants-count {
    margin: 0 0 1.5rem 0;
    color: var(--grey-600);
    font-size: 0.95rem;
    letter-spacing: var(--letterSpacing);
  }

  .applicants-list {
    display: grid;
    gap: 1.5rem;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }

  /* Error state */
  .error-container {
    text-align: center;
    padding: 3rem 1rem;

    h3 {
      color: var(--grey-700);
      margin-bottom: 1rem;
    }

    p {
      color: var(--grey-500);
      margin-bottom: 1.5rem;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: var(--primary-500);
      color: var(--white);
      border: none;
      border-radius: var(--borderRadius);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      text-decoration: none;

      &:hover {
        background: var(--primary-700);
      }
    }
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .page-header {
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
    }

    .page-title {
      font-size: 1.5rem;
    }

    .job-info {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export default Wrapper;
