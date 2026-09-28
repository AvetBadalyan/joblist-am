import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  padding: var(--space-16) var(--space-4);
  background: var(--white);
  border-radius: var(--radius-2xl);
  border: 2px dashed var(--grey-200);

  h2 {
    font-size: var(--fs-xl);
    color: var(--grey-700);
    margin-bottom: var(--space-4);
    font-weight: 700;
  }

  p {
    color: var(--grey-500);
    margin-bottom: var(--space-6);
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
`;

export default Wrapper;
