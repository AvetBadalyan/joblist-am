import styled from 'styled-components';

const Wrapper = styled.section`
  .page-header {
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.5rem;
    text-transform: none;
    margin-bottom: 0.25rem;
  }

  .applications-count {
    color: var(--grey-500);
    font-size: 0.9rem;
  }

  .applications-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .application-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .job-info {
    flex: 1;
    min-width: 200px;
  }

  .job-title {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
    color: var(--text-color);
    text-decoration: none;
    display: inline-block;
    
    &:hover {
      color: var(--primary-500);
    }
  }

  .job-title-link {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: var(--primary-500);
      text-decoration: underline;
    }
  }

  .company-name {
    color: var(--grey-500);
    font-size: 0.9rem;
    margin: 0;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.85rem;
    border-radius: var(--borderRadius);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    white-space: nowrap;
  }

  .status-badge svg {
    font-size: 0.85rem;
  }

  /* Status colors matching StatusDropdown */
  .status-applied {
    background-color: #dbeafe;
    color: #1d4ed8;
  }

  .status-reviewing {
    background-color: #fef3c7;
    color: #b45309;
  }

  .status-interview {
    background-color: #ede9fe;
    color: #7c3aed;
  }

  .status-offer {
    background-color: #d1fae5;
    color: #047857;
  }

  .status-rejected {
    background-color: #fee2e2;
    color: #b91c1c;
  }

  .card-details {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--grey-500);
    font-size: 0.85rem;
  }

  .card-details svg {
    font-size: 1rem;
    color: var(--grey-400);
  }

  @media (min-width: 768px) {
    .applications-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1200px) {
    .applications-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
