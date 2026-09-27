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
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
  }

  .company-icon {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.25rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
  }

  .header-info {
    h4 {
      margin-bottom: 0.25rem;
      font-size: 1.1rem;
      letter-spacing: 0;
    }
    p {
      margin: 0;
      color: var(--grey-500);
      font-size: 0.9rem;
      letter-spacing: var(--letterSpacing);
    }
  }

  .bookmark-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
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
      font-size: 1.25rem;
      color: var(--grey-400);
    }

    &.saved svg {
      color: var(--primary-500);
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .job-details {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .detail-item {
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

  .job-type {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: var(--borderRadius);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }

  .job-type.full-time {
    background: #e0f2fe;
    color: #0369a1;
  }

  .job-type.part-time {
    background: #fef3c7;
    color: #b45309;
  }

  .job-type.remote {
    background: #d1fae5;
    color: #047857;
  }

  .job-type.internship {
    background: #ede9fe;
    color: #6d28d9;
  }

  .salary {
    color: var(--primary-600);
    font-weight: 500;
  }

  .posted-date {
    font-size: 0.85rem;
    color: var(--grey-400);
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--grey-100);
  }
`;

export default Wrapper;
