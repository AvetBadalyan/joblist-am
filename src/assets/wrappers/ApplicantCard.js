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

  .card-header {
    padding: var(--space-6);
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }

  .avatar {
    width: 50px;
    height: 50px;
    display: grid;
    place-items: center;
    background: var(--primary-100);
    border-radius: var(--radius-full);
    font-size: var(--fs-lg);
    font-weight: 600;
    text-transform: uppercase;
    color: var(--primary-600);

    @media (max-width: 575.98px) {
      width: 44px;
      height: 44px;
      font-size: var(--fs-md);
    }
  }

  .applicant-info {
    flex: 1;

    h4 {
      margin: 0 0 var(--space-1) 0;
      font-size: var(--fs-base);
      letter-spacing: 0;
      color: var(--grey-900);
    }

    .email {
      margin: 0;
      color: var(--grey-500);
      font-size: var(--fs-sm);
      letter-spacing: var(--letterSpacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card-body {
    padding: var(--space-6);
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-4);
    margin-bottom: var(--space-4);
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    color: var(--grey-600);

    svg {
      color: var(--grey-400);
      font-size: var(--fs-base);
      flex-shrink: 0;
    }
  }

  .view-cover-letter-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--primary-50);
    color: var(--primary-600);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--borderRadius);
    font-size: var(--fs-sm);
    font-weight: 500;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    border: none;
    transition: var(--transition);

    svg {
      font-size: var(--fs-base);
    }
  }

  .view-cover-letter-btn:hover {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  .cover-letter-section {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--grey-100);
  }

  .cover-letter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-3);

    h5 {
      margin: 0;
      font-size: var(--fs-sm);
      color: var(--grey-700);
    }

    .close-btn {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: var(--space-2);
      color: var(--grey-500);
      border-radius: var(--borderRadius);
      transition: var(--transition);
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: var(--fs-lg);
      }
    }

    .close-btn:hover {
      background: var(--grey-100);
      color: var(--grey-700);
    }
  }

  .cover-letter-content {
    color: var(--grey-600);
    line-height: 1.6;
    font-size: var(--fs-sm);
    margin: 0;
    white-space: pre-wrap;
  }

  .status-badge {
    padding: var(--space-2) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-xs);
    font-weight: 500;
    text-transform: capitalize;
    white-space: nowrap;

    &.applied {
      background: var(--status-applied-bg);
      color: var(--status-applied-text);
    }

    &.reviewing {
      background: var(--status-reviewing-bg);
      color: var(--status-reviewing-text);
    }

    &.interview {
      background: var(--status-interview-bg);
      color: var(--status-interview-text);
    }

    &.offer {
      background: var(--status-offer-bg);
      color: var(--status-offer-text);
    }

    &.rejected {
      background: var(--status-rejected-bg);
      color: var(--status-rejected-text);
    }
  }
`;

export default Wrapper;
