import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  .status-select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border-radius: var(--borderRadius);
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    border: 1px solid transparent;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 0.75rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    min-width: 120px;
    transition: var(--transition);
  }

  .status-select:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-200);
  }

  .status-select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* Status-specific colors */
  .status-applied {
    background-color: #dbeafe;
    color: #1d4ed8;
    border-color: #93c5fd;
  }

  .status-reviewing {
    background-color: #fef3c7;
    color: #b45309;
    border-color: #fcd34d;
  }

  .status-interview {
    background-color: #ede9fe;
    color: #7c3aed;
    border-color: #c4b5fd;
  }

  .status-offer {
    background-color: #d1fae5;
    color: #047857;
    border-color: #6ee7b7;
  }

  .status-rejected {
    background-color: #fee2e2;
    color: #b91c1c;
    border-color: #fca5a5;
  }
`;

export default Wrapper;
