import styled from "styled-components";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
  }

  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: var(--space-8);
    row-gap: var(--space-2);
  }

  h5 {
    font-weight: 700;
  }

  .btn-block {
    align-self: end;
    margin-top: var(--space-4);
  }

  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .btn-block {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
