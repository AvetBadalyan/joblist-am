import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--grey-100);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-accent);
    opacity: 0;
    transition: var(--transition);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-card-hover);
    border-color: var(--primary-200);

    &::before {
      opacity: 1;
    }
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  header {
    padding: var(--space-5);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-3);
  }

  .company-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: var(--gradient-accent);
    border-radius: var(--radius-lg);
    font-size: var(--fs-base);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    box-shadow: var(--shadow-2);
  }

  .header-info {
    min-width: 0;

    h4 {
      margin: 0 0 var(--space-1) 0;
      font-size: var(--fs-sm);
      font-weight: 700;
      color: var(--grey-900);
      line-height: 1.3;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    p {
      margin: 0;
      color: var(--grey-500);
      font-size: var(--fs-xs);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .bookmark-btn {
    background: var(--grey-100);
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full);
    transition: var(--transition);
    width: 40px;
    height: 40px;
    flex-shrink: 0;

    &:hover {
      background: var(--primary-100);
      transform: scale(1.05);
    }

    svg {
      font-size: var(--fs-base);
      color: var(--grey-400);
      transition: var(--transition);
    }

    &.saved {
      background: var(--primary-100);

      svg {
        color: var(--primary-500);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .content {
    padding: 0 var(--space-5) var(--space-5);
  }

  .job-details {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
  }

  .detail-item {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--fs-xs);
    color: var(--grey-600);
    background: var(--grey-50);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);

    svg {
      color: var(--grey-400);
      font-size: var(--fs-xs);
    }
  }

  .job-type {
    display: inline-flex;
    align-items: center;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
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
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    color: var(--green-dark);
    font-weight: 700;
    font-size: var(--fs-xs);
    background: var(--green-light);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
  }

  .posted-date {
    font-size: var(--fs-xs);
    color: var(--grey-500);
    padding-top: var(--space-3);
    border-top: 1px solid var(--grey-100);
    font-weight: 500;
  }

  @media (min-width: 576px) {
    header {
      padding: var(--space-6);
      gap: var(--space-4);
    }

    .company-icon {
      width: 56px;
      height: 56px;
      font-size: var(--fs-lg);
      border-radius: var(--radius-xl);
    }

    .header-info {
      h4 {
        font-size: var(--fs-md);
      }

      p {
        font-size: var(--fs-sm);
      }
    }

    .bookmark-btn {
      width: 44px;
      height: 44px;
      padding: var(--space-3);

      svg {
        font-size: var(--fs-lg);
      }
    }

    .content {
      padding: 0 var(--space-6) var(--space-6);
    }

    .job-details {
      gap: var(--space-3);
    }

    .detail-item {
      font-size: var(--fs-sm);
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);

      svg {
        font-size: var(--fs-sm);
      }
    }

    .job-type {
      font-size: var(--fs-xs);
      padding: var(--space-2) var(--space-4);
    }

    .salary {
      font-size: var(--fs-sm);
      gap: var(--space-2);
      padding: var(--space-2) var(--space-3);
    }

    .posted-date {
      padding-top: var(--space-4);
    }
  }
`;

export default Wrapper;
