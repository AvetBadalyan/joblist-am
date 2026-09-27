import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--white);
  border-radius: var(--borderRadius);
  padding: 1.5rem;
  box-shadow: var(--shadow-2);

  @media (min-width: 576px) {
    padding: 2rem;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: var(--grey-700);
    font-size: 1.1rem;
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
  }

  .form-row {
    margin-bottom: 1rem;
  }

  .form-row label {
    display: block;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: var(--grey-700);
    letter-spacing: var(--letterSpacing);
  }

  .form-row input,
  .form-row textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: var(--borderRadius);
    background: var(--grey-50);
    border: 1px solid var(--grey-200);
    font-size: 1rem;
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px var(--primary-100);
      background: var(--white);
    }

    &::placeholder {
      color: var(--grey-400);
    }
  }

  .form-row input {
    min-height: 44px;
  }

  .form-row textarea {
    min-height: 150px;
    resize: vertical;
    line-height: 1.6;
  }

  .field-hint {
    font-size: 0.75rem;
    color: var(--grey-500);
    margin-top: 0.25rem;
  }

  .field-error {
    color: var(--red-dark);
    font-size: 0.75rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
  }

  .required-indicator {
    color: var(--red-dark);
    margin-left: 0.25rem;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;

    @media (min-width: 576px) {
      flex-direction: row;
      gap: 1rem;
    }
  }

  .btn-container button {
    min-height: 48px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: var(--borderRadius);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (min-width: 576px) {
      min-width: 140px;
    }
  }

  .btn-submit {
    background: var(--primary-500);
    color: var(--white);
    border: none;

    &:hover:not(:disabled) {
      background: var(--primary-600);
    }
  }

  .btn-cancel {
    background: var(--grey-100);
    color: var(--grey-700);
    border: 1px solid var(--grey-200);

    &:hover:not(:disabled) {
      background: var(--grey-200);
    }
  }

  /* Loading spinner in button */
  .btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Inline variant for job detail page */
  &.inline {
    box-shadow: none;
    padding: 0;
    background: transparent;
  }
`;

export default Wrapper;
