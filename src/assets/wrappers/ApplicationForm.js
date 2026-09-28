import styled from "styled-components";

const Wrapper = styled.div`
  h4 {
    margin-bottom: var(--space-4);
  }

  /* FormRow / FormRowTextArea render globally-styled .form-row markup,
     so this wrapper only handles the form's own error and action row. */
  .field-error {
    color: var(--red-dark);
    font-size: var(--fs-sm);
    margin: calc(var(--space-3) * -1) 0 var(--space-4);
  }

  .btn-container {
    display: flex;
    flex-direction: column-reverse;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }

  .btn {
    flex: 1;
    min-height: 48px;
  }

  /* Cancel: neutral, clearly secondary to the gradient submit button */
  .btn-cancel {
    background: var(--grey-100);
    color: var(--grey-700);
    box-shadow: none;

    &:hover {
      background: var(--grey-200);
      color: var(--grey-900);
      transform: none;
      box-shadow: none;
    }

    &::before {
      display: none;
    }
  }

  @media (min-width: 576px) {
    .btn-container {
      flex-direction: row;
    }
  }
`;

export default Wrapper;
