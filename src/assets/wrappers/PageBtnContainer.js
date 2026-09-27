import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
  margin-top: var(--space-8);
  gap: var(--space-4);

  .page-indicator {
    font-size: var(--fs-base);
    color: var(--grey-500);
    margin-right: auto;
  }

  .btn-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .pageBtn {
    background: var(--primary-100);
    border-color: transparent;
    width: 40px;
    height: 40px;
    font-weight: 700;
    font-size: var(--fs-lg);
    color: var(--primary-500);
    transition: var(--transition);
    border-radius: var(--borderRadius);
    cursor: pointer;
  }

  .pageBtn:hover {
    background: var(--primary-500);
    color: var(--white);
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .prev-btn,
  .next-btn {
    background: var(--white);
    border-color: transparent;
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    transition: var(--transition);
    padding: var(--space-2) var(--space-4);
    min-height: 44px;
    min-width: 44px;
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }
`;

export default Wrapper;
