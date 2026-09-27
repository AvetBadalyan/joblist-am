import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-3);
  }

  .applicant-header {
    padding: 1.25rem 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--grey-100);

    @media (max-width: 575px) {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }

  .avatar {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-100);
    border-radius: 50%;
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--primary-600);

    @media (max-width: 575px) {
      width: 44px;
      height: 44px;
      font-size: 1.1rem;
    }
  }

  .applicant-info {
    min-width: 0;

    h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      letter-spacing: 0;
      color: var(--grey-900);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .email {
      margin: 0;
      color: var(--grey-500);
      font-size: 0.875rem;
      letter-spacing: var(--letterSpacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .status-wrapper {
    @media (max-width: 575px) {
      margin-top: 0.5rem;
    }
  }

  .applicant-content {
    padding: 1.25rem 1.5rem;
  }

  .applicant-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
    margin-bottom: 1rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--grey-600);

    svg {
      color: var(--grey-400);
      font-size: 1rem;
      flex-shrink: 0;
    }

    .text {
      letter-spacing: var(--letterSpacing);
    }
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-100);
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    transition: var(--transition);
    border: none;
    min-height: 44px;
    min-width: 44px;

    svg {
      font-size: 1rem;
    }
  }

  .view-cover-letter-btn {
    background: var(--primary-50);
    color: var(--primary-600);

    &:hover {
      background: var(--primary-100);
    }
  }

  .view-resume-btn {
    background: var(--grey-100);
    color: var(--grey-700);
    text-decoration: none;

    &:hover {
      background: var(--grey-200);
    }
  }

  .email-btn {
    background: var(--grey-100);
    color: var(--grey-700);
    text-decoration: none;

    &:hover {
      background: var(--grey-200);
    }
  }

  /* Cover letter modal/expanded view */
  .cover-letter-section {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: var(--borderRadius);
    border-left: 3px solid var(--primary-500);

    .cover-letter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;

      h5 {
        margin: 0;
        font-size: 0.9rem;
        color: var(--grey-700);
      }

      .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--grey-500);
        min-width: 44px;
        min-height: 44px;

        &:hover {
          color: var(--grey-700);
        }

        svg {
          font-size: 1.25rem;
        }
      }
    }

    .cover-letter-text {
      color: var(--grey-600);
      line-height: 1.6;
      font-size: 0.9rem;
      margin: 0;
      white-space: pre-wrap;
    }
  }

  /* Status badge colors */
  .status-badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: var(--borderRadius);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);

    &.applied {
      background: #dbeafe;
      color: #1d4ed8;
    }

    &.reviewing {
      background: #fef3c7;
      color: #b45309;
    }

    &.interview {
      background: #ede9fe;
      color: #7c3aed;
    }

    &.offer {
      background: #d1fae5;
      color: #047857;
    }

    &.rejected {
      background: #fee2e2;
      color: #b91c1c;
    }
  }

  /* Empty state styling */
  &.empty-state {
    padding: 2rem;
    text-align: center;
    background: var(--grey-50);
    box-shadow: none;

    p {
      color: var(--grey-500);
      margin: 0;
    }
  }
`;

export default Wrapper;
