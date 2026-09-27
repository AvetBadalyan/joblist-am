import styled from "styled-components";

const Wrapper = styled.section`
  width: 100%;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--primary-500);
    text-decoration: none;
    font-size: var(--fs-sm);
    font-weight: 500;
    letter-spacing: var(--letterSpacing);
    margin-bottom: var(--space-4);
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
    }

    svg {
      font-size: var(--fs-base);
    }
  }

  .page-title {
    font-size: var(--fs-2xl);
    margin: 0 0 var(--space-2) 0;
    color: var(--grey-900);
  }

  .job-info {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-6);
    color: var(--grey-600);
    font-size: var(--fs-sm);

    .info-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);

      svg {
        color: var(--grey-400);
        font-size: var(--fs-base);
      }
    }
  }

  .applicants-count {
    margin: 0 0 var(--space-6) 0;
    color: var(--grey-600);
    font-size: var(--fs-base);
    letter-spacing: var(--letterSpacing);
  }

  .applicants-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .filter-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-6);

    .tab-btn {
      padding: var(--space-2) var(--space-4);
      background: var(--grey-100);
      color: var(--grey-600);
      border: none;
      border-radius: var(--borderRadius);
      font-size: var(--fs-sm);
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      text-decoration: none;

      &:hover {
        background: var(--grey-200);
      }

      &.active {
        background: var(--primary-500);
        color: var(--white);
      }
    }
  }

  @media (max-width: 576px) {
    .page-title {
      font-size: var(--fs-xl);
    }
  }
`;

export default Wrapper;
