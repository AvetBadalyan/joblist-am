import styled from "styled-components";

const Wrapper = styled.main`
  padding: var(--space-6) var(--container-padding);
  max-width: var(--max-width);
  margin: 0 auto;
  min-height: 100vh;
  background: linear-gradient(180deg, var(--grey-50) 0%, var(--white) 100%);

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--grey-600);
    font-size: var(--fs-sm);
    font-weight: 500;
    margin-bottom: var(--space-6);
    text-decoration: none;
    transition: var(--transition);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-lg);
    min-height: 44px;

    &:hover {
      background: var(--grey-100);
      color: var(--grey-900);
    }

    svg {
      font-size: var(--fs-base);
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
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);

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
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .job-main {
    background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    border: 1px solid var(--grey-100);
  }

  .job-header {
    padding: var(--space-6);
    background: linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%);
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .company-icon {
    width: 56px;
    height: 56px;
    display: grid;
    place-items: center;
    background: var(--gradient-accent);
    border-radius: var(--radius-xl);
    font-size: var(--fs-lg);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    flex-shrink: 0;
    box-shadow: var(--shadow-2);
  }

  .job-title-section {
    flex: 1;

    h2 {
      margin: 0 0 var(--space-2) 0;
      font-size: var(--fs-lg);
      font-weight: 800;
      color: var(--grey-900);
    }

    .company-name {
      margin: 0;
      color: var(--grey-500);
      font-size: var(--fs-sm);
      font-weight: 500;
    }
  }

  .job-meta {
    padding: var(--space-6);
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    align-items: center;
  }

  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--grey-600);
    font-size: var(--fs-sm);
    background: var(--grey-50);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-full);

    svg {
      color: var(--grey-400);
      font-size: var(--fs-sm);
    }

    .salary {
      color: var(--green-dark);
      font-weight: 700;
    }
    .closed-text {
      color: var(--red-dark);
    }
  }

  .job-type-badge {
    display: inline-flex;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;

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
    margin-bottom: var(--space-6);

    &:last-child {
      margin-bottom: 0;
    }

    h3 {
      font-size: var(--fs-md);
      font-weight: 700;
      color: var(--grey-900);
      margin-bottom: var(--space-3);
    }

    p {
      color: var(--grey-600);
      line-height: 1.8;
      margin: 0;
    }
  }

  .job-sidebar {
    background: var(--white);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-card);
    padding: var(--space-6);
    border: 1px solid var(--grey-100);
    order: -1;
  }

  .sidebar-header {
    margin-bottom: var(--space-6);

    h3 {
      font-size: var(--fs-md);
      font-weight: 700;
      color: var(--grey-900);
      margin: 0;
    }
  }

  .apply-btn {
    width: 100%;
    padding: var(--space-4);
    font-size: var(--fs-base);
    font-weight: 700;
    margin-bottom: var(--space-4);
    border-radius: var(--radius-xl);
    background: var(--gradient-accent);
    min-height: 48px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-3), var(--shadow-glow);
    }
  }

  .applied-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-4);
    background: var(--green-light);
    color: var(--green-dark);
    border-radius: var(--radius-xl);
    font-weight: 600;
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
    border-radius: var(--radius-xl);
    font-weight: 600;
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
    color: var(--grey-500);
    text-align: center;
    font-weight: 500;
  }

  @media (min-width: 576px) {
    padding: var(--space-8) var(--container-padding);

    .job-header {
      flex-direction: row;
      align-items: center;
      padding: var(--space-6);
    }

    .company-icon {
      width: 64px;
      height: 64px;
      font-size: var(--fs-xl);
    }

    .job-title-section h2 {
      font-size: var(--fs-xl);
    }

    .job-meta {
      padding: var(--space-6);
      gap: var(--space-3);
    }

    .job-content {
      padding: var(--space-6);
    }

    .content-section h3 {
      font-size: var(--fs-lg);
      margin-bottom: var(--space-4);
    }

    .job-sidebar {
      padding: var(--space-6);
    }
  }

  @media (min-width: 768px) {
    .job-detail-container {
      display: grid;
      grid-template-columns: 1fr 320px;
    }

    .job-sidebar {
      height: fit-content;
      position: sticky;
      top: calc(var(--nav-height) + var(--space-6));
      order: 0;
    }

    .job-header {
      padding: var(--space-8);
    }

    .company-icon {
      width: 72px;
      height: 72px;
      font-size: var(--fs-2xl);
    }

    .job-meta {
      padding: var(--space-6) var(--space-8);
    }

    .job-content {
      padding: var(--space-8);
    }

    .content-section {
      margin-bottom: var(--space-8);
    }
  }
`;

export default Wrapper;
