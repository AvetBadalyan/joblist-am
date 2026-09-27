import styled from "styled-components";

const Wrapper = styled.div`
  .status-select {
    appearance: none;
    background-color: var(--white);
    border: 1px solid var(--grey-200);
    padding: var(--space-2) var(--space-8) var(--space-2) var(--space-3);
    border-radius: var(--borderRadius);
    font-size: var(--fs-sm);
    font-weight: 500;
    text-transform: capitalize;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    min-width: 120px;
    transition: var(--transition);
  }

  .status-select:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: var(--focus-ring);
  }

  .status-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .status-applied {
    background-color: var(--status-applied-bg);
    color: var(--status-applied-text);
    border-color: var(--status-applied-border);
  }

  .status-reviewing {
    background-color: var(--status-reviewing-bg);
    color: var(--status-reviewing-text);
    border-color: var(--status-reviewing-border);
  }

  .status-interview {
    background-color: var(--status-interview-bg);
    color: var(--status-interview-text);
    border-color: var(--status-interview-border);
  }

  .status-offer {
    background-color: var(--status-offer-bg);
    color: var(--status-offer-text);
    border-color: var(--status-offer-border);
  }

  .status-rejected {
    background-color: var(--status-rejected-bg);
    color: var(--status-rejected-text);
    border-color: var(--status-rejected-border);
  }
`;

export default Wrapper;
