import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: var(--space-1);
  font-size: var(--fs-sm);
  font-weight: 600;
  letter-spacing: var(--letterSpacing);

  &.weak .strength-label {
    color: var(--red-dark);
  }

  &.medium .strength-label {
    color: var(--yellow-dark);
  }

  &.strong .strength-label {
    color: var(--green-dark);
  }
`;

export default Wrapper;
