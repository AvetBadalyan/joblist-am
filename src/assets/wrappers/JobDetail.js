import styled from "styled-components";

const Wrapper = styled.main`
  padding: var(--space-8) var(--space-4);
  max-width: var(--max-width);
  margin: 0 auto;

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--primary-500);
    font-size: var(--fs-sm);
    margin-bottom: var(--space-6);
    text-decoration: none;
    transition: var(--transition);
    min-height: 44px;
    min-width: 44px;

    &:hover {
      color: var(--primary-700);
    }

    svg {
      font-size: var(--fs-md);
    }
  }

  .loading-container {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-container {
    text-align: center;
    padding: var(--space-12);
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);

    h3 {
      color: var(--grey-800);
      margin-bottom: var(--space-4);
    }

    p {
      color: var(--grey-500);
      margin-bottom: var(--space-6);
    }
  }

  .job-detail-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-6);

    @media (min-width: 768px) {
      grid-template-columns: 1fr 300px;
    }
  }

  .job-main {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
  }

  .job-header {
    padding: var(--space-6);
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .company-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: var(--fs-xl);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    flex-shrink: 0;

    @media (min-width: 576px) {
      width: 70px;
      height: 70px;
      font-size: var(--fs-2xl);
    }
  }

  .job-title-section {
    flex: 1;

    h2 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--fs-lg);
      letter-spacing: 0;
      color: var(--grey-900);

      @media (min-width: 576px) {
        font-size: var(--fs-xl);
      }
    }

    .company-name {
      margin: 0;
      color: var(--grey-500);
      font-size: var(--fs-base);
    }
  }

  .bookmark-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    min-height: 44px;
  }

  .job-meta {
    padding: var(--space-6);
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    align-items: center;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--grey-600);
    font-size: var(--fs-sm);

    svg {
      color: var(--grey-400);
      font-size: var(--fs-base);
    }

    .text {
      text-transform: capitalize;
    }

    .salary {
      color: var(--primary-600);
      font-weight: 600;
    }
  }

  .job-type-badge {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-xs);
    font-weight: 500;
    text-transform: capitalize;

    &.full-time {
      background: var(--job-fulltime-bg);
      color: var(--job-fulltime-text);
    }

    &.part-time {
      background: var(--job-parttime-bg);
      color: var(--job-parttime-text);
    }

    &.remote {
      background: var(--job-remote-bg);
      color: var(--job-remote-text);
    }

    &.internship {
      background: var(--job-internship-bg);
      color: var(--job-internship-text);
    }
  }

  .job-content {
    padding: var(--space-6);
  }

  .content-section {
    margin-bottom: var(--space-8);

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      font-size: var(--fs-lg);
      color: var(--grey-800);
      margin-bottom: var(--space-4);
    }

    p {
      color: var(--grey-600);
      line-height: 1.7;
      margin: 0;
    }
  }

  .job-sidebar {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: var(--space-6);
    height: fit-content;
    position: sticky;
    top: var(--space-8);
  }

  .sidebar-header {
    margin-bottom: var(--space-6);

    h3 {
      font-size: var(--fs-lg);
      color: var(--grey-800);
      margin: 0;
    }
  }

  .apply-btn {
    width: 100%;
    padding: var(--space-4);
    font-size: var(--fs-base);
    font-weight: 600;
    margin-bottom: var(--space-4);
  }

  .applied-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--green-light);
    color: var(--green-dark);
    border-radius: var(--borderRadius);
    font-weight: 500;
    margin-bottom: var(--space-4);

    svg {
      font-size: var(--fs-lg);
    }
  }

  .closed-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--grey-100);
    color: var(--grey-600);
    border-radius: var(--borderRadius);
    font-weight: 500;
    margin-bottom: var(--space-4);

    svg {
      font-size: var(--fs-lg);
    }
  }

  .application-section {
    margin-bottom: var(--space-4);
  }

  .posted-date {
    font-size: var(--fs-sm);
    color: var(--grey-400);
    text-align: center;
  }
`;

export default Wrapper;
