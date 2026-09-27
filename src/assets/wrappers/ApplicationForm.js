import styled from "styled-components";

const Wrapper = styled.div`
  .form-group {
    margin-bottom: var(--space-4);
  }

  .form-label {
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: 500;
    color: var(--grey-700);
  }

  .required {
    color: var(--red-dark);
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--grey-200);
    border-radius: var(--borderRadius);
    font-size: var(--fs-base);
    transition: var(--transition-fast) border-color;

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: var(--focus-ring);
    }

    &::placeholder {
      color: var(--grey-400);
    }
  }

  .form-textarea {
    min-height: 150px;
    resize: vertical;
  }

  .char-count {
    font-size: var(--fs-xs);
    color: var(--grey-400);
    text-align: right;
    margin-top: var(--space-1);
  }

  .form-actions {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }

  .submit-btn,
  .cancel-btn {
    flex: 1;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--borderRadius);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    font-weight: 500;
    min-height: 44px;
  }

  .submit-btn {
    background: var(--primary-500);
    color: var(--white);
    border: none;

    &:hover:not(:disabled) {
      background: var(--primary-700);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .cancel-btn {
    background: var(--grey-200);
    color: var(--grey-700);
    border: none;

    &:hover {
      background: var(--grey-300);
    }
  }
`;

export default Wrapper;
