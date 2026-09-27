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
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }

  /* Role selection styling */
  .role-selection {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.95rem;
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

  /* Role-specific fields section */
  .role-fields {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey-200);
  }

  .fields-note {
    font-size: 0.85rem;
    color: var(--grey-500);
    margin-bottom: 0.75rem;
    text-align: left;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .role-selection {
      flex-direction: column;
      gap: 0.75rem;
    }
  }
`;
export default Wrapper;
