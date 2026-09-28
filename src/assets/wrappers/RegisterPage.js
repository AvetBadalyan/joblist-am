import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--grey-50) 0%, var(--white) 100%);
  padding: var(--space-8) var(--space-4);

  .logo {
    display: block;
    margin: 0 auto var(--space-6);
  }

  .form {
    max-width: 440px;
    border: 1px solid var(--grey-100);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-accent);
    }
  }

  h3 {
    text-align: center;
    font-size: var(--fs-2xl);
    margin-bottom: var(--space-8);
  }

  p {
    margin: 0;
    margin-top: var(--space-6);
    text-align: center;
    color: var(--grey-500);
  }

  .btn {
    margin-top: var(--space-6);
    height: 48px;
  }

  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-600);
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);

    &:hover {
      color: var(--primary-700);
      text-decoration: underline;
    }
  }

  .role-selection {
    display: flex;
    gap: var(--space-4);
    margin-top: var(--space-2);
  }

  .radio-label {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    cursor: pointer;
    font-size: var(--fs-sm);
    font-weight: 500;
    color: var(--grey-600);
    padding: var(--space-3) var(--space-4);
    border: 2px solid var(--grey-200);
    border-radius: var(--radius-lg);
    transition: var(--transition);

    &:hover {
      border-color: var(--grey-300);
    }

    &:has(input:checked) {
      border-color: var(--primary-500);
      background: var(--primary-50);
      color: var(--primary-700);
    }
  }

  .radio-label input[type="radio"] {
    display: none;
  }

  .radio-label span {
    user-select: none;
  }

  .role-fields {
    margin-top: var(--space-6);
    padding-top: var(--space-6);
    border-top: 1px solid var(--grey-100);
  }

  .fields-note {
    font-size: var(--fs-sm);
    color: var(--grey-500);
    margin-bottom: var(--space-4);
    text-align: left;
    font-weight: 500;
  }

  @media (max-width: 575.98px) {
    .role-selection {
      flex-direction: column;
    }
  }
`;

export default Wrapper;
