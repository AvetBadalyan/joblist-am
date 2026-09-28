import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--radius-2xl);
  width: 100%;
  background: var(--white);
  padding: var(--space-6);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--grey-100);

  h3 {
    margin-top: 0;
    margin-bottom: var(--space-6);
    font-size: var(--fs-xl);
    font-weight: 700;
    color: var(--grey-900);
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form:hover {
    box-shadow: none;
  }

  .form-row {
    margin-bottom: var(--space-4);
  }

  .form-center {
    display: grid;
    row-gap: var(--space-4);
  }

  /* Full-width form fields (e.g., textareas, descriptions) */
  .form-full-width {
    grid-column: 1 / -1;
  }

  .field-error {
    color: var(--red-dark);
    font-size: var(--fs-xs);
    margin-top: var(--space-1);
    margin-bottom: 0;
  }

  .form-center button {
    align-self: end;
    height: 44px;
    margin-top: var(--space-4);
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    align-self: flex-end;
    margin-top: var(--space-4);

    button {
      height: 44px;
      min-height: 44px;
    }
  }

  .clear-btn {
    background: var(--grey-200);
    color: var(--grey-700);
    box-shadow: none;

    &:hover {
      background: var(--grey-300);
      color: var(--grey-800);
    }
  }

  @media (min-width: 576px) {
    padding: var(--space-8);

    .btn-container {
      flex-direction: row;
    }
  }

  @media (min-width: 768px) {
    padding: var(--space-10);

    h3 {
      margin-bottom: var(--space-8);
    }
  }

  @media (min-width: 1024px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: var(--space-6);
    }

    .btn-container {
      margin-top: 0;
    }

    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
