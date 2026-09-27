import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  position: relative;

  &:hover {
    box-shadow: var(--shadow-4);
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  header {
    padding: var(--space-4) var(--space-6);
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-4);
  }

  .company-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: var(--fs-lg);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
  }

  .header-info {
    h4 {
      margin-bottom: var(--space-1);
      font-size: var(--fs-md);
      letter-spacing: 0;
    }
    p {
      margin: 0;
      color: var(--grey-500);
      font-size: var(--fs-sm);
      letter-spacing: var(--letterSpacing);
    }
  }

  .bookmark-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      font-size: var(--fs-lg);
      color: var(--grey-400);
    }

    &.saved svg {
      color: var(--primary-500);
    }
  }

  .content {
    padding: var(--space-4) var(--space-6);
  }

  .job-details {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--space-2);

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    color: var(--grey-600);

    svg {
      color: var(--grey-400);
      font-size: var(--fs-base);
    }

    .text {
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
    }
  }

  .job-type {
    display: inline-block;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-xs);
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .job-type.full-time {
    background: var(--job-fulltime-bg);
    color: var(--job-fulltime-text);
  }

  .job-type.part-time {
    background: var(--job-parttime-bg);
    color: var(--job-parttime-text);
  }

  .job-type.remote {
    background: var(--job-remote-bg);
    color: var(--job-remote-text);
  }

  .job-type.internship {
    background: var(--job-internship-bg);
    color: var(--job-internship-text);
  }

  .salary {
    color: var(--primary-600);
    font-weight: 500;
  }

  .posted-date {
    font-size: var(--fs-sm);
    color: var(--grey-400);
    margin-top: var(--space-3);
    padding-top: var(--space-3);
    border-top: 1px solid var(--grey-100);
  }
`;

export default Wrapper;
