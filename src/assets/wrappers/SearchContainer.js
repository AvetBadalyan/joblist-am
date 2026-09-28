import styled from "styled-components";

const Wrapper = styled.section`
  background: var(--white);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  border: 1px solid var(--grey-100);

  .form {
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .form:hover {
    box-shadow: none;
  }

  .form-input,
  .form-select,
  .btn-block {
    height: 44px;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  h5 {
    font-weight: 700;
    font-size: var(--fs-lg);
    margin-bottom: var(--space-4);
    color: var(--grey-900);
  }

  .btn-block {
    align-self: end;
    border-radius: var(--radius-lg);
  }

  @media (min-width: 576px) {
    padding: var(--space-6);
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
