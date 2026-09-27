import styled from 'styled-components';

const Wrapper = styled.section`
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-500);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    text-decoration: none;
    transition: var(--transition);
    min-height: 44px;
    min-width: 44px;

    &:hover {
      color: var(--primary-700);
    }

    svg {
      font-size: 1.1rem;
    }
  }

  .job-detail-container {
    display: grid;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: 2fr 1fr;
      align-items: start;
    }
  }

  .job-main {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
  }

  .job-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: flex-start;
    gap: 1rem;

    @media (min-width: 576px) {
      padding: 2rem;
    }
  }

  .company-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);

    @media (min-width: 576px) {
      width: 70px;
      height: 70px;
      font-size: 1.75rem;
    }
  }

  .job-title-section {
    h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
      letter-spacing: 0;
      color: var(--grey-900);

      @media (min-width: 576px) {
        font-size: 1.5rem;
      }
    }

    .company-name {
      margin: 0;
      color: var(--grey-500);
      font-size: 1rem;
      letter-spacing: var(--letterSpacing);
    }
  }

  .bookmark-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--borderRadius);
    transition: var(--transition);
    min-width: 44px;
    min-height: 44px;

    &:hover {
      background: var(--grey-100);
    }

    svg {
      font-size: 1.5rem;
      color: var(--grey-400);
    }

    &.saved svg {
      color: var(--primary-500);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .job-meta {
    padding: 1rem 1.5rem;
    background: var(--grey-50);
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;

    @media (min-width: 576px) {
      padding: 1.25rem 2rem;
    }
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--grey-600);

    svg {
      color: var(--grey-400);
      font-size: 1rem;
    }

    .text {
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
    }
  }

  .job-type-badge {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    border-radius: var(--borderRadius);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);

    &.full-time {
      background: #e0f2fe;
      color: #0369a1;
    }

    &.part-time {
      background: #fef3c7;
      color: #b45309;
    }

    &.remote {
      background: #d1fae5;
      color: #047857;
    }

    &.internship {
      background: #ede9fe;
      color: #6d28d9;
    }
  }

  .salary {
    font-weight: 600;
    color: var(--primary-600);
  }

  .job-content {
    padding: 1.5rem;

    @media (min-width: 576px) {
      padding: 2rem;
    }
  }

  .content-section {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      color: var(--grey-800);
      letter-spacing: 0;
    }

    p,
    ul {
      color: var(--grey-600);
      line-height: 1.7;
      margin: 0;
    }

    ul {
      padding-left: 1.5rem;

      li {
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .job-sidebar {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    position: sticky;
    top: 1rem;

    @media (min-width: 576px) {
      padding: 2rem;
    }
  }

  .sidebar-header {
    margin-bottom: 1.5rem;
    text-align: center;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: var(--grey-800);
    }
  }

  .apply-btn {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    min-height: 48px;
  }

  .applied-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #d1fae5;
    color: #047857;
    border-radius: var(--borderRadius);
    font-weight: 500;

    svg {
      font-size: 1.25rem;
    }
  }

  .closed-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--grey-100);
    color: var(--grey-600);
    border-radius: var(--borderRadius);
    font-weight: 500;

    svg {
      font-size: 1.25rem;
    }
  }

  .posted-date {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-100);
    font-size: 0.85rem;
    color: var(--grey-400);
  }

  /* Loading state */
  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  /* Error state */
  .error-container {
    text-align: center;
    padding: 3rem;

    h3 {
      color: var(--grey-800);
      margin-bottom: 1rem;
    }

    p {
      color: var(--grey-500);
      margin-bottom: 1.5rem;
    }
  }

  /* Application form inline */
  .application-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--grey-100);
  }
`;

export default Wrapper;
