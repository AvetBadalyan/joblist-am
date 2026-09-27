import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }

  p {
    margin: 0;
    margin-top: var(--space-4);
    text-align: center;
  }

  .btn {
    margin-top: var(--space-4);
  }

  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }

  .role-selection {
    display: flex;
    gap: var(--space-6);
    margin-top: var(--space-2);
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    font-size: var(--fs-base);
    color: var(--grey-700);
  }

  .radio-label input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: var(--primary-500);
    cursor: pointer;
  }

  .radio-label span {
    user-select: none;
  }

  .role-fields {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
    border-top: 1px solid var(--grey-200);
  }

  .fields-note {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    margin-bottom: var(--space-3);
    text-align: left;
  }

  @media (max-width: 480px) {
    .role-selection {
      flex-direction: column;
      gap: var(--space-3);
    }
  }
`;

export default Wrapper;
